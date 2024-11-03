import { type Property } from "@/lib/data/advertisements-properties";
import {
  type AdvertisementProperty,
  type CheckPropertySchemaType,
} from "@/lib/data/advertisements-properties/types";
import { type AdvertisementProperties } from "@/lib/data/advertisements/schema";
import {
  LOCALE_PREFIX,
  LOCALES_CODES,
  pathnames,
} from "@/lib/utils/localization/i18n";
import { createNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({
    locales: LOCALES_CODES,
    localePrefix: LOCALE_PREFIX,
    pathnames,
  });

function getStringValue(value: string | string[]) {
  return Array.isArray(value) ? value.join(",") : value ?? "";
}

function processObject(
  data:
    | Record<
        string,
        string | string[] | Record<string, CheckPropertySchemaType> | undefined
      >
    | undefined,
  appendFunc: (key: string, value: string) => void
) {
  if (!data) {
    return;
  }

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (typeof value === "object" && !Array.isArray(value)) {
      const propertyQueryArray = Object.keys(value).reduce((acc, subKey) => {
        if (subKey && value[subKey]?.checked) {
          acc.push(subKey);
        }
        return acc;
      }, [] as string[]);
      if (propertyQueryArray) {
        appendFunc(key, propertyQueryArray.join(","));
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
    | Record<
        string,
        string | string[] | Record<string, CheckPropertySchemaType>
      >
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
  data: Record<
    string,
    string | string[] | Record<string, CheckPropertySchemaType>
  >
) {
  const queryString = new URLSearchParams();
  processObject(data, (key, value) => queryString.append(key, value));
  return queryString.toString();
}

export function createQueryParamsFromObject(
  data:
    | Record<
        string,
        string | string[] | Record<string, CheckPropertySchemaType> | undefined
      >
    | undefined
) {
  const queryParams = {} as Record<string, string | string[]>;
  processObject(data, (key, value) => {
    queryParams[key] = value;
  });
  return queryParams;
}

export function constructPropertiesObject(
  advertisementProperties: string | null,
  properties: Property[]
): AdvertisementProperties {
  if (!advertisementProperties) {
    return {};
  }

  const paramProperties = advertisementProperties.split(",");

  return paramProperties.reduce((acc, property) => {
    const propertyObject = properties?.find(
      (propertyObject) => propertyObject.id === property
    );

    if (propertyObject && acc) {
      acc[property] = {
        ...propertyObject,
        type: propertyObject.type as AdvertisementProperty,
        checked: true,
      };
    }
    return acc;
  }, {} as Record<string, CheckPropertySchemaType>);
}

export function buildPaginatedQuery(currentQueryString: string, page: number) {
  const queryString = new URLSearchParams(currentQueryString);
  queryString.set("page", page.toString());
  return queryString.toString();
}
