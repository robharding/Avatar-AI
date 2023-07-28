import FeedbackForm from "@/components/forms/FeedbackForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Heart } from "lucide-react";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface FeedbackPageProps {}

const FeedbackPage: NextPage<FeedbackPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const feedback = await db.feedback.findMany();

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Provide your feedback</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-10 text-sm">
        {feedback.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-secondary rounded px-4 py-4 flex items-center gap-2"
          >
            <div className="flex flex-row items-center gap-1">
              <Heart className="h-4 w-4" />
              {feedback.votes}
            </div>
            {feedback.text}
          </div>
        ))}
      </div>
      <div className="max-w-xl mt-10">
        <FeedbackForm user={session.user} />
      </div>
    </section>
  );
};

export default FeedbackPage;
