import { type MessageKeys } from "global";
import { flattenValidationErrors } from "next-safe-action";

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
