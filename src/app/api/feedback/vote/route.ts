import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FeedbackVoteSchema } from "@/lib/validators/feedback";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 400 });
  }

  try {
    const body = await req.json();
    const { feedbackId } = FeedbackVoteSchema.parse(body);

    const currentVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        feedbackId,
      },
    });

    if (!!currentVote) {
      await db.vote.delete({
        where: {
          id: currentVote.id,
        },
      });
    } else {
      await db.vote.create({
        data: {
          feedbackId,
          userId: session.user.id,
        },
      });
    }

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Something went wrong.", { status: 500 });
  }
}
