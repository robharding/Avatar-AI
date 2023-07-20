import Providers from "@/components/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "@/components/nav/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AvatarAI",
  description: "Generate Your Avatar with the power of AI!",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased px-12")}>
        <Providers>
          <Navbar />
          <div>{children}</div>

          {authModal}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
