import { usePersistedValues } from "@/hooks/form-persist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  useForm,
  useWatch,
  type DefaultValues,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
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

interface PersistedProps<T extends FieldValues> {
  name: string;
  schema: z.Schema;
  exclude: (keyof DefaultValues<T>)[];
  defaultValues: DefaultValues<T>;
  skipPersist?: boolean;
}

export const usePersistedForm = <T extends FieldValues>({
  name,
  defaultValues,
  exclude,
  schema,
  skipPersist,
}: PersistedProps<T>) => {
  const { isLoading, formValues, resetPersistedValues } = usePersistedValues({
    name,
    defaultValues,
    exclude,
  });

  const form = useControlledForm<T>({
    schema,
    defaultValues: skipPersist ? defaultValues : formValues,
  });

  const persistConfig = useMemo(
    () => {
      return {
        name,
        exclude,
        form,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    isLoading,
    form,
    persistConfig,
    resetPersistedValues,
  };
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
  const watchedValue = useWatch({
    control: form.control,
    name: watchField,
  });

  useEffect(() => {
    if (!form.formState.isSubmitted) return;
    if (watchedValue && form.getValues(triggerField)) {
      void form.trigger(triggerField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValue]);
};
