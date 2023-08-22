"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SignInButtonProps
  extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  returnHere?: boolean;
}

const SignInButton: FC<SignInButtonProps> = ({ className, returnHere }) => {
  const pathName = usePathname();
  return returnHere ? (
    <Link
      href={{
        pathname: `/sign-in`,
        query: {
          redirect: pathName,
        },
      }}
      className={className}
    >
      Sign In
    </Link>
  ) : (
    <Link
      href={{
        pathname: `/sign-in`,
      }}
      className={className}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
