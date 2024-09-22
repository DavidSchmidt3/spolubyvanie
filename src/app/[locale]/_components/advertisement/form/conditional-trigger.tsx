import { useConditionalTrigger } from "@/hooks/form";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AdvertisementUpsertFormValues>;
};

export default function ConditionalTrigger({ form }: Props) {
  useConditionalTrigger({
    form,
    watchField: "max_floor",
    triggerField: "floor",
  });
  useConditionalTrigger({
    form,
    watchField: "apartment_area",
    triggerField: "room_area",
  });
  return null;
}
