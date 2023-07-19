"use client";

import { Session, User } from "next-auth";
import { FC } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import SignOutButton from "../auth/SignOutButton";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserNavProps {
  user?: User;
}

const UserNav: FC<UserNavProps> = ({ user }) => {
  return (
    <div className="flex flex-row gap-4">
      {user ? (
        <>
          <Avatar>
            <AvatarImage src={user.image!} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <SignOutButton />
        </>
      ) : (
        <Link href="/sign-in" className={cn(buttonVariants())}>
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserNav;
