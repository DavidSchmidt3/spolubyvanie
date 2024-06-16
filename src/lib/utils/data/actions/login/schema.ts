import * as z from "zod";

export const USER_AUTH_FORM_SCHEMA = z.object({
  email: z.string().email({
    message: "alerts.login.email.validation.invalid",
  }),
  password: z
    .string({
      required_error: "alerts.login.password.validation.required",
    })
    .min(6, {
      message: "alerts.login.password.validation.invalid",
    }),
});
