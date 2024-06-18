import * as z from "zod";

const passwordType = z
  .string({
    required_error: "alerts.auth.password.validation.required",
  })
  .min(8, {
    message: "alerts.auth.password.validation.invalid",
  });

export const PASSWORD_CHANGE_SCHEMA = z
  .object({
    password: passwordType,
    passwordConfirm: passwordType,
    accessToken: z.string().min(1, {
      message: "alerts.password_change.access_token.invalid",
    }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "alerts.password_change.passwords.not_matching",
        path: ["passwordConfirm"],
      });
    }
  });
