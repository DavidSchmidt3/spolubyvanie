import { enUS, sk } from "date-fns/locale";
import { IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import enAlerts from "./en/alerts.json";
import enMetadata from "./en/metadata.json";
import enTranslations from "./en/translations.json";

export const LOCALES = [
  { code: "sk", name: "Slovenčina", flagPath: "/flags/slovak.svg" },
  { code: "en", name: "English", flagPath: "/flags/english.svg" },
] as const;
export const LOCALES_CODES = LOCALES.map((locale) => locale.code);
export const DEFAULT_LOCALE = "sk";
export const LOCALE_PREFIX = "always";
export type Locale = (typeof LOCALES)[number]["code"];

export function getLocaleForDate(locale: Locale) {
  return locale === "en" ? enUS : sk;
}

export function getLocaleDateFormat(locale: Locale) {
  return locale === "en" ? "MM/dd/yyyy" : "dd.MM.yyyy";
}

export const allMessages = {
  ...enMetadata,
  ...enAlerts,
  ...enTranslations,
};

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.some((l) => l.code === locale)) notFound();

  return {
    messages: {
      ...(await import(`./${locale}/metadata.json`)).default,
      ...(await import(`./${locale}/alerts.json`)).default,
      ...(await import(`./${locale}/translations.json`)).default,
    },
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error("Missing message:", error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".");

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + " is not yet translated";
      } else {
        return "Dear developer, please fix this message: " + path;
      }
    },
  };
});

export const pathnames = {
  "/[page]": {
    en: "/[page]",
    sk: "/[page]",
  },

  "/settings": {
    en: "/settings",
    sk: "/nastavenia",
  },

  "/login": {
    en: "/login",
    sk: "/prihlasenie",
  },

  "/error": {
    en: "/error",
    sk: "/chyba",
  },

  "/register": {
    en: "/register",
    sk: "/registracia",
  },

  "/password-reset": {
    en: "/password-reset",
    sk: "/obnova-hesla",
  },

  "/password-change": {
    en: "/password-change",
    sk: "/zmena-hesla",
  },

  "/contact": {
    en: "/contact",
    sk: "/kontakt",
  },

  "/add-advertisement": {
    en: "/add-advertisement",
    sk: "/pridat-inzerat",
  },

  "/my-advertisements": {
    en: "/my-advertisements",
    sk: "/moje-inzeraty",
  },

  "/advertisement/[id]": {
    en: "/advertisement/[id]",
    sk: "/inzerat/[id]",
  },

  "/advertisement/[id]/edit": {
    en: "/advertisement/[id]/edit",
    sk: "/inzerat/[id]/upravit",
  },

  // Also (optional) catch-all segments are supported
  // "/categories/[...slug]": {
  //   en: "/categories/[...slug]",
  //   sk: "/kategorien/[...slug]",
  // },
} as const;
