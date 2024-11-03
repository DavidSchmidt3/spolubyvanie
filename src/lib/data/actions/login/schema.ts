import { type Locale } from "@/lib/utils/localization/i18n";
import * as z from "zod";

export const LOCALE_ACTION_SCHEMA = z.object({
  locale: z.custom<Locale>((value) => value as Locale),
});

export const USER_AUTH_FORM_SCHEMA = z
  .object({
    email: z.string().email({
      message: "alerts.auth.email.validation.invalid",
    }),
    password: z
      .string({
        required_error: "alerts.auth.password.validation.required",
      })
      .min(8, {
        message: "alerts.auth.password.validation.invalid",
      }),
  })
  .merge(LOCALE_ACTION_SCHEMA);
