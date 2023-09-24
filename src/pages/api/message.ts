import { contactFormSchema } from "@/lib/validation";
import type { APIRoute } from "astro";
import { Resend, type ErrorResponse } from "resend";
import { z } from "zod";

const FROM_EMAIL = import.meta.env.WEBSITE_EMAIL;
const TO_EMAIL = import.meta.env.ALTERNATIVE_EMAIL;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const requestBody = await request.json();
    const { firstName, lastName, email, message } =
      contactFormSchema.parse(requestBody);

    const data = await resend.emails.send({
      from: `Brian Uribe <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `${firstName} ${lastName} <${email}> sent you a message!`,
      text: message,
    });

    if ("error" in data) {
      const { error } = data as ErrorResponse;
      return new Response(JSON.stringify(error), { status: error.status });
    }

    return new Response(JSON.stringify(data));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
};
