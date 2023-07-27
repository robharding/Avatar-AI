import { getAuthSession } from "@/lib/auth";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

const STRIPE_PRODUCT_ID = "price_1NXV0pLdVLWtrBNNHrR9ufAY";

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 400 });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    metadata: {
      userId: session.user.id,
    },
    payment_method_types: ["card"],
    line_items: [{ price: STRIPE_PRODUCT_ID, quantity: 1 }],
    mode: "payment",
    success_url: "http://localhost:3000/",
  });

  return NextResponse.json({ sessionId: stripeSession.id });
}
