import { type MessageKeys } from "global";
import { type SafeParseError } from "zod";

export const formatZodErrorsToArray = <T>(
  validatedInput: SafeParseError<T>
) => {
  const fieldErrors = validatedInput.error.flatten().fieldErrors;
  const keys = Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>;
  const errors = keys.map((key) => fieldErrors[key]!);

  return errors as MessageKeys<IntlMessages>[][];
};
