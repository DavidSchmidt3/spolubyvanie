import { Checkbox } from "@/app/[locale]/_components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { useGroupedProperties } from "@/hooks/grouped-properties";
import { useLocale } from "@/hooks/locale";
import { type Property } from "@/lib/data/advertisements-properties";
import { type CheckPropertySchemaType } from "@/lib/data/advertisements-properties/types";
import { useTranslations } from "next-intl";
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  properties: Property[];
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  className?: string;
};

export default function PropertiesFormField<T extends FieldValues>({
  properties,
  form,
  fieldName,
  className = "",
}: Props<T>) {
  const t = useTranslations("translations.advertisement_list");
  const locale = useLocale();
  const groupedProperties = useGroupedProperties(properties);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={() => (
        <FormItem>
          <div className={className}>
            {groupedProperties.map(([key, value]) => {
              return (
                <div className="flex flex-col gap-y-2" key={key}>
                  <h4 className="text-lg font-bold">
                    {t(`properties.${key}`)}
                  </h4>
                  {value.map((item) => {
                    return (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => {
                          const value = field.value as Record<
                            string,
                            CheckPropertySchemaType
                          >;

                          const handleCheckboxChange = (checked: boolean) => {
                            const updatedValue = {
                              ...value,
                              [item.id]: {
                                ...item,
                                checked,
                              },
                            };

                            field.onChange(updatedValue);
                          };

                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={value[item.id]?.checked}
                                  onCheckedChange={handleCheckboxChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal hover:cursor-pointer">
                                {item[`${locale}_translation`]}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <FormMessage className="text-center mt-4 text-base" />
        </FormItem>
      )}
    />
  );
}
