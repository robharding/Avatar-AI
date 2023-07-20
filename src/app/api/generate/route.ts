import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import openai from "@/lib/openai";
import {
  GenerateFormResponse,
  GenerateFormRequestSchema,
} from "@/lib/validators/generate";
import { NextResponse } from "next/server";
import { z } from "zod";

const generateImage = async (prompt: string) => {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });

  return response.data.data[0]!.url!;
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

    const imageUrl = await generateImage(prompt);

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
      imageUrl,
    };

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not generate", { status: 500 });
  }
}
