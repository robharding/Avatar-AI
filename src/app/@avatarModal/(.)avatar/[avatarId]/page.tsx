"use client";

import { useOnClickOutside } from "usehooks-ts";

import AvatarPreview from "@/components/collection/AvatarPreview";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface AvatarPageProps {
  params: {
    avatarId: string;
  };
}

const Page = ({ params: { avatarId } }: AvatarPageProps) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => router.back());

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div
        ref={ref}
        className="container flex items-center h-full max-w-2xl mx-auto"
      >
        <div className="relative bg-white w-full rounded-lg">
          <AvatarPreview avatarId={avatarId} link={false} />
        </div>
      </div>
    </div>
  );
};

export default Page;
