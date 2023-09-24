import { Button } from "@/components/ui/button";
import {
  contactFormSchema,
  type ContactForm as ContactFormModel,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Field from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

const SUCCESS_MESSAGE = "Message sent successfully!";
const ERROR_MESSAGE = "Something went wrong!";

const API_ENDPOINT = "/api/message";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormModel>({
    resolver: zodResolver(contactFormSchema),
  });

  const sendMessage = async (formValues: ContactFormModel) => {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });
    const statusMessage = response.ok ? SUCCESS_MESSAGE : ERROR_MESSAGE;
    toast({ description: statusMessage });
  };

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
            placeholder="Type your message here"
            error={errors.message?.message}
            {...register("message")}
          >
            <Textarea />
          </Field>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Send message
      </Button>
    </form>
  );
}

export default ContactForm;
