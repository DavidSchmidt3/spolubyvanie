"use server";

import { PASSWORD_CHANGE_SCHEMA } from "@/lib/data/actions/password-change/schema";
import { getTranslatedSupabasePasswordChangeError } from "@/lib/data/actions/password-change/supabase-password-change-errors";
import {
  ActionError,
  actionClient,
} from "@/lib/data/actions/safe-action-client";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";

export const changePassword = actionClient
  .schema(PASSWORD_CHANGE_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { password, accessToken } }) => {
    const supabase = await createClient();

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
