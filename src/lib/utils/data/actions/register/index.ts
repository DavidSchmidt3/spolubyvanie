"use server";

import { redirect as redirectLocal } from "@/lib/utils/localization/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { revalidatePath } from "next/cache";
import { USER_AUTH_FORM_SCHEMA } from "../login/schema";
import { getTranslatedSupabaseSignUpError } from "./supabase-sign-up-errors";

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
  console.log("Signing up with email", email, password);
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log("Sign up response", error, data);

  if (error) {
    console.error("Error signing up with email", error);
    return {
      isError: true,
      error: getTranslatedSupabaseSignUpError(error.message),
    };
  }

  revalidatePath("/", "layout");
  redirectLocal("/");
}
