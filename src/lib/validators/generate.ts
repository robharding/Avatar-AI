import { z } from "zod";

export const GenerateFormSchema = z.object({
  prompt: z.string(),
});

export type GenerateFormRequest = z.infer<typeof GenerateFormSchema>;
