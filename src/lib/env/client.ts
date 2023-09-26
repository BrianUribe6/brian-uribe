/**
 * Client side only environment variables defined in .env must be defined here.
 */
import { z } from "zod";

const envSchema = z.object({
  PUBLIC_TURNSTILE_SITE_KEY: z.string().nonempty(),
});

const env = envSchema.parse({
  PUBLIC_TURNSTILE_SITE_KEY: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
});

export default env;
