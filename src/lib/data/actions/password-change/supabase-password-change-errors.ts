import { type MessageKeys } from "global";

const supabasePasswordChangeErrors = {
  sameAsOldPassword: "New password should be different from the old password.",
};

export const getTranslatedSupabasePasswordChangeError = (
  error: string
): MessageKeys<IntlMessages> => {
  switch (error) {
    case supabasePasswordChangeErrors.sameAsOldPassword:
      return "alerts.password_change.error.password_same_as_old";
    default:
      return "alerts.password_change.error.database_error";
  }
};
