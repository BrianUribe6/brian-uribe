/**
 * Server only environment variables defined in .env must be defined here.
 */
import { z } from "zod";

const serverEnvSchema = z.object({
  ALTERNATIVE_EMAIL: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  WEBSITE_EMAIL: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
});

const env = serverEnvSchema.parse({
  ALTERNATIVE_EMAIL: import.meta.env.ALTERNATIVE_EMAIL,
  TURNSTILE_SECRET_KEY: import.meta.env.TURNSTILE_SECRET_KEY,
  WEBSITE_EMAIL: import.meta.env.WEBSITE_EMAIL,
  RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
});

export default env;
