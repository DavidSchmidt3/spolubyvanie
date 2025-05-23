import { type Database } from "@/lib/utils/supabase/types/database";
import { createBrowserClient } from "@supabase/ssr";

export async function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const supabase = await createClient();
