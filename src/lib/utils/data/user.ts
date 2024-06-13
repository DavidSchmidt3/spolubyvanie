import { createClient } from "@/lib/utils/supabase/server";
import { cache } from "react";

export type User = Awaited<ReturnType<typeof getUser>>;
export const getUser = cache(async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  return user.data.user;
});
