import { db } from "@/lib/utils/prisma";
import { type Database } from "@/lib/utils/supabase/types/database";
import { cache } from "react";
import { getUser } from "./user";

export type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];
export const getSettings = cache(async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return db.user_settings.findFirst({
    where: {
      id: user.id,
    },
  }) as unknown as UserSettings;
});
