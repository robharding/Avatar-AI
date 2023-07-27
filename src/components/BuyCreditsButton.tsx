"use client";

import { useBuyCredits } from "@/hooks/use-buy-credits";
import { FC } from "react";
import { Button } from "./ui/button";

interface BuyCreditsButtonProps {
  amount: number;
}

const BuyCreditsButton: FC<BuyCreditsButtonProps> = ({ amount }) => {
  const { buyCredits } = useBuyCredits();
  return (
    <Button onClick={() => buyCredits({ creditsAmount: amount })}>
      Buy {amount} Credits
    </Button>
  );
};

export default BuyCreditsButton;
