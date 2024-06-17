"use server";

import { redirect as redirectLocal } from "@/lib/utils/localization/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { USER_AUTH_FORM_SCHEMA } from "./schema";
import { getTranslatedSupabaseSignInError } from "./supabaseSignInErrors";

export async function googleLogin() {
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

export async function signInWithEmail(input: unknown) {
  const supabase = createClient();
  const validatedSettingsInput = USER_AUTH_FORM_SCHEMA.safeParse(input);

  if (!validatedSettingsInput.success) {
    const errors = formatZodErrorsToArray(validatedSettingsInput);
    return {
      isError: true,
      error: errors,
    };
  }

  const { email, password } = validatedSettingsInput.data;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in with email", error);
    const translatedError = getTranslatedSupabaseSignInError(error.message);
    return {
      isError: true,
      error: translatedError,
    };
  }

  revalidatePath("/", "layout");
  redirectLocal("/");
}

export async function signUpWithEmail(input: unknown) {
  const supabase = createClient();
  const validatedSettingsInput = USER_AUTH_FORM_SCHEMA.safeParse(input);

  if (!validatedSettingsInput.success) {
    const errors = formatZodErrorsToArray(validatedSettingsInput);
    return {
      isError: true,
      error: errors,
    };
  }

  const { email, password } = validatedSettingsInput.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up with email", error);
    return {
      isError: true,
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirectLocal("/");
}
