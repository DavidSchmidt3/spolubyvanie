import { useEffect, useState } from "react";
import {
  useWatch,
  type Control,
  type DefaultValues,
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from "react-hook-form";

interface FormPersistConfig<T extends FieldValues> {
  storage?: Storage;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  exclude?: (keyof T)[];
  onDataRestored?: (data: Partial<T>) => void;
  validate?: boolean;
  dirty?: boolean;
  touch?: boolean;
  skipPersist?: boolean;
}

interface UseFormPersistResult {
  clear(): void;
}

export default function useFormPersist<T extends FieldValues>(
  name: string,
  {
    storage,
    control,
    setValue,
    exclude = [] as (keyof T)[],
    onDataRestored,
    skipPersist = false,
    validate = false,
    dirty = false,
    touch = false,
  }: FormPersistConfig<T>
): UseFormPersistResult {
  const watchedValues = useWatch({
    control,
  });

  const getStorage = () => storage ?? window.sessionStorage;

  useEffect(() => {
    if (skipPersist) {
      return;
    }
    const str = getStorage().getItem(name);
    if (str) {
      const values = JSON.parse(str) as Partial<T>;
      const dataRestored: Partial<T> = {};

      (Object.keys(values) as Array<keyof T>).forEach((key) => {
        if (!exclude.includes(key as string)) {
          const typedKey = key as Path<T>;
          dataRestored[key] = values[key];
          if (!values[typedKey]) {
            return;
          }
          setValue(typedKey, values[typedKey] as PathValue<T, Path<T>>, {
            shouldValidate: validate,
            shouldDirty: dirty,
            shouldTouch: touch,
          });
        }
      });
      if (onDataRestored) {
        onDataRestored(dataRestored as DefaultValues<T>);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage, name, onDataRestored]);

  useEffect(() => {
    if (skipPersist) {
      return;
    }
    const values: Partial<T> = exclude.length
      ? (Object.entries(watchedValues)
          .filter(([key]) => !exclude.includes(key))
          .reduce(
            (obj, [key, val]) => Object.assign(obj, { [key]: val }),
            {}
          ) as Partial<T>)
      : Object.assign({}, watchedValues);

    if (Object.entries(values).length) {
      getStorage().setItem(name, JSON.stringify(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues]);

  return {
    clear: () => getStorage().removeItem(name),
  };
}

function getPersistedValues<T extends FieldValues>({
  name,
  defaultValues,
  exclude = [],
}: UsePersistedValuesProps<T>): DefaultValues<T> {
  try {
    const storage =
      typeof window !== "undefined" ? window.sessionStorage : undefined;

    if (!storage) {
      return defaultValues;
    }

    const str = storage.getItem(name);
    if (!str) return defaultValues;

    const persistedValues = JSON.parse(str) as Partial<DefaultValues<T>>;

    return Object.keys(defaultValues).reduce((acc, key) => {
      if (!exclude.includes(key) && persistedValues.hasOwnProperty(key)) {
        acc[key] = persistedValues[key];
      } else {
        acc[key] = defaultValues[key];
      }
      return acc;
    }, {} as DefaultValues<T>);
  } catch (error) {
    return defaultValues;
  }
}

type UsePersistedValuesProps<T extends FieldValues> = {
  name: string;
  defaultValues: DefaultValues<T>;
  exclude: (keyof DefaultValues<T>)[];
};

export function usePersistedValues<T extends FieldValues>({
  name,
  defaultValues,
  exclude = [],
}: UsePersistedValuesProps<T>): {
  formValues: DefaultValues<T>;
  isLoading: boolean;
  resetPersistedValues: () => void;
} {
  const [formValues, setFormValues] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(true);

  function resetPersistedValues() {
    const storage =
      typeof window !== "undefined" ? window.sessionStorage : undefined;

    if (storage) {
      storage.removeItem(name);
    }
    setFormValues(defaultValues);
  }

  useEffect(() => {
    const persistedValues = getPersistedValues({
      name,
      defaultValues,
      exclude,
    });
    setFormValues(persistedValues);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return {
    isLoading,
    formValues,
    resetPersistedValues,
  };
}
