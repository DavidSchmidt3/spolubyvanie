import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/[locale]/_components/ui/radio-group";
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
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export default function SortByField({ form }: Props) {
  const t = useTranslations();

  const advertisementType = useWatch({
    name: "advertisement_type",
    control: form.control,
  });
  const isOffering = useAdvertisementType(advertisementType ?? "");

  useEffect(() => {
    if (!isOffering) {
      form.setValue("sort_by", "price");
    }
  }, [form, isOffering]);

  return (
    <div className="relative flex flex-col sm:flex-row w-full gap-4 justify-between ">
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
                  value={field.value}
                  className="justify-between w-full h-12 px-4 text-base text-center hover:bg-accent"
                  aria-label={t(
                    "translations.advertisement.sort_by.select_text"
                  )}
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
                    value="created_at"
                    className="text-base hover:cursor-pointer"
                  >
                    {t("translations.advertisement.sort_by.created_at")}
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
                        {t(
                          "translations.advertisement.sort_by.apartment_rooms"
                        )}
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
      <FormField
        control={form.control}
        name="sort_order"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg w-full sm:w-min h-12 sm:h-auto border px-4 space-y-0">
            <FormLabel className="text-base w-24">
              {t("translations.advertisement.sort_order.label")}
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row sm:flex-col items-start gap-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="asc" />
                  </FormControl>
                  <FormLabel className="font-normal flex gap-x-2">
                    {t("translations.advertisement.sort_order.asc")}
                    <Icons.arrowUp />
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="desc" />
                  </FormControl>
                  <FormLabel className="font-normal flex gap-x-2">
                    {t("translations.advertisement.sort_order.desc")}
                    <Icons.arrowDown />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
