import { User } from "next-auth";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserNavDropdown from "./UserNavDropdown";

interface UserNavProps {
  user?: User;
}

const UserNav: FC<UserNavProps> = ({ user }) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      {user ? (
        <>
          <div className="font-light">Credits: {user?.credits}</div>
          <UserNavDropdown user={user} />
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
