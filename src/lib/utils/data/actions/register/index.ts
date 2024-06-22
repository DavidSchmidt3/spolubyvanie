"use server";

import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { USER_AUTH_FORM_SCHEMA } from "../login/schema";
import { ActionError, actionClient } from "../safe-action-client";
import { getTranslatedSupabaseSignUpError } from "./supabase-sign-up-errors";

export const signUpWithEmail = actionClient
  .schema(USER_AUTH_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up with email", error);
      throw new ActionError(getTranslatedSupabaseSignUpError(error.message));
    }
  });
