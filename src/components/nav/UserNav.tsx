"use client";

import { User } from "next-auth";
import { FC } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { signOut } from "next-auth/react";

interface UserNavProps {
  user?: User;
}

const UserNav: FC<UserNavProps> = ({ user }) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      {user && <div className="font-light">Credits: {user?.credits}</div>}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.image!} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Generate</DropdownMenuItem>
            <DropdownMenuItem>Community</DropdownMenuItem>
            <DropdownMenuItem>Collection</DropdownMenuItem>
            <DropdownMenuItem>Feedback</DropdownMenuItem>
            <DropdownMenuSeparator />{" "}
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleSignOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-in" className={cn(buttonVariants())}>
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserNav;
