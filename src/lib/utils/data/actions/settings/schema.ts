import { LOCALES, type Language } from "@/lib/utils/localization/i18n";
import { THEMES } from "@/lib/utils/theme/config";
import * as z from "zod";

export const SETTINGS_FORM_SCHEMA = z.object({
  theme: z.enum(THEMES, {
    required_error: "alerts.settings.theme.validation.required",
    message: "alerts.settings.theme.validation.required",
  }),
  language: z.enum(LOCALES.map((language) => language.code) as [Language], {
    required_error: "alerts.settings.language.validation.required",
    message: "alerts.settings.language.validation.required",
  }),
});
