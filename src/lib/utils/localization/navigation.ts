import {
  LOCALE_PREFIX,
  LOCALES_CODES,
  pathnames,
} from "@/lib/utils/localization/i18n";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales: LOCALES_CODES,
    localePrefix: LOCALE_PREFIX,
    pathnames,
  });

export async function pushRouteWithTransition(
  href: keyof typeof pathnames,
  router: ReturnType<typeof useRouter>
) {
  const body = document.querySelector("body");

  body?.classList.add("page-transition");
  await new Promise((resolve) => setTimeout(resolve, 200));
  router.push(href);
  await new Promise((resolve) => setTimeout(resolve, 200));

  body?.classList.remove("page-transition");
  return;
}
