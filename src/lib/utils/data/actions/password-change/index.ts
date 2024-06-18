"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { PASSWORD_CHANGE_SCHEMA } from "./schema";
import { getTranslatedSupabasePasswordChangeError } from "./supabase-password-change-errors";

export async function changePassword(input: unknown) {
  const supabase = createClient();
  const validatedChangePasswordInput = PASSWORD_CHANGE_SCHEMA.safeParse(input);

  if (!validatedChangePasswordInput.success) {
    const errors = formatZodErrorsToArray(validatedChangePasswordInput);
    console.error("Error validating reset password input", errors.flat());
    return {
      isError: true,
      error: errors,
    };
  }

  try {
    await supabase.auth.exchangeCodeForSession(
      validatedChangePasswordInput.data.accessToken
    );
  } catch (error) {
    console.error("Error exchanging access token", error);
    return {
      isError: true,
      error: "alerts.password_change.access_token.invalid" as const,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: validatedChangePasswordInput.data.password,
  });

  await supabase.auth.signOut();

  if (error) {
    console.error("Error resetting password with email", error);
    return {
      isError: true,
      error: getTranslatedSupabasePasswordChangeError(error.message),
    };
  }
}
