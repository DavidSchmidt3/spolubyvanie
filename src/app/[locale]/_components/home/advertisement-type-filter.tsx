import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/_components/ui/select";
import SelectCancelButton from "@/app/[locale]/_components/ui/select-cancel-button";
import { type AdvertisementFilterFormValues } from "@/lib/utils/data/advertisements/schema";
import { adTypeKeys, type AdType } from "@/lib/utils/data/advertisements/types";
import { type MessageKeys } from "global";
import { useTranslations } from "next-intl";
import { type Control, type UseFormSetValue } from "react-hook-form";

type Props = {
  control: Control<AdvertisementFilterFormValues>;
  setValue: UseFormSetValue<AdvertisementFilterFormValues>;
};

export function AdvertisementTypeFilter({ control, setValue }: Props) {
  const t = useTranslations();

  return (
    <div className="relative flex flex-col justify-center w-full gap-1">
      <h4>{t("translations.advertisement.types.select_label")}</h4>
      <FormField
        control={control}
        name="advertisement_type"
        render={({ field }) => (
          <FormItem className="relative">
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <FormControl>
                <SelectTrigger
                  value={field.value}
                  className="justify-between w-full text-base px-4 text-center h-11 hover:bg-accent"
                  aria-label={t("translations.advertisement.types.select_text")}
                >
                  {field.value ? (
                    <SelectValue
                      placeholder={t(
                        "translations.advertisement.types.select_text"
                      )}
                    />
                  ) : (
                    t("translations.advertisement.types.select_text")
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-base">
                    {t("translations.advertisement.types.select_label")}
                  </SelectLabel>
                  {Object.keys(adTypeKeys).map((key) => {
                    const adTypeKey = parseInt(key) as AdType;
                    const value =
                      `translations.advertisement.types.${adTypeKeys[adTypeKey]}` as MessageKeys<IntlMessages>;
                    return (
                      <SelectItem
                        key={key}
                        value={key}
                        className="hover:cursor-pointer text-base"
                      >
                        {t(value)}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="absolute -top-0.5 right-0 z-20 flex items-center mr-2 -ml-11">
              {field.value && (
                <SelectCancelButton
                  onCancel={() => {
                    setValue("advertisement_type", "");
                  }}
                />
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
