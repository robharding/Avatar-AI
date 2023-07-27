import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import { Stripe } from "stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const payload = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_SIGNING_SECRET!
    );
  } catch (err) {
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      return new Response(`Webhook Error: ${err.message}`, { status: 500 });
    } else {
      return new Response("Something went wrong.", { status: 500 });
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      const completedEvent = event.data.object as {
        id: string;
        metadata: {
          userId: string;
          amount: string;
        };
      };

      await db.user.update({
        where: { id: completedEvent.metadata.userId },
        data: {
          credits: {
            increment: +completedEvent.metadata.amount,
          },
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Ok");
}
