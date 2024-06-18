"use server";

import { pathnames, type Language } from "@/lib/utils/localization/i18n";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { PASSWORD_RESET_SCHEMA } from "./schema";

export async function resetPassword(input: unknown) {
  const supabase = createClient();
  const validatedResetPasswordInput = PASSWORD_RESET_SCHEMA.safeParse(input);

  if (!validatedResetPasswordInput.success) {
    const errors = formatZodErrorsToArray(validatedResetPasswordInput);
    console.error("Error validating reset password input", errors.flat());
    return {
      isError: true,
      error: errors,
    };
  }

  const { email, language } = validatedResetPasswordInput.data;
  const redirectUrl = getPasswordChangeRedirectUrl(language);
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  if (error) {
    console.error("Error resetting password with email", error);
    return {
      isError: true,
      error: "alerts.password_reset.error.database_error" as const,
    };
  }
}

const getPasswordChangeRedirectUrl = (language: Language) => {
  const redirectUrl = pathnames["/password-change"];
  return `${process.env.BASE_URL}/${language}${redirectUrl[language]}`;
};
