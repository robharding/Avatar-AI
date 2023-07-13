import SignUp from "@/components/SignUp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const page: FC = () => {
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

      <SignUp />
    </>
  );
};

export default page;
