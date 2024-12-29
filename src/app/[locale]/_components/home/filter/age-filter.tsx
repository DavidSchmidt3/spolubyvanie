import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { Input } from "@/app/[locale]/_components/ui/input";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<AdvertisementFilterFormValues>;
  isOffering: boolean | null;
};

export default function AgeFilter({ control, isOffering }: Props) {
  const t = useTranslations("translations.advertisement");

  if (isOffering === null) {
    return null;
  }

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 w-full gap-x-8">
      <div
        className={cn("flex flex-col gap-1 w-full", isOffering && "col-span-2")}
      >
        <h4>{isOffering ? t("age.your.title") : t("age.min")}</h4>
        <FormField
          control={control}
          name="min_age"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={isOffering ? t("age.your.title") : t("age.min")}
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
        {isOffering && (
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5">
              <Icons.info className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              {t("age.your.info")}
            </p>
          </div>
        )}
      </div>
      {!isOffering && (
        <>
          <div className="flex flex-col gap-1 w-full">
            <h4>{t("age.max")}</h4>
            <FormField
              control={control}
              name="max_age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("age.max")}
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
          </div>{" "}
          <div className="flex gap-2 items-center col-span-2 mt-2">
            <div className="w-5 h-5">
              <Icons.info className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              {t("age.range.info")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
