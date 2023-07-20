import { getAuthSession } from "@/lib/auth";
import { FC } from "react";
import UserNav from "./UserNav";
import Link from "next/link";
import { db } from "@/lib/db";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <nav className="flex justify-between py-6 z-50">
      <div className="flex flex-row gap-6 items-center">
        <Link href="/" className="text-2xl font-bold">
          AvatarAI
        </Link>
        <div className=" flex-row gap-6 hidden md:flex">
          <Link href="/generate" className="text-lg font-medium">
            Generate
          </Link>
          <Link href="/community" className="text-lg font-medium">
            Community
          </Link>
          {user && (
            <>
              <Link href="/collection" className="text-lg font-medium">
                Collection
              </Link>
              <Link href="/feedback" className="text-lg font-medium">
                Feedback
              </Link>
            </>
          )}
        </div>
      </div>
      <UserNav user={user} />
    </nav>
  );
};

export default Navbar;
