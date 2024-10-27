import { createClient } from "@/lib/utils/supabase/server";
import { cache } from "react";
import "server-only";

export type User = Awaited<ReturnType<typeof getUser>>;
export const getUser = cache(async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return user.data.user;
});
