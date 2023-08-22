import { User } from "next-auth";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserNavDropdown from "./UserNavDropdown";
import SignInButton from "../auth/SignInButton";

interface UserNavProps {
  user?: User;
}

const UserNav: FC<UserNavProps> = ({ user }) => {
  return (
    <div className="flex flex-shrink-0 flex-row gap-2 items-center">
      {user ? (
        <>
          <Link
            href="/buy-credits"
            className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          >
            Credits: {user?.credits}
          </Link>
          <UserNavDropdown user={user} />
        </>
      ) : (
        <SignInButton className={cn(buttonVariants())} returnHere={true} />
      )}
    </div>
  );
};

export default UserNav;
