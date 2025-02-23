import { db } from "@/lib/utils/prisma";

export type Property = Awaited<
  ReturnType<typeof getAdvertisementProperties>
>[number];

export const getAdvertisementProperties = async () => {
  // "use cache";
  // cacheLife({
  //   stale: 10000000,
  //   revalidate: 10000000,
  //   expire: 10000000,
  // });
  return db.properties.findMany({
    include: {
      properties_group: true,
    },
  });
};
