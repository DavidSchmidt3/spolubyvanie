import { db } from "@/lib/utils/prisma";
import { type Database } from "@/lib/utils/supabase/types/database";
import { unstable_cache as next_cache } from "next/cache";
import "server-only";

export type Advertisement =
  Database["public"]["Tables"]["advertisements"]["Row"];
export const getAdvertisements = next_cache(async () => {
  return db.advertisements.findMany({
    orderBy: {
      price: "asc",
    },
  });
});
