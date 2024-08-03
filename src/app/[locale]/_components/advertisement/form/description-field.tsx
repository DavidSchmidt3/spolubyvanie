"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Textarea } from "@/app/[locale]/_components/ui/textarea";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<AdvertisementAddFormValues>;
};

export default function DescriptionField({ control }: Props) {
  const t = useTranslations("translations.add_advertisement.form");

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">{t("description.label")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("description.placeholder")}
              className="resize-none text-base min-h-52 hover:bg-accent/90"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
