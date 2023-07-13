"use client";

import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  return (
    <Link
      href={{
        pathname: "/sign-in",
      }}
      className={cn(buttonVariants())}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
