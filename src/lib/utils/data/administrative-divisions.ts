import { db } from "@/lib/utils/prisma";
import { unstable_cache as next_cache } from "next/cache";
import "server-only";

export type Municipality = Awaited<
  ReturnType<typeof getMunicipalities>
>[number];
export const getMunicipalities = next_cache(async () => {
  return db.municipalities.findMany({
    orderBy: {
      name: "asc",
    },
  });
}, ["municipalities"]);

export type District = Awaited<ReturnType<typeof getDistricts>>[number];
export const getDistricts = next_cache(async () => {
  return db.districts.findMany({
    orderBy: {
      name: "asc",
    },
  });
}, ["districts"]);

export type Region = Awaited<ReturnType<typeof getRegions>>[number];
export const getRegions = next_cache(async () => {
  return db.regions.findMany({
    orderBy: {
      name: "asc",
    },
  });
}, ["regions"]);
