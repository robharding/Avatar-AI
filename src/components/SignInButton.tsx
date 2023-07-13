"use client";

import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface SignInButtonProps {
  redirect: string;
}

const SignInButton: FC<SignInButtonProps> = ({ redirect }) => {
  return (
    <Link
      href={{
        pathname: "/sign-in",
        query: { redirect: redirect || "/dashboard" },
      }}
      className={cn(buttonVariants())}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
