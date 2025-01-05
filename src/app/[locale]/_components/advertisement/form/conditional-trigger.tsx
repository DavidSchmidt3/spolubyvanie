import { useConditionalTrigger } from "@/hooks/form";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { useFormContext } from "react-hook-form";

export default function ConditionalTrigger() {
  const form = useFormContext<AdvertisementUpsertFormValues>();
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
