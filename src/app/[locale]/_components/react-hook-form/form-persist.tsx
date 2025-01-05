import useFormPersist from "@/hooks/form-persist";
import { useFormContext, type FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: string;
  exclude?: (keyof T)[];
  skipPersist?: boolean;
}

const isBrowser = () => typeof window !== "undefined";
function FormPersist<T extends FieldValues>({
  name,
  exclude,
  skipPersist,
}: Props<T>) {
  const form = useFormContext<T>();
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
