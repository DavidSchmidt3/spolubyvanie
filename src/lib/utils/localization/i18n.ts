import { type Pathnames } from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["sk", "en"] as const;
export const defaultLocale = "sk";
export const localePrefix = "always";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return {
    messages: (await import(`./${locale}/translation.json`)).default,
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
} satisfies Pathnames<typeof locales>;
