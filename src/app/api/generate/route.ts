import { getAuthSession } from "@/lib/auth";
import { GenerateFormSchema } from "@/lib/validators/generate";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 400 });
    }

    const body = await req.json();
    const { prompt } = GenerateFormSchema.parse(body);
    console.log(prompt);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could not fetch posts", { status: 500 });
  }
}
