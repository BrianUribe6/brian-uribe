import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  "cf-turnstile-response": z.string().nonempty(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
