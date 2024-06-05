import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { LOCALE_PREFIX, LOCALES_CODES, pathnames } from "./i18n";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales: LOCALES_CODES,
    localePrefix: LOCALE_PREFIX,
    pathnames,
  });
