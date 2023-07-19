import { getAuthSession } from "@/lib/auth";
import { FC } from "react";
import UserNav from "./UserNav";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <nav className="flex justify-between py-6 px-4">
      <div>
        <Link href="/" className="text-xl font-bold">
          AvatarAI
        </Link>
      </div>
      <UserNav user={user} />
    </nav>
  );
};

export default Navbar;
