"use server";

import { USER_AUTH_FORM_SCHEMA } from "@/lib/data/actions/login/schema";
import { getTranslatedSupabaseSignUpError } from "@/lib/data/actions/register/supabase-sign-up-errors";
import {
  ActionError,
  actionClient,
} from "@/lib/data/actions/safe-action-client";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";

export const signUpWithEmail = actionClient
  .schema(USER_AUTH_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up with email", error);
      throw new ActionError(getTranslatedSupabaseSignUpError(error.message));
    }
  });
