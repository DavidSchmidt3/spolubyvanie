import { type MessageKeys } from "global";

const supabaseSignUpErrors = {
  userAlreadyRegistered: "User already registered",
};

export const getTranslatedSupabaseSignUpError = (
  error: string
): MessageKeys<IntlMessages> => {
  switch (error) {
    case supabaseSignUpErrors.userAlreadyRegistered:
      return "alerts.register.error.user_already_registered";
    default:
      return "alerts.register.error.database_error";
  }
};
