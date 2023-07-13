export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 container">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        {children}
      </div>
    </div>
  );
}
