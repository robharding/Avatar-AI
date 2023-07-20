"use client";

import { FC, useState } from "react";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dna } from "lucide-react";
import {
  GenerateFormRequest,
  GenerateFormResponse,
  GenerateFormRequestSchema,
} from "@/lib/validators/generate";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import Link from "next/link";
import Image from "next/image";

interface GenerateFormProps {
  user?: User;
}

const GenerateForm: FC<GenerateFormProps> = ({ user }) => {
  const form = useForm<GenerateFormRequest>({
    resolver: zodResolver(GenerateFormRequestSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const { loginToast } = useCustomToast();
  const [imagePreview, setImagePreview] = useState<string>("");

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
    async onSuccess({ imageUrl }: GenerateFormResponse) {
      router.refresh();
      form.reset();

      toast({
        title: "Success",
        description: <Link href={imageUrl}>View full image</Link>,
      });

      setImagePreview(imageUrl);
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
                <Input placeholder="Prompt..." {...field} />
              </FormControl>
              <FormDescription>
                Your prompt to generate an avatar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {!isLoading && <Dna className="w-4 h-4 mr-2" />}
          Generate
        </Button>
      </form>
      <div>
        {imagePreview && (
          <img
            src={imagePreview}
            width={512}
            height={512}
            alt="generated avatar"
            className="rounded-md mt-4 mx-auto"
          />
        )}
      </div>
    </Form>
  );
};

export default GenerateForm;
