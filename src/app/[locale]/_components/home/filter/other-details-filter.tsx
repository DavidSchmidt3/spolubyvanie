"use client";

import { FormField, FormMessage } from "@/app/[locale]/_components/ui/form";
import { Input } from "@/app/[locale]/_components/ui/input";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export default function RoomDetailsFilter() {
  const { control } = useFormContext<AdvertisementFilterFormValues>();
  const t = useTranslations("translations.advertisement");

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8">
        <FormField
          control={control}
          name="max_apartment_rooms"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                {t("max_apartment_rooms.label")}
              </label>
              <Input
                type="number"
                min={1}
                pattern="[0-9]*"
                className="w-full h-12 text-base hover:bg-accent"
                placeholder={t("max_apartment_rooms.placeholder")}
                {...field}
              />
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={control}
          name="min_room_area"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                {t("min_room_area.label")}
              </label>
              <Input
                type="number"
                min={1}
                pattern="[0-9]*"
                className="w-full h-12 text-base hover:bg-accent"
                placeholder={t("min_room_area.placeholder")}
                {...field}
              />
              <FormMessage />
            </div>
          )}
        />
      </div>
    </div>
  );
}
