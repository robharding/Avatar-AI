import { getAuthSession } from "@/lib/auth";
import stripe from "@/lib/stripe";
import { CheckoutRequestSchema } from "@/lib/validators/checkout";
import { NextResponse } from "next/server";
import { z } from "zod";

const STRIPE_PRODUCT_ID_25_CREDITS = "price_1NXV0pLdVLWtrBNNHrR9ufAY";
const STRIPE_PRODUCT_ID_50_CREDITS = "price_1NYVTaLdVLWtrBNNmZdD05us";
const STRIPE_PRODUCT_ID_100_CREDITS = "price_1NYVTzLdVLWtrBNN3s7CQyZx";

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 400 });
  }

  let productId: string;
  let amount = 25;
  try {
    const body = await req.json();
    let { creditsAmount } = CheckoutRequestSchema.parse(body);
    amount = creditsAmount;
    switch (creditsAmount) {
      case 25:
        productId = STRIPE_PRODUCT_ID_25_CREDITS;
        break;
      case 50:
        productId = STRIPE_PRODUCT_ID_50_CREDITS;
        break;
      case 100:
        productId = STRIPE_PRODUCT_ID_100_CREDITS;
        break;
      default:
        productId = STRIPE_PRODUCT_ID_50_CREDITS;
        amount = 25;
        break;
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Something went wrong.", { status: 500 });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    metadata: {
      userId: session.user.id,
      amount: amount,
    },
    payment_method_types: ["card"],
    line_items: [{ price: productId, quantity: 1 }],
    mode: "payment",
    success_url: "http://localhost:3000/",
  });

  return NextResponse.json({ sessionId: stripeSession.id });
}
