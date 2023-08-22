import SignInButton from "@/components/auth/SignInButton";
import GenerateForm from "@/components/forms/GenerateForm";
import { getAuthSession } from "@/lib/auth";
import type { NextPage } from "next";

interface GeneratePageProps {}

const GeneratePage: NextPage<GeneratePageProps> = async ({}) => {
  const session = await getAuthSession();
  const signedIn = !!session?.user;

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Generate your next Avatar</h1>
      <h2 className="text-xl">
        {signedIn ? (
          <>
            You have{" "}
            <span className="text-accent font-semibold">
              {session.user.credits}
            </span>{" "}
            credits
          </>
        ) : (
          <>
            <SignInButton
              className="text-accent font-semibold"
              returnHere={true}
            />{" "}
            to generate avatars
          </>
        )}
      </h2>
      <div className="max-w-xl mt-10">
        <GenerateForm user={session?.user} />
      </div>
    </section>
  );
};

export default GeneratePage;
