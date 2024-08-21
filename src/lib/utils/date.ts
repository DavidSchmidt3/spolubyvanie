import { type Locale } from "./localization/i18n";

export function formatDate(date: Date | string, locale: Locale) {
  if (!date) return "-";
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString(locale);
  }
  return date.toLocaleDateString(locale);
}
