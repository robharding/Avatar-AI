import GenerateForm from "@/components/GenerateForm";
import { getAuthSession } from "@/lib/auth";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface GeneratePageProps {}

const GeneratePage: NextPage<GeneratePageProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <div className="max-w-xl mx-auto mt-10">
      <GenerateForm />
    </div>
  );
};

export default GeneratePage;
