import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/[locale]/_components/ui/radio-group";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export default function SortOrderField() {
  const t = useTranslations();
  const form = useFormContext<AdvertisementFilterFormValues>();

  return (
    <FormField
      control={form.control}
      name="sort_order"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg w-full sm:w-min h-16 sm:h-auto border px-4 space-y-0">
          <FormLabel className="text-base w-24">
            {t("translations.advertisement.sort_order.label")}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col items-start gap-y-2"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="asc" />
                </FormControl>
                <FormLabel className="font-normal flex gap-x-2 hover:cursor-pointer">
                  {t("translations.advertisement.sort_order.asc")}
                  <Icons.arrowUp />
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="desc" />
                </FormControl>
                <FormLabel className="font-normal flex gap-x-2 hover:cursor-pointer">
                  {t("translations.advertisement.sort_order.desc")}
                  <Icons.arrowDown />
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
