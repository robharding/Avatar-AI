import { z } from "zod";

export const CheckoutResponseSchema = z.object({
  sessionId: z.string(),
});

export type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;
