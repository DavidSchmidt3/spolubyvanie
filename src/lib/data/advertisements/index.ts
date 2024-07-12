"use server";
import { type AdvertisementFullSchemaValues } from "@/lib/data/actions/advertisements/schema";
import { db } from "@/lib/utils/prisma";
import { type Prisma } from "@prisma/client";
import { unstable_cache as next_cache } from "next/cache";

function getFormattedAdvertisement(
  advertisement: Awaited<ReturnType<typeof fetchAdvertisements>>[0][number]
) {
  return {
    id: advertisement?.id,
    price: advertisement.price,
    description: advertisement.description,
    street: advertisement.street,
    title: advertisement.title,
    floor: advertisement.floor,
    room_area: advertisement.room_area,
    primary_photo_url: advertisement.primary_photo_url,
    type: advertisement.type,
    apartment_area: advertisement.apartment_area,
    available_from: advertisement.available_from,
    municipality: advertisement.municipalities.name,
    district: advertisement.municipalities.districts.name,
    region: advertisement.municipalities.districts.regions.name,
  };
}

export type Advertisement = ReturnType<typeof getFormattedAdvertisement>;
export type AdvertisementMeta = Awaited<
  ReturnType<typeof fetchAdvertisements>
>[1];
async function fetchAdvertisements(
  filter?: Prisma.advertisementsFindManyArgs,
  page?: string
) {
  try {
    return await db.advertisements
      .paginate({
        orderBy: {
          created_at: "desc",
        },
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
    advertisements: advertisements.map(getFormattedAdvertisement),
    paginationData,
  };
}, ["advertisements"]);

export const getAdvertisementsFiltered = async ({
  municipalities,
  districts,
  region,
  price_min,
  price_max,
  advertisement_type,
  page,
}: AdvertisementFullSchemaValues) => {
  const [advertisements, paginationData] = await fetchAdvertisements(
    {
      where: {
        municipality_id: municipalities?.length
          ? {
              in: Array.isArray(municipalities)
                ? municipalities
                : municipalities.split(","),
            }
          : undefined,
        price: {
          gte: price_min ? parseInt(price_min) : undefined,
          lte: price_max ? parseInt(price_max) : undefined,
        },
        municipalities: {
          district_id: districts?.length
            ? {
                in: Array.isArray(districts) ? districts : districts.split(","),
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
    advertisements: advertisements.map(getFormattedAdvertisement),
    paginationData,
  };
};
