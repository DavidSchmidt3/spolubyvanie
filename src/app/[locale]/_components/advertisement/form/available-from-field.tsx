import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/app/[locale]/_components/ui/button";
import { Calendar } from "@/app/[locale]/_components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/[locale]/_components/ui/popover";
import { useLocale } from "@/hooks/locale";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { cn } from "@/lib/utils";
import { getLocaleDateFormat } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  isOffering: boolean | null;
};

export default function AvailableFromField({ isOffering }: Props) {
  const { control } = useFormContext<AdvertisementUpsertFormValues>();
  const [open, setOpen] = useState(false);
  const t = useTranslations("translations.add_advertisement.form");
  const locale = useLocale();

  return (
    <FormField
      control={control}
      name="available_from"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-base">
            {isOffering ? t("available_from.label") : t("searching_from.label")}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    " pl-3 text-left font-normal text-base h-12",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, getLocaleDateFormat(locale))
                  ) : (
                    <span>{t("available_from.pick_a_date")}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) {
                    field.onChange(date);
                  }
                  setOpen(false);
                }}
                disabled={(date) =>
                  date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
