import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

export const useCustomToast = () => {
  const pathName = usePathname();
  const router = useRouter();

  const loginToast = () => {
    const handleClick = () => {
      router.push(`/sign-in?redirect=${pathName}`);
      dismiss();
    };

    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <ToastAction altText="Sign in" onClick={() => handleClick()}>
          Sign in
        </ToastAction>
      ),
    });
  };

  return { loginToast };
};
