import { type FilterData } from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import PopoverCommon, {
  type CommonPopoverFieldProps,
} from "@/app/[locale]/_components/home/filter/popover-common";
import { Badge } from "@/app/[locale]/_components/ui/badge";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { ChevronDown } from "lucide-react";
import { useFormContext, type ControllerRenderProps } from "react-hook-form";

export default function PopoverMultiselectFilterField(
  props: CommonPopoverFieldProps
) {
  const { filterData, fieldName, selectRowText } = props;
  const form = useFormContext<
    AdvertisementUpsertFormValues | AdvertisementFilterFormValues
  >();

  function handleUnselect(row: FilterData) {
    const value = form.getValues(fieldName);
    const newValue = Array.isArray(value)
      ? value?.filter((id) => id !== row.id)
      : [];
    form.setValue(fieldName, newValue, { shouldValidate: true });
  }

  function handleAddValue(row: string) {
    const value = form.getValues(fieldName);
    if (typeof value === "object" && !Array.isArray(value)) return;
    const newValue = value ? [...value, row] : [row];
    form.setValue(fieldName, newValue, { shouldValidate: true });
  }

  return (
    <PopoverCommon
      {...props}
      handleSelect={handleAddValue}
      popoverTriggerContent={(field: ControllerRenderProps) => {
        return field.value?.length ? (
          <>
            <div className="flex flex-wrap items-center justify-start w-full gap-2 pr-3">
              {filterData
                .filter((row) => field.value?.includes(row.id))
                .map((row) => (
                  <Badge
                    key={row.id}
                    variant="default"
                    className="text-base py-0.5 font-normal"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(row);
                    }}
                  >
                    {row.name}
                    <Icons.cross className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2" />
                  </Badge>
                ))}
            </div>
            <ChevronDown className="z-10 w-4 h-4 opacity-50" />
          </>
        ) : (
          <div className="relative flex items-center justify-between w-full">
            <p className="text-base font-normal">{selectRowText}</p>
            <ChevronDown className="z-10 w-4 h-4 opacity-50" />
          </div>
        );
      }}
    />
  );
}
