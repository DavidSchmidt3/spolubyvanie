import * as z from "zod";

export const RESET_PASSWORD_SCHEMA = z.object({
  email: z.string().email({
    message: "alerts.auth.email.validation.invalid",
  }),
});
