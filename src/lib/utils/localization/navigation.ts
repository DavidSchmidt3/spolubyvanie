import {
  createLocalizedPathnamesNavigation,
  type Pathnames,
} from "next-intl/navigation";
import { localePrefix, locales } from "./i18n";

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

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
