import SignOutButton from "@/components/auth/SignOutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 container">
      <SignOutButton />
      {children}
    </div>
  );
}
