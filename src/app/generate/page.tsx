import GenerateForm from "@/components/GenerateForm";
import type { NextPage } from "next";

interface GeneratePageProps {}

const GeneratePage: NextPage<GeneratePageProps> = ({}) => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <GenerateForm />
    </div>
  );
};

export default GeneratePage;
