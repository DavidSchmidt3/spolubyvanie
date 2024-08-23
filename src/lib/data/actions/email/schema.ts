import * as z from "zod";

export const CONTACT_FORM_SCHEMA = z.object({
  userId: z.string().uuid(),
  advertisementTitle: z.string().min(1),
  message: z.string().min(11, {
    message: "alerts.advertisement.contact.message.required",
  }),
});

export type ContactFormValues = z.infer<typeof CONTACT_FORM_SCHEMA>;
