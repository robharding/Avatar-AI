"use client";

import { Avatar } from "@prisma/client";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { S3_URL } from "@/constants";
import { cn } from "@/lib/utils";

interface AvatarCollectionProps {
  avatars: Avatar[];
}

const AvatarCollection: FC<AvatarCollectionProps> = ({ avatars }) => {
  const [input, setInput] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<number>(-1);

  const prompts = avatars.map((avatar) => avatar.prompt);
  const recentPrompts = Array.from(new Set(prompts)).slice(0, 3);

  return (
    <>
      <Input
        className="mt-4"
        value={input}
        onChange={(e) => {
          setSelectedPrompt(-1);
          setInput(e.currentTarget.value);
        }}
        placeholder="Search by prompt"
      />
      <div className="mt-4">
        <h3>Recent prompts</h3>
        <div className="flex flex-row gap-4 mt-2">
          {recentPrompts.map((prompt, i) => (
            <span
              className={cn(
                "bg-secondary px-4 py-2 rounded-full cursor-default select-none",
                selectedPrompt === i && "bg-slate-300"
              )}
              key={i}
              onClick={() => {
                if (selectedPrompt === i) {
                  setSelectedPrompt(-1);
                  setInput("");
                } else {
                  setSelectedPrompt(i);
                  setInput(prompt || "");
                }
              }}
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>
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
