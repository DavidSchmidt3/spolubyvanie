import { db } from "@/lib/utils/prisma";
import { createClient } from "@/lib/utils/supabase/server";
import { cache } from "react";
import "server-only";

export type User = Awaited<ReturnType<typeof getUser>>;
export const getUser = cache(async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return user.data.user;
});

export type UserFilter = Awaited<ReturnType<typeof getUserFilters>>[number];
export const getUserFilters = cache(async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const filters = await db.users_filters.findMany({
    where: {
      user_id: user.id,
    },
  });

  return filters;
});
