import nodemailer, { type SendMailOptions } from "nodemailer";

const EMAIL_HOST = import.meta.env.EMAIL_HOST;
const EMAIL_USER = import.meta.env.EMAIL_USER;
const EMAIL_PASS = import.meta.env.EMAIL_PASS;
const EMAIL_PORT = import.meta.env.EMAIL_PORT;

if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS || !EMAIL_PORT) {
  throw new Error("Missing email credentials");
}

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: import.meta.env.NODE_ENV === "production",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default async function sendEmail(options: Omit<SendMailOptions, "to">) {
  (options as SendMailOptions).to = EMAIL_USER;
  return transporter.sendMail(options);
}
