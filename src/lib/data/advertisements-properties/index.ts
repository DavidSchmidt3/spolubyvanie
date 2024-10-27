import { db } from "@/lib/utils/prisma";
import { unstable_cache as next_cache } from "next/cache";

export type Property = Awaited<
  ReturnType<typeof getAdvertisementProperties>
>[number];

export const getAdvertisementProperties = next_cache(async () => {
  return db.properties.findMany({
    include: {
      properties_group: true,
    },
  });
}, ["properties"]);
