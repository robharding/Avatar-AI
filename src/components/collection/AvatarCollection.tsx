"use client";

import { Avatar } from "@prisma/client";
import { ChangeEvent, FC, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { S3_URL } from "@/constants";
import { Toggle } from "../ui/toggle";
import AvatarDropdown from "./AvatarDropdown";

import { User } from "next-auth";
import AvatarPreview from "./AvatarPreview";

interface AvatarCollectionProps {
  avatars: Avatar[];
  user: User;
}

const AvatarCollection: FC<AvatarCollectionProps> = ({ avatars, user }) => {
  const [input, setInput] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<number>(-1);

  const prompts = avatars.map((avatar) => avatar.prompt);
  const recentPrompts = Array.from(new Set(prompts)).slice(0, 3);

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedPrompt(-1);
    setInput(e.currentTarget.value);
  }

  function selectedPromptChange(prompt: string, i: number) {
    if (selectedPrompt === i) {
      setSelectedPrompt(-1);
      setInput("");
    } else {
      setSelectedPrompt(i);
      setInput(prompt);
    }
  }

  return (
    <>
      <Input
        className="mt-4"
        value={input}
        onChange={(e) => inputChange(e)}
        placeholder="Search by prompt"
      />
      {recentPrompts && (
        <div className="mt-4">
          <h3>Recent prompts</h3>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {recentPrompts.map((prompt, i) => (
              <Toggle
                key={i}
                pressed={selectedPrompt === i}
                onClick={() => selectedPromptChange(prompt, i)}
              >
                {prompt}
              </Toggle>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {avatars
          .filter(
            (avatar) =>
              input.length === 0 ||
              avatar.prompt?.toLowerCase().includes(input.toLowerCase())
          )
          .map((avatar) => (
            <div key={avatar.id} className="relative">
              <AvatarPreview avatarId={avatar.id} />
              <div className="absolute -top-1 -right-1">
                <AvatarDropdown avatar={avatar} user={user} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AvatarCollection;
