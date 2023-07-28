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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { S3_URL } from "@/constants";
import {
  FeedbackFormRequest,
  FeedbackFormRequestSchema,
} from "@/lib/validators/feedback";
import { Textarea } from "../ui/textarea";

interface FeedbackFormProps {
  user: User;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ user }) => {
  const form = useForm<FeedbackFormRequest>({
    resolver: zodResolver(FeedbackFormRequestSchema),
    defaultValues: {
      text: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (payload: FeedbackFormRequest) => {
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
    async onSuccess() {
      router.refresh();
      form.reset();
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea placeholder="Feedback..." {...field} />
              </FormControl>
              <FormDescription>Your feedback for the developer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {!isLoading && <Send className="w-4 h-4 mr-2" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
