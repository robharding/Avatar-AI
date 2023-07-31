import CloseModal from "@/components/auth/CloseModal";
import SignIn from "@/components/auth/SignIn";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/generate");
  }

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignIn isModal={true} />
        </div>
      </div>
    </div>
  );
};

export default Page;
