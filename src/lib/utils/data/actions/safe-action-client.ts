import { type MessageKeys } from "global";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  message: MessageKeys<IntlMessages>;
  constructor(message: MessageKeys<IntlMessages>) {
    super(message);
    this.message = message;
  }
}

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return "alerts.global.error.description";
  },
});
