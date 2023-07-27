import { z } from "zod";

export const CheckoutRequestSchema = z.object({
  creditsAmount: z.number(),
});

export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;

export const CheckoutResponseSchema = z.object({
  sessionId: z.string(),
});

export type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;
