import * as z from "zod";

export const USER_AUTH_FORM_SCHEMA = z.object({
  email: z
    .string({
      message: "alerts.auth.email.validation.invalid",
    })
    .email({
      message: "alerts.auth.email.validation.invalid",
    }),
  password: z
    .string({
      message: "alerts.auth.password.validation.invalid",
      required_error: "alerts.auth.password.validation.required",
    })
    .min(8, {
      message: "alerts.auth.password.validation.invalid",
    }),
});
