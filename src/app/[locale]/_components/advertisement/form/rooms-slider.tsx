"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Slider } from "@/app/[locale]/_components/ui/slider";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
};

export default function RoomsSlider({ label }: Props) {
  const { control } = useFormContext<AdvertisementUpsertFormValues>();

  return (
    <FormField
      control={control}
      name="apartment_rooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[field.value]}
              onValueChange={(value) => field.onChange(value[0])}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
