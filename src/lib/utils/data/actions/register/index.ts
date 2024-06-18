"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { USER_AUTH_FORM_SCHEMA } from "../login/schema";
import { getTranslatedSupabaseSignUpError } from "./supabase-sign-up-errors";

export async function signUpWithEmail(input: unknown) {
  const supabase = createClient();
  const validatedSignUpInput = USER_AUTH_FORM_SCHEMA.safeParse(input);

  if (!validatedSignUpInput.success) {
    const errors = formatZodErrorsToArray(validatedSignUpInput);
    console.error("Error validating sign up input", errors.flat());
    return {
      isError: true,
      error: errors,
    };
  }

  const { email, password } = validatedSignUpInput.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up with email", error);
    return {
      isError: true,
      error: getTranslatedSupabaseSignUpError(error.message),
    };
  }
}
