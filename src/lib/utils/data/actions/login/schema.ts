import * as z from "zod";

export const USER_AUTH_FORM_SCHEMA = z.object({
  email: z.string().email({ message: "login.email.validation.invalid" }),
});
