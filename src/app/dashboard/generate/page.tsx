import GenerateForm from "@/components/GenerateForm";
import { getAuthSession } from "@/lib/auth";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface GeneratePageProps {}

const GeneratePage: NextPage<GeneratePageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/sign-in");
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <p>Welcome back, {session?.user.name}</p>
      <GenerateForm />
    </div>
  );
};

export default GeneratePage;
