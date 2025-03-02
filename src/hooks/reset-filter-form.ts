import {
  ADVERTISEMENT_FILTER_DEFAULT_VALUES,
  type AdvertisementFilterFormValues,
} from "@/lib/data/advertisements/schema";
import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";

export const useResetFormAfterClearingAdvertisementType = (
  form: UseFormReturn<AdvertisementFilterFormValues>,
  advertisementType: string | undefined
) => {
  useEffect(() => {
    if (!advertisementType) {
      form.reset(ADVERTISEMENT_FILTER_DEFAULT_VALUES);
    }
  }, [advertisementType, form]);
};
