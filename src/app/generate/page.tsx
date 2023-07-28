import GenerateForm from "@/components/GenerateForm";
import { getAuthSession } from "@/lib/auth";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface GeneratePageProps {}

const GeneratePage: NextPage<GeneratePageProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Generate your next Avatar</h1>
      <div className="max-w-xl mt-10">
        <GenerateForm user={session?.user} />
      </div>
    </section>
  );
};

export default GeneratePage;
