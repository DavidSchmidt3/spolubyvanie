"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Input } from "@/app/[locale]/_components/ui/input";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<AdvertisementUpsertFormValues>;
  label: string;
  placeholder: string;
  name: keyof {
    [K in keyof AdvertisementUpsertFormValues as AdvertisementUpsertFormValues[K] extends string
      ? K
      : never]: AdvertisementUpsertFormValues[K];
  };
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function TextField({
  control,
  label,
  placeholder,
  name,
  inputProps,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              placeholder={placeholder}
              {...field}
              className="text-base h-12 hover:bg-accent/90"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
