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
import { useRouter } from "next/navigation";

interface UserNavDropdownProps {
  user: User;
}

const UserNavDropdown: FC<UserNavDropdownProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      callbackUrl: `/`,
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
        <DropdownMenuItem onClick={() => router.push("/generate")}>
          Generate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/community")}>
          Community
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/collection")}>
          Collection
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/feedback")}>
          Feedback
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/buy-credits")}>
          Buy Credits
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => handleSignOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavDropdown;
