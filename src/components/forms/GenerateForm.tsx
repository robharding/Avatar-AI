"use client";

import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dna } from "lucide-react";
import {
  GenerateFormResponse,
  createGenerateFormSchema,
} from "@/lib/validators/generate";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import Image from "next/image";
import { S3_URL } from "@/constants";
import { z } from "zod";
import AvatarPreview from "../collection/AvatarPreview";

interface GenerateFormProps {
  user?: User;
}

const GenerateForm: FC<GenerateFormProps> = ({ user }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { loginToast } = useCustomToast();
  const [imageIds, setImageIds] = useState<string[]>([]);

  const GenerateFormRequestSchema = createGenerateFormSchema(
    user?.credits ?? 0
  );
  type GenerateFormRequest = z.infer<typeof GenerateFormRequestSchema>;
  const form = useForm<GenerateFormRequest>({
    resolver: zodResolver(GenerateFormRequestSchema),
    defaultValues: {
      prompt: searchParams.get("prompt") ?? "",
      amount: 1,
    },
  });

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (payload: GenerateFormRequest) => {
      if (!user) {
        return loginToast();
      }

      const { data } = await axios.post("/api/generate", payload);
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
      form.reset();

      setImageIds(avatarIds);

      return toast({
        title: "Success",
        description: `Generated ${avatarIds.length} images`,
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input disabled={!user} placeholder="Prompt..." {...field} />
              </FormControl>
              <FormDescription>
                Your prompt to generate an avatar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  disabled={!user}
                  type="number"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    field.onChange(+event.target.value)
                  }
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                How many to generate. (1 credit each)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !user}
        >
          {!isLoading && <Dna className="w-4 h-4 mr-2" />}
          Generate
        </Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
        {imageIds.map((imageId) => (
          <AvatarPreview avatarId={imageId} key={imageId} />
        ))}
      </div>
    </Form>
  );
};

export default GenerateForm;
