import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { type z } from "zod";

interface Props<T> {
  schema: z.Schema;
  defaultValues: DefaultValues<T>;
}

export const useControlledForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: Props<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return form;
};

export const usePersistedControlledForm = <T extends FieldValues>({
  schema,
  defaultValues,
  name,
  excludedFields,
}: Props<T> & { name: string; excludedFields?: (keyof T)[] }) => {
  const form = useControlledForm({
    schema,
    defaultValues,
  });

  useFormPersist(name, {
    watch: form.watch,
    setValue: form.setValue,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    exclude: excludedFields as string[],
  });

  return form;
};

interface ConditionalTriggerParams<T extends FieldValues> {
  form: UseFormReturn<T>;
  watchField: Path<T>;
  triggerField: Path<T>;
}

export const useConditionalTrigger = <T extends FieldValues>({
  form,
  watchField,
  triggerField,
}: ConditionalTriggerParams<T>) => {
  const watchedValue = form.watch(watchField);

  useEffect(() => {
    if (!form.formState.isSubmitted) return;
    if (watchedValue && form.getValues(triggerField)) {
      void form.trigger(triggerField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValue]);
};
