import { type AdvertisementProperties } from "@/lib/data/advertisements/schema";
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
}

function getStringValue(value: string | string[]) {
  return Array.isArray(value) ? value.join(",") : value ?? "";
}

function processObject(
  data:
    | Record<string, string | string[] | Record<string, boolean> | undefined>
    | undefined,
  appendFunc: (key: string, value: string) => void
) {
  if (!data) {
    return;
  }

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (typeof value === "object" && !Array.isArray(value)) {
      const propertiesQueryString = Object.keys(value).reduce((acc, subKey) => {
        if (value[subKey]) {
          acc += `${subKey},`;
        }
        return acc;
      }, "");
      if (propertiesQueryString) {
        appendFunc(key, propertiesQueryString);
      }
    } else if (typeof value === "boolean") {
      if (value) {
        appendFunc(key, "true");
      }
    } else if (value?.length) {
      appendFunc(key, getStringValue(value));
    }
  });
}

export function getCurrentQueryString(
  searchParams?:
    | URLSearchParams
    | Record<string, string | string[] | Record<string, boolean>>
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
    processObject(searchParams, (key, value) => queryString.append(key, value));
  }

  return queryString.toString();
}

export function createQueryStringFromObject(
  data: Record<string, string | string[] | Record<string, boolean>>
) {
  const queryString = new URLSearchParams();
  processObject(data, (key, value) => queryString.append(key, value));
  return queryString.toString();
}

export function createQueryParamsFromObject(
  data:
    | Record<string, string | string[] | Record<string, boolean> | undefined>
    | undefined
) {
  const queryParams = {} as Record<string, string | string[]>;
  processObject(data, (key, value) => {
    queryParams[key] = value;
  });
  return queryParams;
}

export function constructPropertiesObject(
  advertisementProperties: string | null
): AdvertisementProperties {
  if (!advertisementProperties) {
    return {};
  }

  const properties = advertisementProperties.split(",");

  return properties.reduce((acc, property) => {
    if (acc) {
      acc[property] = true;
    }
    return acc;
  }, {} as Record<string, boolean>);
}

export function buildPaginatedQuery(currentQueryString: string, page: number) {
  const queryString = new URLSearchParams(currentQueryString);
  queryString.set("page", page.toString());
  return queryString.toString();
}
