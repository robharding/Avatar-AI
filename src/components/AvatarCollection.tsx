"use client";

import { Avatar } from "@prisma/client";
import { FC } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { S3_URL } from "@/constants";

interface AvatarCollectionProps {
  avatars: Avatar[];
}

const AvatarCollection: FC<AvatarCollectionProps> = ({ avatars }) => {
  return (
    <>
      <Input className="mt-4" placeholder="Search by prompt" />
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {avatars.map((avatar) => (
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
