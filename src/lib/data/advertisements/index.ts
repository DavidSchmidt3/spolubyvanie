"use server";
import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import {
  ADVERTISEMENTS_FILTER_SCHEMA,
  DEFAULT_SORT_BY,
  NULLABLE_SORT_BY_VALUES,
  type AdvertisementFullSchemaValues,
} from "@/lib/data/advertisements/schema";
import { db } from "@/lib/utils/prisma";
import { type Prisma } from "@prisma/client";
import { unstable_cache as next_cache } from "next/cache";
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
    return await db.advertisements
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
        },
      })
      .withPages({
        page: page ? parseInt(page) : 1,
        limit: 10,
      });
  } catch (error) {
    console.error("Error fetching advertisements", error);
    return [[], null] as const;
  }
}

export const getAdvertisementsCached = next_cache(async () => {
  const [advertisements, paginationData] = await fetchAdvertisements();
  return {
    advertisements: advertisements.map((advertisement) =>
      getFormattedAdvertisement(advertisement)
    ),
    paginationData,
  };
}, ["advertisements"]);

export const getAdvertisementsFiltered = async ({
  municipality,
  district,
  region,
  price_min,
  price_max,
  sort_by,
  sort_order,
  advertisement_type,
  page,
}: AdvertisementFullSchemaValues) => {
  const isSortOnNullableField = NULLABLE_SORT_BY_VALUES.includes(
    (sort_by as (typeof NULLABLE_SORT_BY_VALUES)[number]) ?? DEFAULT_SORT_BY
  );

  const [advertisements, paginationData] = await fetchAdvertisements(
    {
      orderBy: {
        // cant apply nulls on non-nullable fields
        [sort_by ?? "created_at"]: isSortOnNullableField
          ? {
              nulls: "last",
              sort: sort_order,
            }
          : sort_order ?? DEFAULT_SORT_BY,
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
        municipalities: {
          district_id: district?.length
            ? {
                in: Array.isArray(district) ? district : district.split(","),
              }
            : undefined,
          districts: {
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- same as above
            region_id: region || undefined,
          },
        },
        type: advertisement_type ? parseInt(advertisement_type) : undefined,
      },
    },
    page
  );
  return {
    advertisements: advertisements.map((advertisement) =>
      getFormattedAdvertisement(advertisement)
    ),
    paginationData,
  };
};

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
    paramsNumber === 1
  ) {
    return getAdvertisementsCached();
  }

  return getAdvertisementsFiltered({ ...safelyParsedSearchParams.data, page });
}
