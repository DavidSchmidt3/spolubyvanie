"use server";
import { actionClient } from "@/lib/utils/data/actions/safe-action-client";
import {
  ADVERTISEMENTS_FILTER_SCHEMA,
  type AdvertisementFilterFormValues,
} from "@/lib/utils/data/advertisements/schema";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";
import { type Prisma } from "@prisma/client";
import { unstable_cache as next_cache } from "next/cache";
import * as z from "zod";

function getFormattedAdvertisement(
  advertisement: Awaited<ReturnType<typeof fetchAdvertisements>>[number]
) {
  return {
    id: advertisement.id,
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

async function fetchAdvertisements(filter?: Prisma.advertisementsFindManyArgs) {
  return await db.advertisements.findMany({
    take: 50,
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
  });
}

export const getAdvertisementsCached = next_cache(async () => {
  const advertisements = await fetchAdvertisements();
  return advertisements.map(getFormattedAdvertisement);
}, ["advertisements"]);

export const getAdvertisementsFiltered = async ({
  municipality,
  district,
  region,
  price_min,
  price_max,
  advertisement_type,
}: AdvertisementFilterFormValues) => {
  const advertisements = await fetchAdvertisements({
    where: {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is here on purpose - there has to be empty string in form as empty value
      municipality_id: municipality || undefined,
      price: {
        gte: price_min ? parseInt(price_min) : undefined,
        lte: price_max ? parseInt(price_max) : undefined,
      },
      municipalities: {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- same as above
        district_id: district || undefined,
        districts: {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- same as above
          region_id: region || undefined,
        },
      },
      type: advertisement_type ? parseInt(advertisement_type) : undefined,
    },
  });
  return advertisements.map(getFormattedAdvertisement);
};

export const getAdvertisements = actionClient
  .schema(ADVERTISEMENTS_FILTER_SCHEMA.or(z.null()), {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput }) => {
    if (!parsedInput) {
      return getAdvertisementsCached();
    }

    return getAdvertisementsFiltered(parsedInput);
  });
