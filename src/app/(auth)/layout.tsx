import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard/generate");
  }

  return (
    <div className="absolute inset-x-0 inset-y-40 container">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        {children}
      </div>
    </div>
  );
}
