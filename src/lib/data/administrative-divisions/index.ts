import { db } from "@/lib/utils/prisma";
import { unstable_cacheLife as cacheLife } from "next/cache";
import "server-only";

export type Municipality = Awaited<
  ReturnType<typeof getMunicipalities>
>[number];
export const getMunicipalities = async () => {
  "use cache";
  cacheLife({
    expire: 100000000,
    stale: 100000000,
    revalidate: 100000000,
  });
  return db.municipalities.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export type District = Awaited<ReturnType<typeof getDistricts>>[number];
export const getDistricts = async () => {
  "use cache";
  cacheLife({
    expire: 100000000,
    stale: 100000000,
    revalidate: 100000000,
  });
  return db.districts.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export type Region = Awaited<ReturnType<typeof getRegions>>[number];
export const getRegions = async () => {
  "use cache";
  cacheLife({
    expire: 100000000,
    stale: 100000000,
    revalidate: 100000000,
  });
  return db.regions.findMany({
    orderBy: {
      name: "asc",
    },
  });
};
