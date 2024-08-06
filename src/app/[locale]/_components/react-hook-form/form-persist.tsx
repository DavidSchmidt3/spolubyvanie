import useFormPersist from "@/hooks/form-persist";
import { type FieldValues, type UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: string;
  exclude?: (keyof T)[];
  skipPersist?: boolean;
}

const isBrowser = () => typeof window !== "undefined";
function FormPersist<T extends FieldValues>({
  form,
  name,
  exclude,
  skipPersist,
}: Props<T>) {
  useFormPersist(name, {
    control: form.control,
    setValue: form.setValue,
    storage: isBrowser() ? window.sessionStorage : undefined,
    exclude,
    skipPersist,
  });

  return null;
}

export default FormPersist;
