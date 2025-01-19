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
import { useAdvertisementType } from "@/hooks/advertisement-type";
import {
  ADVERTISEMENT_FILTER_DEFAULT_VALUES,
  OFFERING_ROOM_ONLY_SORT_BY_VALUES,
  type AdvertisementFilterFormValues,
} from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function SortByField() {
  const t = useTranslations();
  const form = useFormContext<AdvertisementFilterFormValues>();

  const advertisementType = useWatch({
    name: "advertisement_type",
    control: form.control,
  });
  const isOffering = useAdvertisementType(advertisementType ?? "");

  useEffect(() => {
    if (!isOffering) {
      const value = form.getValues("sort_by");
      if (
        value &&
        OFFERING_ROOM_ONLY_SORT_BY_VALUES.includes(
          value as (typeof OFFERING_ROOM_ONLY_SORT_BY_VALUES)[number]
        )
      ) {
        form.setValue("sort_by", ADVERTISEMENT_FILTER_DEFAULT_VALUES.sort_by);
      }
    }
  }, [form, isOffering]);

  return (
    <FormField
      control={form.control}
      name="sort_by"
      render={({ field }) => (
        <FormItem className="relative w-full">
          <FormLabel className="text-base">
            {t("translations.advertisement.sort_by.select_label")}
          </FormLabel>
          <Select
            value={field.value}
            onValueChange={async (value) => {
              if (value) {
                field.onChange(value);
              }
            }}
          >
            <FormControl>
              <SelectTrigger
                alwaysShowChevron={true}
                className="justify-between w-full h-12 px-4 text-base text-center hover:bg-accent"
                aria-label={t("translations.advertisement.sort_by.select_text")}
              >
                <SelectValue
                  placeholder={t(
                    "translations.advertisement.sort_by.select_text"
                  )}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-base">
                  {t("translations.advertisement.sort_by.select_label")}
                </SelectLabel>
                <SelectItem
                  value="price"
                  className="text-base hover:cursor-pointer"
                >
                  {t("translations.advertisement.sort_by.price")}
                </SelectItem>
                <SelectItem
                  value="updated_at"
                  className="text-base hover:cursor-pointer"
                >
                  {t("translations.advertisement.sort_by.upserted_at")}
                </SelectItem>
                {isOffering && (
                  <>
                    <SelectItem
                      value="room_area"
                      className="text-base hover:cursor-pointer"
                    >
                      {t("translations.advertisement.sort_by.room_area")}
                    </SelectItem>
                    <SelectItem
                      value="apartment_rooms"
                      className="text-base hover:cursor-pointer"
                    >
                      {t("translations.advertisement.sort_by.apartment_rooms")}
                    </SelectItem>
                  </>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
