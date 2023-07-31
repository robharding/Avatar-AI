import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import openai from "@/lib/openai";
import {
  GenerateFormResponse,
  GenerateFormRequestSchema,
} from "@/lib/validators/generate";
import { NextResponse } from "next/server";
import { z } from "zod";
import AWS, { AWSError } from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.ACCESS_KEY_SECRET!,
  },
  region: "us-east-1",
});

const generateImage = async (prompt: string, amount: number) => {
  const response = await openai.createImage({
    prompt,
    n: amount,
    size: "1024x1024",
    response_format: "b64_json",
  });

  //return response.data.data[0]!.b64_json!;

  return response.data.data!.map((data) => data.b64_json!);
};

const uploadImage = async (
  images: string[],
  prompt: string,
  userId: string
) => {
  const ids = await Promise.all(
    images.map(async (image) => {
      const avatar = await db.avatar.create({
        data: {
          prompt,
          userId,
        },
      });

      try {
        await s3
          .putObject({
            Bucket: "avatar-ai",
            Body: Buffer.from(image, "base64"),
            Key: avatar.id,
            ContentEncoding: "base64",
            ContentType: "image/png",
          })
          .promise();
      } catch (err) {
        // clean up if s3 fails
        await db.avatar.delete({
          where: {
            id: avatar.id,
          },
        });

        return null;
      }

      return avatar.id;
    })
  );

  return ids.filter((id) => id != null) as string[];
};

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 400 });
    }

    if (session.user.credits < 1) {
      return new Response("Not enough credits", { status: 400 });
    }

    const body = await req.json();
    const { prompt, amount } = GenerateFormRequestSchema.parse(body);

    const images = await generateImage(prompt, amount);
    const avatarIds = await uploadImage(images, prompt, session.user.id);

    if (avatarIds.length == 0) {
      return new Response("S3 Upload failed", { status: 500 });
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    const payload: GenerateFormResponse = {
      avatarIds,
    };

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not generate", { status: 500 });
  }
}
