import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Input } from "@/app/[locale]/_components/ui/input";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<AdvertisementFilterFormValues>;
};

export default function PriceFilter({ control }: Props) {
  const t = useTranslations("translations.advertisement");
  return (
    <div className="flex flex-col gap-y-2 gap-x-4 sm:gap-x-8">
      <div className="flex flex-col gap-1">
        <h4>{t("price.min_label")}</h4>
        <FormField
          control={control}
          name="price_min"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("price.min_label")}
                  className="w-full h-12 text-base hover:bg-accent"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4>{t("price.max_label")}</h4>
        <FormField
          control={control}
          name="price_max"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("price.max_label")}
                  className="w-full h-12 text-base hover:bg-accent"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
