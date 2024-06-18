"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { RESET_PASSWORD_SCHEMA } from "./schema";

export async function resetPassword(input: unknown) {
  const supabase = createClient();
  const validatedSettingsInput = RESET_PASSWORD_SCHEMA.safeParse(input);

  if (!validatedSettingsInput.success) {
    const errors = formatZodErrorsToArray(validatedSettingsInput);
    console.error("Error validating reset password input", errors.flat());
    return {
      isError: true,
      error: errors,
    };
  }

  const { error, data } = await supabase.auth.resetPasswordForEmail(
    validatedSettingsInput.data.email
  );

  console.log(error, data);

  if (error) {
    console.error("Error resetting password with email", error);
    return {
      isError: true,
      error: "alerts.reset_password.error.database_error" as const,
    };
  }
}
