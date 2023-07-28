import { z } from "zod";

export const FeedbackFormRequestSchema = z.object({
  text: z.string().min(3),
});

export type FeedbackFormRequest = z.infer<typeof FeedbackFormRequestSchema>;
