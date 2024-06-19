import { type MessageKeys } from "global";
import { flattenValidationErrors } from "next-safe-action";
import { type SafeParseError } from "zod";

export const formatZodErrorsToArray = <T>(
  validatedInput: SafeParseError<T>
) => {
  const fieldErrors = validatedInput.error.flatten().fieldErrors;
  const keys = Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>;
  const errors = keys.map((key) => fieldErrors[key]!);

  return errors as MessageKeys<IntlMessages>[][];
};

type FormErrorsRaw = {
  _errors?: string[] | undefined;
} & Record<
  string,
  | {
      _errors?: string[] | undefined;
    }
  | undefined
>;

export const formatZodErrors = (formErrorsRaw: FormErrorsRaw) => {
  const formErrors = flattenValidationErrors(formErrorsRaw).fieldErrors;
  const keys = Object.keys(formErrors);
  const errors = keys.map((key) => formErrors[key]!);

  return errors as unknown as MessageKeys<IntlMessages>[];
};
