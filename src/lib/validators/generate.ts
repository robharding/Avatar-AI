import { z } from "zod";

export const GenerateFormRequestSchema = z.object({
  prompt: z.string().min(3),
  amount: z.number().gte(1),
});

export type GenerateFormRequest = z.infer<typeof GenerateFormRequestSchema>;

export const GenerateFormResponseSchema = z.object({
  avatarIds: z.array(z.string()),
});

export type GenerateFormResponse = z.infer<typeof GenerateFormResponseSchema>;
