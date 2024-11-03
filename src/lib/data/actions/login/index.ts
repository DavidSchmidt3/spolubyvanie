"use server";

import {
  LOCALE_ACTION_SCHEMA,
  USER_AUTH_FORM_SCHEMA,
} from "@/lib/data/actions/login/schema";
import {
  getTranslatedSupabaseSignInError,
  supabaseSignInErrors,
} from "@/lib/data/actions/login/supabase-sign-in-errors";
import {
  ActionError,
  actionClient,
} from "@/lib/data/actions/safe-action-client";
import { type Locale } from "@/lib/utils/localization/i18n";
import { redirect as redirectLocal } from "@/lib/utils/localization/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const googleLogin = actionClient
  .schema(LOCALE_ACTION_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { locale } }) => {
    const supabase = await createClient();

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
      redirectLocal({
        href: "/error",
        locale,
      });
    }

    redirectLocal({
      href: {
        pathname: "/[page]",
        params: {
          page: "1",
        },
      },
      locale,
    });
  });

export async function logout(locale: Locale) {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirectLocal({
    locale,
    href: {
      pathname: "/[page]",
      params: {
        page: "1",
      },
    },
  });
}

export const signInWithEmail = actionClient
  .schema(USER_AUTH_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { email, password, locale } }) => {
    const supabase = await createClient();

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

    revalidatePath("/");
    redirectLocal({
      locale,
      href: {
        pathname: "/[page]",
        params: {
          page: "1",
        },
      },
    });
  });
