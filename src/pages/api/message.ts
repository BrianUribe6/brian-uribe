import env from "@/lib/env/server";
import sendEmail, { EmailError } from "@/lib/sendEmail";
import { contactFormSchema } from "@/lib/validation";
import verifyCaptcha from "@/lib/verifyCaptcha";
import type { APIRoute } from "astro";
import { z } from "zod";

const FROM_EMAIL = env.WEBSITE_EMAIL;
const TO_EMAIL = env.ALTERNATIVE_EMAIL;
const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY;

const IP_HEADER = "CF-Connecting-IP";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const ip = request.headers.get(IP_HEADER);
    const {
      firstName,
      lastName,
      email,
      message,
      "cf-turnstile-response": token,
    } = contactFormSchema.parse(body);

    const isValidCaptcha = await verifyCaptcha(token, TURNSTILE_SECRET_KEY, ip);

    if (!isValidCaptcha) {
      return new Response("Invalid captcha", { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;
    const data = await sendEmail({
      from: `${fullName} <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `${fullName} <${email}> sent you a message!`,
      text: message,
    });

    return new Response(JSON.stringify(data));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 400 });
    }
    if (e instanceof EmailError) {
      return new Response(e.message, { status: e.status });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
};
