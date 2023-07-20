import { z } from "zod";

export const GenerateFormRequestSchema = z.object({
  prompt: z.string().min(3),
});

export type GenerateFormRequest = z.infer<typeof GenerateFormRequestSchema>;

export const GenerateFormResponseSchema = z.object({
  avatarId: z.string(),
});

export type GenerateFormResponse = z.infer<typeof GenerateFormResponseSchema>;
