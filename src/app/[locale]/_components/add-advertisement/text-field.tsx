"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Input } from "@/app/[locale]/_components/ui/input";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<AdvertisementAddFormValues>;
  label: string;
  placeholder: string;
  name:
    | "price"
    | "street"
    | "title"
    | "room_area"
    | "floor"
    | "max_floor"
    | "apartment_area";
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
              className="text-base h-12"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
