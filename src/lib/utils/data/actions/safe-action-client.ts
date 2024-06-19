import { type MessageKeys } from "global";
import { createSafeActionClient } from "next-safe-action";
import { getUser } from "../user";

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

export const authActionClient = actionClient.use(async ({ next }) => {
  const user = await getUser();

  if (!user) {
    throw new ActionError("alerts.user.error.unauthenticated");
  }

  return next({ ctx: { userId: user.id } });
});
