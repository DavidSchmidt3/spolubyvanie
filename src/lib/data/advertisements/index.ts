import { type Property } from "@/lib/data/advertisements-properties";
import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import {
  ADVERTISEMENTS_FILTER_SCHEMA,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  NULLABLE_SORT_BY_VALUES,
  type AdvertisementFilterFormValues,
  type AdvertisementFullSchemaValues,
} from "@/lib/data/advertisements/schema";
import { AdType } from "@/lib/data/advertisements/types";
import { db } from "@/lib/utils/prisma";
import { saveAdvertisementToCache } from "@/lib/utils/redis";
import { type Prisma } from "@prisma/client";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { type ParsedUrlQuery } from "querystring";

export type AdvertisementMeta = Awaited<
  ReturnType<typeof fetchAdvertisements>
>[1];
export type AdvertisementsFetchResult = Awaited<
  ReturnType<typeof fetchAdvertisements>
>[0][number];
export async function fetchAdvertisements(
  filter?: Prisma.advertisementsFindManyArgs,
  page?: string
) {
  try {
    const advertisements = await db.advertisements
      .paginate({
        ...filter,
        include: {
          municipalities: {
            include: {
              districts: {
                include: {
                  regions: true,
                },
              },
            },
          },
          advertisements_photos: {
            select: {
              url: true,
            },
          },
          advertisements_properties: {
            select: {
              property_id: true,
            },
          },
        },
      })
      .withPages({
        page: page ? parseInt(page) : 1,
        limit: 10,
      });

    advertisements[0].forEach((advertisement) => {
      saveAdvertisementToCache(advertisement);
    });

    return advertisements;
  } catch (error) {
    console.error("Error fetching advertisements", error);
    return [[], null] as const;
  }
}

export const getAdvertisementsCached = async () => {
  "use cache";
  cacheLife("minutes");
  const [advertisements, paginationData] = await fetchAdvertisements();
  return {
    advertisements: advertisements.map((advertisement) =>
      getFormattedAdvertisement(advertisement)
    ),
    paginationData,
  };
};

export const getAdvertisementsFiltered = async (
  params: AdvertisementFullSchemaValues
) => {
  const { page } = params;

  const [advertisements, paginationData] = await fetchAdvertisements(
    createAdvertisementFilterObject(params),
    page
  );
  return {
    advertisements: advertisements.map((advertisement) =>
      getFormattedAdvertisement(advertisement)
    ),
    paginationData,
  };
};

export function createAdvertisementFilterObject({
  municipality,
  district,
  region,
  price_min,
  price_max,
  sort_by,
  properties,
  min_age,
  max_age,
  sort_order,
  advertisement_type,
  max_apartment_rooms,
  min_room_area,
}: AdvertisementFilterFormValues) {
  const isSortOnNullableField = NULLABLE_SORT_BY_VALUES.includes(
    (sort_by as (typeof NULLABLE_SORT_BY_VALUES)[number]) ?? DEFAULT_SORT_BY
  );
  const parsedAdvertisementType = advertisement_type
    ? parseInt(advertisement_type)
    : undefined;
  const isOffering = parsedAdvertisementType === AdType.OfferingRoom;
  const isSearching = parsedAdvertisementType === AdType.SearchingRoom;

  const propertiesConditions = getPropertiesConditions(properties);

  return {
    orderBy: {
      [sort_by ?? DEFAULT_SORT_BY]: isSortOnNullableField
        ? {
            nulls: "last",
            sort: sort_order,
          }
        : sort_order ?? DEFAULT_SORT_ORDER,
    },
    where: {
      municipality_id: municipality?.length
        ? {
            in: Array.isArray(municipality)
              ? municipality
              : municipality.split(","),
          }
        : undefined,
      price: {
        gte: price_min ? parseInt(price_min) : undefined,
        lte: price_max ? parseInt(price_max) : undefined,
      },
      min_age: getMinAge(isOffering, isSearching, min_age, max_age),
      max_age: getMaxAge(isOffering, min_age),
      municipalities: {
        district_id: district?.length
          ? {
              in: Array.isArray(district) ? district : district.split(","),
            }
          : undefined,
        districts: {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- cant apply nulls on non-nullable fields
          region_id: region || undefined,
        },
      },
      type: parsedAdvertisementType,
      AND: propertiesConditions,
      apartment_rooms: max_apartment_rooms
        ? {
            lte: parseInt(max_apartment_rooms),
            not: null,
          }
        : undefined,
      room_area: min_room_area
        ? {
            gte: parseInt(min_room_area),
            not: null,
          }
        : undefined,
    },
  };
}

export async function getAdvertisements(
  searchParams: ParsedUrlQuery,
  page: string
) {
  const safelyParsedSearchParams =
    ADVERTISEMENTS_FILTER_SCHEMA.safeParse(searchParams);

  const paramsNumber = Object.keys(safelyParsedSearchParams.data ?? {}).length;
  if (
    // If the page is 1 and there is only one parameter, it means that the user wants to get the cached data on first page
    page === "1" &&
    paramsNumber === 0
  ) {
    return getAdvertisementsCached();
  }

  return getAdvertisementsFiltered({ ...safelyParsedSearchParams.data, page });
}

const parseProperties = (
  properties: AdvertisementFullSchemaValues["properties"]
): string[] => {
  if (!properties) {
    return [];
  }

  if (Array.isArray(properties)) {
    return properties
      .filter((property): property is Property => property?.checked === true)
      .map((property) => property.id);
  }

  if (typeof properties === "string" && properties.length > 0) {
    return properties.split(",");
  }

  return [];
};

const getPropertiesConditions = (
  properties: AdvertisementFullSchemaValues["properties"]
) => {
  const propertyIds = parseProperties(properties);

  return propertyIds.map((propertyId) => ({
    advertisements_properties: {
      some: { property_id: propertyId },
    },
  }));
};

const getMinAge = (
  isOffering: boolean,
  isSearching: boolean,
  min_age: string | undefined, // user's "age" (or lower bound of user's range)
  max_age: string | undefined // user's upper bound (only relevant for isSearching)
) => {
  const userMinAge = min_age ? parseInt(min_age, 10) : undefined;
  const userMaxAge = max_age ? parseInt(max_age, 10) : undefined;

  /**
   * If "Offering" => Ad's min_age ≤ userAge
   *   i.e. userAge >= ad.min_age
   *   => ad.min_age <= userAge (Prisma: { lte: userAge })
   */
  if (isOffering && userMinAge !== undefined) {
    return { lte: userMinAge };
  }

  /**
   * If "Searching" => Ad's min_age must be > userProvidedMinAge
   *                 AND < userProvidedMaxAge
   * We handle that in one field (min_age in the DB).
   */
  if (isSearching) {
    const constraints: Record<string, number> = {};
    if (userMinAge !== undefined) {
      constraints.gt = userMinAge;
    }
    if (userMaxAge !== undefined) {
      constraints.lt = userMaxAge;
    }
    // Return these constraints if we have any, else undefined
    return Object.keys(constraints).length ? constraints : undefined;
  }

  // If neither "Offering" nor "Searching," no constraint:
  return undefined;
};

const getMaxAge = (isOffering: boolean, min_age: string | undefined) => {
  const userMinAge = min_age ? parseInt(min_age, 10) : undefined;

  /**
   * If "Offering" => Ad's max_age ≥ userAge
   *   i.e. userAge <= ad.max_age
   *   => ad.max_age >= userAge (Prisma: { gte: userAge })
   */
  if (isOffering && userMinAge !== undefined) {
    return { gte: userMinAge };
  }

  /**
   * If "Searching," no max_age constraints from your description
   *   because you only store one field in DB for the searcher's age ("min_age").
   */
  return undefined;
};
