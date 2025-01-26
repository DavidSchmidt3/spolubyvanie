"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Input } from "@/app/[locale]/_components/ui/input";
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
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </div>
              <Input
                type="number"
                min={1}
                max={5}
                className="w-14"
                value={field.value}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 5) {
                    field.onChange(value);
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
