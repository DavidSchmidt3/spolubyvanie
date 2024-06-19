"use server";

import {
  ActionError,
  actionClient,
} from "@/lib/utils/data/actions/safe-action-client";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { PASSWORD_CHANGE_SCHEMA } from "./schema";
import { getTranslatedSupabasePasswordChangeError } from "./supabase-password-change-errors";

export const changePassword = actionClient
  .schema(PASSWORD_CHANGE_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { password, accessToken } }) => {
    const supabase = createClient();

    try {
      await supabase.auth.exchangeCodeForSession(accessToken);
    } catch (error) {
      throw new ActionError("alerts.password_change.access_token.invalid");
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    // never trust session data after one use, we want user to sign with the new password anyway
    await supabase.auth.signOut();

    if (error) {
      console.error("Error resetting password with email", error);
      throw new ActionError(
        getTranslatedSupabasePasswordChangeError(error.message)
      );
    }
  });
