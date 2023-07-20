"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

interface UserNavDropdownProps {
  user: User;
}

const UserNavDropdown: FC<UserNavDropdownProps> = ({ user }) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
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
        <DropdownMenuSeparator /> <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => handleSignOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavDropdown;
