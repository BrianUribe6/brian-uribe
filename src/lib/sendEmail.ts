import { Resend, type ErrorResponse } from "resend";
import type { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import env from "./env/server";

const resend = new Resend(env.RESEND_API_KEY);

export class EmailError extends Error {
  status: number;
  constructor(error: ErrorResponse["error"]) {
    super(error.message);
    this.name = "EmailError";
    this.status = error.status;
  }
}

/**
 * @throws {EmailError}
 */
async function sendEmail(options: CreateEmailOptions) {
  // resend doesn't throw errors, so I'm rolling my own error handling
  const data = await resend.emails.send(options);
  if ("error" in data) {
    const { error } = data as ErrorResponse;
    throw new EmailError(error);
  }
  return data;
}

export default sendEmail;
