import { db } from "@/lib/utils/prisma";
import { unstable_cacheLife as cacheLife } from "next/cache";
export type Property = Awaited<
  ReturnType<typeof getAdvertisementProperties>
>[number];

export const getAdvertisementProperties = async () => {
  "use cache";
  cacheLife("max");
  return db.properties.findMany({
    include: {
      properties_group: true,
    },
  });
};
