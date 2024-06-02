import { IntlErrorCode } from "next-intl";
import { type Pathnames } from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const LOCALES = ["sk", "en"] as const;
export const DEFAULT_LOCALE = "sk";
export const LOCALE_PREFIX = "always";

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  return {
    messages: (await import(`./${locale}/translation.json`)).default,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // TODO: log to grafana
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
} satisfies Pathnames<typeof LOCALES>;
