import Link from "next/link";
import UserAuthForm from "./UserAuthForm";
import { FC } from "react";

interface SignInProps {
  isModal?: boolean;
}

const SignIn: FC<SignInProps> = ({ isModal = false }) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col gap-2 space-y-2 text-center">
        {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up an AvatarAI account and agree to our
          User Agreement and Privacy Policy.
        </p>

        <UserAuthForm className="flex justify-center" />

        <p className="px-8 text-center text-sm">
          New to AvatarAI?{" "}
          <Link
            href="sign-up"
            className="hover:text-primary/90 underline underline-offset-4"
            replace={isModal}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
