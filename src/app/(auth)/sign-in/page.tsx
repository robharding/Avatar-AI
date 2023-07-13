import SignIn from "@/components/SignIn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import type { NextPage } from "next";
import Link from "next/link";

interface SignInPageProps {}

const SignInPage: NextPage<SignInPageProps> = ({}) => {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "self-start -mt-20"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Home
      </Link>

      <SignIn />
    </>
  );
};

export default SignInPage;
