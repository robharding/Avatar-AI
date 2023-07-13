"use client";

import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return <Button onClick={(e) => handleSignOut()}>Sign Out</Button>;
};

export default SignOutButton;
