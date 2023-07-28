import { getAuthSession } from "@/lib/auth";
import { FC } from "react";
import UserNav from "./UserNav";
import Link from "next/link";
import { Rocket } from "lucide-react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <nav className="flex justify-between py-6 px-12 z-50 border-b shadow-sm">
      <div className="flex flex-row gap-6 items-center">
        <Link
          href="/"
          prefetch={false}
          className="text-2xl font-bold flex gap-1 items-center"
        >
          <Rocket className="w-6 h-6 text-violet-400 fill-violet-400" />
          AvatarAI
        </Link>
        <div className="flex-row gap-4 hidden md:flex">
          <Link href="/generate" className="text-lg font-medium">
            Generate
          </Link>
          <Link
            href="/community"
            prefetch={false}
            className="text-lg font-medium"
          >
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
