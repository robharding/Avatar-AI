"use client";

import { useBuyCredits } from "@/hooks/use-buy-credits";
import { FC } from "react";
import { Button } from "./ui/button";

interface BuyCreditsButtonProps {}

const BuyCreditsButton: FC<BuyCreditsButtonProps> = ({}) => {
  const { buyCredits } = useBuyCredits();
  return <Button onClick={() => buyCredits()}>Buy Credits</Button>;
};

export default BuyCreditsButton;
