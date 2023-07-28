import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FeedbackFormRequestSchema } from "@/lib/validators/feedback";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 400 });
  }

  try {
    const body = await req.json();
    const { text } = FeedbackFormRequestSchema.parse(body);

    await db.feedback.create({
      data: {
        text,
        userId: session?.user.id,
      },
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Something went wrong.", { status: 500 });
  }
}
