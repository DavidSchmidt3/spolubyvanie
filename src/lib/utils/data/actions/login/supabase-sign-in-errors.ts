import { type MessageKeys } from "global";

export const supabaseSignInErrors = {
  invalidCredentials: "Invalid login credentials",
  emailNotConfirmed: "Email not confirmed",
  databaseError: "Database error querying schema",
};

export const getTranslatedSupabaseSignInError = (
  error: string
): MessageKeys<IntlMessages> => {
  switch (error) {
    case supabaseSignInErrors.invalidCredentials:
      return "alerts.login.error.invalid_credentials";
    case supabaseSignInErrors.emailNotConfirmed:
      return "alerts.login.error.email_not_confirmed";
    case supabaseSignInErrors.databaseError:
      return "alerts.login.error.database_error";
    default:
      return "alerts.login.error.database_error";
  }
};
