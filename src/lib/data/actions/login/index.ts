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
import { permanentRedirect as redirectLocal } from "@/lib/utils/localization/navigation";
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
      return redirectLocal({
        href: "/error",
        locale,
      });
    }

    return redirectLocal({
      href: {
        pathname: "/[page]",
        params: {
          page: "1",
        },
      },
      locale,
    });
  });

export const logout = actionClient
  .schema(LOCALE_ACTION_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { locale } }) => {
    try {
      const supabase = await createClient();

      await supabase.auth.signOut();

      return redirectLocal({
        locale,
        href: {
          pathname: "/[page]",
          params: {
            page: "1",
          },
        },
      });
    } catch (error) {
      console.error("Error logging out", error);
    }
  });

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
    return redirectLocal({
      locale,
      href: {
        pathname: "/[page]",
        params: {
          page: "1",
        },
      },
    });
  });
