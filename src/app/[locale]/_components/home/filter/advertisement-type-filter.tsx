import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { adTypeKeys, type AdType } from "@/lib/data/advertisements/types";
import { type MessageKeys } from "global";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type Props = {
  clearable?: boolean;
  disabled?: boolean;
};

export function AdvertisementTypeFilter({
  clearable = true,
  disabled = false,
}: Props) {
  const t = useTranslations();
  const form = useFormContext<
    AdvertisementFilterFormValues | AdvertisementUpsertFormValues
  >();

  return (
    <div className="relative flex flex-col justify-center w-full gap-1">
      <FormField
        control={form.control}
        name="advertisement_type"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="text-base">
              {t("translations.advertisement.types.select_label")}
            </FormLabel>
            <Select
              value={field.value}
              disabled={disabled}
              onValueChange={async (value) => {
                if (value) {
                  field.onChange(value);
                  await form.trigger("advertisement_type");
                }
              }}
            >
              <FormControl>
                <SelectTrigger
                  alwaysShowChevron={!clearable}
                  value={field.value}
                  className="justify-between w-full h-12 px-4 text-base text-center hover:bg-accent"
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
                        className="text-base hover:cursor-pointer"
                      >
                        {t(value)}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="absolute right-0 z-20 flex items-center mr-2 top-8 -ml-11">
              {field.value && clearable && (
                <SelectCancelButton
                  onCancel={() => {
                    form.setValue("advertisement_type", "", {
                      shouldValidate: true,
                    });
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
