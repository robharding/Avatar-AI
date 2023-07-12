"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  GenerateFormSchema,
} from "@/lib/validators/generate";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface GenerateFormProps {}

const GenerateForm: FC<GenerateFormProps> = ({}) => {
  const form = useForm<GenerateFormRequest>({
    resolver: zodResolver(GenerateFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (payload: GenerateFormRequest) => {
      const { data } = await axios.post("/api/generate", payload);
      return data;
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
    </Form>
  );
};

export default GenerateForm;
