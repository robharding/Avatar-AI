import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import openai from "@/lib/openai";
import {
  GenerateFormResponse,
  GenerateFormRequestSchema,
} from "@/lib/validators/generate";
import { NextResponse } from "next/server";
import { z } from "zod";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.ACCESS_KEY_SECRET!,
  },
  region: "us-east-1",
});

const generateImage = async (prompt: string) => {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  return response.data.data[0]!.b64_json!;
};

const uploadImage = async (image: string) => {
  const response = await s3
    .putObject({
      Bucket: "avatar-ai",
      Body: Buffer.from(image, "base64"),
      Key: "my-imagec", //TODO: generate random id
      ContentEncoding: "base64",
      ContentType: "image/png",
    })
    .promise();

  console.log(response);
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
    const { prompt } = GenerateFormRequestSchema.parse(body);

    const image = await generateImage(prompt);
    const imageUrl = await uploadImage(image);

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
      imageUrl: "test",
    };

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not generate", { status: 500 });
  }
}
