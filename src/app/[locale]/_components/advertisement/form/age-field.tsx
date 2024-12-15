import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Input } from "@/app/[locale]/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/_components/ui/select";
import { useConditionalTrigger } from "@/hooks/form";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useController, type UseFormReturn } from "react-hook-form";

type Props = {
  isOffering: boolean;
  form: UseFormReturn<AdvertisementUpsertFormValues>;
};

const VALUE_MAPPINGS = [
  { value: "1", min_age: 1, max_age: 19 },
  { value: "2", min_age: 20, max_age: 29 },
  { value: "3", min_age: 30, max_age: 39 },
  { value: "4", min_age: 40, max_age: 49 },
  { value: "5", min_age: 50, max_age: 59 },
  { value: "6", min_age: 60, max_age: 99 },
];

export default function AgeField({ isOffering, form }: Props) {
  const { control } = form;
  const t = useTranslations("translations.add_advertisement.form.age");

  const {
    field: { onChange: onAgeChange, value: minAgeValue },
  } = useController({ name: "min_age", control });

  const {
    field: { onChange: onMaxAgeChange, value: maxAgeValue },
  } = useController({ name: "max_age", control });

  const [selectValue, setSelectValue] = useState<string | null | undefined>();

  function onChange(value: string) {
    setSelectValue(value);
    const valueMapping = VALUE_MAPPINGS.find((item) => item.value === value);
    if (valueMapping) {
      onMaxAgeChange(valueMapping.max_age.toString());
      onAgeChange(valueMapping.min_age.toString());
    }
  }

  useEffect(() => {
    if (minAgeValue && maxAgeValue) {
      const valueMapping = VALUE_MAPPINGS.find(
        (item) =>
          item.min_age === parseInt(minAgeValue) &&
          item.max_age === parseInt(maxAgeValue)
      );
      if (valueMapping) {
        setSelectValue(valueMapping.value);
      }
    }
  }, [minAgeValue, maxAgeValue]);

  useConditionalTrigger({
    form,
    watchField: "max_age",
    triggerField: "min_age",
  });

  return (
    <>
      {isOffering && (
        <>
          <Label className="text-base">{t("offering.age_category")}</Label>
          {/* @ts-expect-error wrong typings */}
          <Select onValueChange={onChange} value={selectValue}>
            <FormControl>
              <SelectTrigger className="text-base h-12">
                <SelectValue placeholder={t("offering.age_category")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={"1"}>{t("offering.up_to")} 19</SelectItem>
              <SelectItem value={"2"}>20 - 29</SelectItem>
              <SelectItem value={"3"}>30 - 39</SelectItem>
              <SelectItem value={"4"}>40 - 49</SelectItem>
              <SelectItem value={"5"}>50 - 59</SelectItem>
              <SelectItem value={"6"}>{t("offering.over")} 60</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
      <div className="flex gap-2 w-full">
        <FormField
          control={control}
          name="min_age"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-base">
                {isOffering ? t("offering.min_age") : t("searching.min_age")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    isOffering ? t("offering.min_age") : t("searching.min_age")
                  }
                  className="w-full h-12 text-base hover:bg-accent"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectValue(null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isOffering && (
          <FormField
            control={control}
            name="max_age"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base">
                  {t("offering.max_age")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("offering.max_age")}
                    className="w-full h-12 text-base hover:bg-accent"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectValue(null);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </>
  );
}
