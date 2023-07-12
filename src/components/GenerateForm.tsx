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

const GenerateFormSchema = z.object({
  prompt: z.string(),
});
type GenerateFormRequest = z.infer<typeof GenerateFormSchema>;

interface GenerateFormProps {}

const GenerateForm: FC<GenerateFormProps> = ({}) => {
  const form = useForm<GenerateFormRequest>({
    resolver: zodResolver(GenerateFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (values: GenerateFormRequest) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">
          <Dna className="w-4 h-4 mr-2" />
          Generate Avatar
        </Button>
      </form>
    </Form>
  );
};

export default GenerateForm;
