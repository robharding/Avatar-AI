import BuyCreditsButton from "@/components/BuyCreditsButton";
import type { NextPage } from "next";

interface BuyCreditsPageProps {}

const BuyCreditsPage: NextPage<BuyCreditsPageProps> = ({}) => {
  return (
    <div className="flex flex-row gap-4 w-full justify-center">
      <BuyCreditsButton amount={25} />
      <BuyCreditsButton amount={50} />
      <BuyCreditsButton amount={100} />
    </div>
  );
};

export default BuyCreditsPage;
