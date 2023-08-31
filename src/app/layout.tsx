import Providers from "@/components/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "@/components/nav/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/background/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AvatarAI",
  description: "Generate Your Avatar with the power of AI!",
};

export default function RootLayout({
  children,
  authModal,
  avatarModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
  avatarModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <Providers>
          <Background />
          <Navbar />
          <div className="px-12 pt-8 bg-transparent">{children}</div>

          {authModal}
          {avatarModal}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
