import FeedbackPost from "@/components/FeedbackPost";
import FeedbackForm from "@/components/forms/FeedbackForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { extendedFeedback } from "@/types/db";
import { Heart } from "lucide-react";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface FeedbackPageProps {}

const FeedbackPage: NextPage<FeedbackPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const feedback = await db.feedback.findMany({
    include: {
      votes: true,
    },
  });

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Provide your feedback</h1>

      <div className="flex flex-row flex-wrap gap-2 mt-10 text-sm">
        {feedback.map((feedback) => (
          <FeedbackPost
            key={feedback.id}
            feedback={feedback}
            userId={session.user.id}
          />
        ))}
      </div>

      <div className="max-w-xl mt-10">
        <FeedbackForm user={session.user} />
      </div>
    </section>
  );
};

export default FeedbackPage;
