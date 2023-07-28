import FeedbackForm from "@/components/forms/FeedbackForm";
import { getAuthSession } from "@/lib/auth";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface FeedbackPageProps {}

const FeedbackPage: NextPage<FeedbackPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Provide your feedback</h1>
      <div className="max-w-xl mt-10">
        <FeedbackForm user={session.user} />
      </div>
    </section>
  );
};

export default FeedbackPage;
