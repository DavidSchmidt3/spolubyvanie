import {
  LOCALE_PREFIX,
  LOCALES_CODES,
  pathnames,
} from "@/lib/utils/localization/i18n";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { type HrefOrHrefWithParams } from "node_modules/next-intl/dist/types/src/navigation/shared/utils";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales: LOCALES_CODES,
    localePrefix: LOCALE_PREFIX,
    pathnames,
  });

export async function pushRouteWithTransition<
  Pathname extends keyof typeof pathnames
>(
  href: React.ComponentProps<typeof Link<Pathname>>["href"],
  router: ReturnType<typeof useRouter>
) {
  const body = document.querySelector("body");

  body?.classList.add("page-transition");
  await new Promise((resolve) => setTimeout(resolve, 200));
  router.push(href as HrefOrHrefWithParams<Pathname>);

  await new Promise((resolve) => setTimeout(resolve, 200));

  body?.classList.remove("page-transition");
}

function getStringValue(value: string | string[]) {
  return Array.isArray(value) ? value.join(",") : value ?? "";
}

export function getCurrentQueryString(
  searchParams?: URLSearchParams | Record<string, string | string[]>
) {
  if (!searchParams) {
    return "";
  }

  const queryString = new URLSearchParams();
  if (searchParams instanceof URLSearchParams) {
    for (const [key, value] of searchParams.entries()) {
      queryString.append(key, value);
    }
  } else {
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key]) {
        queryString.append(key, getStringValue(searchParams[key]));
      }
    });
  }
  return queryString.toString();
}

export function createQueryStringFromObject(
  data: Record<string, string | string[]>
) {
  const queryString = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      queryString.append(key, getStringValue(data[key]));
    }
  });
  return queryString.toString();
}

export function createQueryParamsFromObject(
  data: Record<string, string | string[]>
) {
  const queryParams = {} as Record<string, string | string[]>;
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      queryParams[key] = getStringValue(data[key]);
    }
  });
  return queryParams;
}

export function buildPaginatedQuery(currentQueryString: string, page: number) {
  const queryString = new URLSearchParams(currentQueryString);
  queryString.set("page", page.toString());
  return queryString.toString();
}
