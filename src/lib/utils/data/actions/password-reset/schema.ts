import { LOCALES, type Language } from "@/lib/utils/localization/i18n";
import * as z from "zod";

export const PASSWORD_RESET_SCHEMA = z.object({
  email: z.string().email({
    message: "alerts.auth.email.validation.invalid",
  }),
  language: z.enum(LOCALES.map((language) => language.code) as [Language], {
    required_error: "alerts.password_reset.schema.invalid",
    message: "alerts.password_reset.schema.invalid",
  }),
});
