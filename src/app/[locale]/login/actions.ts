"use server";

import { revalidatePath } from "next/cache";

import { redirect as redirectLocal } from "@/lib/utils/localization/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    // this is a redirect to the supabase oauth page outside of the app
    // localized redirect would also work here, but typescript would complain about the type, since this url is not part of the pathnames, but outside of the app
    redirect(data.url);
  }

  if (error) {
    // here is used localized redirect to handle localization because this is redirect in our app
    redirectLocal("/error");
  }

  revalidatePath("/", "layout");
  redirectLocal("/");
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirectLocal("/");
}
