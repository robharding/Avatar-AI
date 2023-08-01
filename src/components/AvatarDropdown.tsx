"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dna, Download, Loader2, Menu, Redo } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar } from "@prisma/client";
import { User } from "next-auth";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useToast } from "@/hooks/use-toast";
import {
  GenerateFormResponse,
  createGenerateFormSchema,
} from "@/lib/validators/generate";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import GenerateForm from "./forms/GenerateForm";

interface AvatarDropdownProps {
  avatar: Avatar;
  user: User;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ avatar, user }) => {
  const router = useRouter();

  const { loginToast } = useCustomToast();
  const { toast } = useToast();

  const GenerateFormRequestSchema = createGenerateFormSchema(
    user?.credits ?? 0
  );
  type GenerateFormRequest = z.infer<typeof GenerateFormRequestSchema>;
  const { mutate: makeVariant, isLoading } = useMutation({
    mutationFn: async (prompt: string) => {
      if (!user) {
        return loginToast();
      }

      const { data } = await axios.post("/api/generate", {
        prompt,
        amount: 1,
      } as GenerateFormRequest);
      return data;
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data,
        });
      }
    },
    async onSuccess({ avatarIds }: GenerateFormResponse) {
      router.refresh();

      return toast({
        title: "Success",
        description: `Generated ${avatarIds.length} images`,
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-12 h-12 sm:w-6 sm:h-6 bg-secondary flex rounded shadow-md">
          {!isLoading ? (
            <Menu className="h-8 w-8 sm:h-4 sm:w-4 m-auto" />
          ) : (
            <Loader2 className="h-8 w-8 sm:h-4 sm:w-4 m-auto animate-spin" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {}}>
          <Download className="w-4 h-4 mr-2" /> Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => makeVariant(avatar.prompt)}>
          <Dna className="w-4 h-4 mr-2" />
          Quick Variant (1 Credit)
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/generate?prompt=${avatar.prompt}`)}
        >
          <Redo className="w-4 h-4 mr-2" /> Reuse Prompt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
