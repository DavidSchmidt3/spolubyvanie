import { actionClient } from "@/lib/utils/data/actions/safe-action-client";
import {
  ADVERTISEMENTS_FILTER_SCHEMA,
  type AdvertisementFilterFormValues,
} from "@/lib/utils/data/advertisements/schema";
import { db } from "@/lib/utils/prisma";
import { type Database } from "@/lib/utils/supabase/types/database";
import { formatZodErrors } from "@/lib/utils/zod";
import { unstable_cache as next_cache } from "next/cache";
import "server-only";
import * as z from "zod";
import { type AdType } from "./types";

export type Advertisement =
  Database["public"]["Tables"]["advertisements"]["Row"];
export const getAdvertisementsCached = next_cache(async () => {
  return db.advertisements.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
});

export const getAdvertisementsFiltered = async ({
  municipality,
  district,
  region,
  price_min,
  price_max,
  advertisement_type,
}: AdvertisementFilterFormValues) => {
  return db.advertisements.findMany({
    where: {
      municipality_id: municipality ?? undefined,
      price: {
        gte: price_min ? parseInt(price_min) : undefined,
        lte: price_max ? parseInt(price_max) : undefined,
      },
      municipalities: {
        district_id: district ?? undefined,
        districts: {
          region_id: region ?? undefined,
        },
      },
      type: (advertisement_type as unknown as AdType) ?? undefined,
    },
    orderBy: {
      price: "asc",
    },
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
