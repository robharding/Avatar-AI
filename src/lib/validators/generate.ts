import { z } from "zod";

export const createGenerateFormSchema = (credits: number) => {
  return z.object({
    prompt: z.string().min(3),
    amount: z.number().lte(credits, "Not enough credits"),
  });
};

export const GenerateFormRequestSchema = z.object({
  prompt: z.string().min(3),
  amount: z.number().gte(1),
});

export const GenerateFormResponseSchema = z.object({
  avatarIds: z.array(z.string()),
});

export type GenerateFormResponse = z.infer<typeof GenerateFormResponseSchema>;
