import sendEmail from "@/lib/sendEmail";
import { contactFormSchema } from "@/lib/validation";
import type { APIRoute } from "astro";
import { z } from "zod";

export const POST: APIRoute = async ({ request }) => {
  try {
    const requestBody = await request.json();
    const { firstName, lastName, email, message } =
      contactFormSchema.parse(requestBody);

    const result = await sendEmail({
      from: ` ${firstName} ${lastName} <${email}>`,
      subject: `New message from ${firstName} ${lastName}`,
      text: message,
    });

    return new Response(JSON.stringify(result));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
};
