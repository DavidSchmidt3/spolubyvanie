import { IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const LOCALES = [
  { code: "sk", name: "Slovenčina" },
  { code: "en", name: "English" },
] as const;
export const LOCALES_CODES = LOCALES.map((locale) => locale.code);
export const DEFAULT_LOCALE = "sk";
export const LOCALE_PREFIX = "always";
export type Locale = (typeof LOCALES)[number]["code"];

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
  "/": "/",

  // If locales use different paths, you can
  // specify each external path per locale.
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

  // Dynamic params are supported via square brackets
  // "/news/[articleSlug]-[articleId]": {
  //   en: "/news/[articleSlug]-[articleId]",
  //   sk: "/neuigkeiten/[articleSlug]-[articleId]",
  // },

  // Also (optional) catch-all segments are supported
  // "/categories/[...slug]": {
  //   en: "/categories/[...slug]",
  //   sk: "/kategorien/[...slug]",
  // },
} as const;
