"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { CheckoutResponseSchema } from "../lib/validators/checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export function useBuyCredits() {
  const { mutate: buyCredits } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/checkout");
      const { sessionId } = await CheckoutResponseSchema.parse(response.data);

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId,
      });
    },
  });

  return { buyCredits };
}
