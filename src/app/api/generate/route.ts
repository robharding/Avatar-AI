import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import openai from "@/lib/openai";
import { GenerateFormSchema } from "@/lib/validators/generate";
import axios from "axios";
import { z } from "zod";

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
    const { prompt } = GenerateFormSchema.parse(body);

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0]?.url;

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

    return new Response(imageUrl);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not generate", { status: 500 });
  }
}
