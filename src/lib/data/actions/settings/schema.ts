import { LOCALES, type Locale } from "@/lib/utils/localization/i18n";
import { THEMES } from "@/lib/utils/theme/config";
import * as z from "zod";

export const SETTINGS_FORM_SCHEMA = z.object({
  theme: z.enum(THEMES, {
    required_error: "alerts.settings.theme.validation.required",
    message: "alerts.settings.theme.validation.required",
  }),
  locale: z.enum(LOCALES.map((locale) => locale.code) as [Locale], {
    required_error: "alerts.settings.locale.validation.required",
    message: "alerts.settings.locale.validation.required",
  }),
});
