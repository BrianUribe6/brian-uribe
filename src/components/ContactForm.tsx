import { Button } from "@/components/ui/button";
import env from "@/lib/env/client";
import {
  contactFormSchema,
  type ContactForm as ContactFormModel,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Turnstile from "./Turnstile";
import Field from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

const SUCCESS_MESSAGE = "Message sent successfully!";
const ERROR_MESSAGE = "Something went wrong! Could not send message.";

const API_ENDPOINT = "/api/message";

const TURNSTILE_SITE_KEY = env.PUBLIC_TURNSTILE_SITE_KEY;

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormModel>({
    resolver: zodResolver(contactFormSchema),
  });

  const sendMessage = async (formValues: ContactFormModel) => {
    setLoading(true);
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      setSubmitted(true);
      toast({ description: SUCCESS_MESSAGE });
    } else {
      toast({ description: ERROR_MESSAGE });
    }
  };

  if (submitted) {
    return <SubmittedMessage />;
  }

  return (
    <form onSubmit={handleSubmit(sendMessage)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Field
            label="First Name"
            placeholder="First Name"
            error={errors.firstName?.message}
            {...register("firstName")}
          >
            <Input />
          </Field>
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1 ">
          <Field
            label="Last Name"
            placeholder="Last Name"
            error={errors.lastName?.message}
            {...register("lastName")}
          >
            <Input />
          </Field>
        </div>
        <div className="space-y-2 col-span-2">
          <Field
            label="Email"
            placeholder="email@example.com"
            error={errors.email?.message}
            {...register("email")}
          >
            <Input />
          </Field>
        </div>
        <div className="space-y-2 col-span-2">
          <Field
            label="Message"
            error={errors.message?.message}
            placeholder="Type your message here"
            {...register("message")}
          >
            <Textarea />
          </Field>
        </div>
      </div>
      <SubmitButton loading={loading} />
      <Turnstile
        sitekey={TURNSTILE_SITE_KEY}
        appearance="interaction-only"
        callback={(token) => setValue("cf-turnstile-response", token)}
      />
    </form>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" className="w-full group" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Processing...
        </>
      ) : (
        <>Send Message</>
      )}
    </Button>
  );
}

function SubmittedMessage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Thank you for your message!</h2>
      <p className="text-lg">We will get back to you as soon as possible.</p>
    </div>
  );
}

export default ContactForm;
