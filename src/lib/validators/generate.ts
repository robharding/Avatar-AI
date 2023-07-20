import { z } from "zod";

export const GenerateFormRequestSchema = z.object({
  prompt: z.string(),
});

export type GenerateFormRequest = z.infer<typeof GenerateFormRequestSchema>;

export const GenerateFormResponseSchema = z.object({
  imageUrl: z.string(),
});

export type GenerateFormResponse = z.infer<typeof GenerateFormResponseSchema>;
