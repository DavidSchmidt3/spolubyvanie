"use server";

import { pathnames, type Locale } from "@/lib/utils/localization/i18n";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { getProtocol } from "@/middleware";
import { ActionError, actionClient } from "../safe-action-client";
import { PASSWORD_RESET_SCHEMA } from "./schema";

export const resetPassword = actionClient
  .schema(PASSWORD_RESET_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: { email, locale } }) => {
    const supabase = createClient();

    const redirectUrl = getPasswordChangeRedirectUrl(locale);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      console.error("Error resetting password with email", error);
      throw new ActionError("alerts.password_reset.error.database_error");
    }
  });

const getPasswordChangeRedirectUrl = (locale: Locale) => {
  const redirectUrl = pathnames["/password-change"];
  return `${getProtocol()}://${process.env.VERCEL_URL}/${locale}${
    redirectUrl[locale]
  }`;
};
