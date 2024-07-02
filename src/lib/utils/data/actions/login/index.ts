"use server";

import { USER_AUTH_FORM_SCHEMA } from "@/lib/utils/data/actions/login/schema";
import {
  getTranslatedSupabaseSignInError,
  supabaseSignInErrors,
} from "@/lib/utils/data/actions/login/supabase-sign-in-errors";
import {
  ActionError,
  actionClient,
} from "@/lib/utils/data/actions/safe-action-client";
import { redirect as redirectLocal } from "@/lib/utils/localization/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { redirect } from "next/navigation";

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

  redirectLocal("/");
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirectLocal("/");
}

export const signInWithEmail = actionClient
  .schema(USER_AUTH_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // don't care about email not confirmed and invalid credentials errors
      if (
        error.message !== supabaseSignInErrors.emailNotConfirmed &&
        error.message !== supabaseSignInErrors.invalidCredentials
      ) {
        console.error("Error signing in with email", error);
      }
      throw new ActionError(getTranslatedSupabaseSignInError(error.message));
    }

    // revalidatePath("/", "layout");
    redirectLocal("/");
  });
