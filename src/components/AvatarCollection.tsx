"use client";

import { Avatar } from "@prisma/client";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { S3_URL } from "@/constants";

interface AvatarCollectionProps {
  avatars: Avatar[];
}

const AvatarCollection: FC<AvatarCollectionProps> = ({ avatars }) => {
  const [input, setInput] = useState<string>("");

  return (
    <>
      <Input
        className="mt-4"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        placeholder="Search by prompt"
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {avatars
          .filter(
            (avatar) =>
              input.length === 0 ||
              avatar.prompt?.toLowerCase().includes(input.toLowerCase())
          )
          .map((avatar) => (
            <div key={avatar.id} className="relative w-full pt-[100%]">
              <Image
                src={S3_URL + avatar.id}
                alt={`Avatar ${avatar.id}`}
                fill
                className="object-cover w-full h-full inset-0 rounded-lg"
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default AvatarCollection;
