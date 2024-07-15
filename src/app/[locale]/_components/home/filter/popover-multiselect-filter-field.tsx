import { type FilterData } from "@/app/[locale]/_components/home/filter/administrative-division-filter";
import PopoverCommon, {
  type CommonPopoverFieldProps,
} from "@/app/[locale]/_components/home/filter/popover-common";
import { Badge } from "@/app/[locale]/_components/ui/badge";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { ChevronDown } from "lucide-react";
import {
  type ControllerRenderProps,
  type UseFormGetValues,
  type UseFormSetValue,
} from "react-hook-form";

export default function PopoverMultiselectFilterField(
  props: CommonPopoverFieldProps
) {
  const { form, filterData, fieldName, selectRowText } = props;
  const setValue = form.setValue as UseFormSetValue<
    AdvertisementAddFormValues | AdvertisementFilterFormValues
  >;
  const getValues = form.getValues as UseFormGetValues<
    AdvertisementAddFormValues | AdvertisementFilterFormValues
  >;

  function handleUnselect(row: FilterData) {
    const value = getValues(fieldName);
    const newValue = Array.isArray(value)
      ? value?.filter((id) => id !== row.id)
      : [];
    setValue(fieldName, newValue);
  }

  function handleAddValue(row: string) {
    const value = getValues(fieldName);
    const newValue = value ? [...value, row] : [row];
    setValue(fieldName, newValue);
  }

  return (
    <PopoverCommon
      {...props}
      handleSelect={handleAddValue}
      popoverTriggerContent={(field: ControllerRenderProps) => {
        return field.value?.length ? (
          <>
            <div className="flex items-center flex-wrap justify-start w-full gap-2 pr-3">
              {filterData
                .filter((row) => field.value?.includes(row.id))
                .map((row) => (
                  <Badge
                    key={row.id}
                    variant="default"
                    className="text-base py-0.5"
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
            <ChevronDown className="h-4 w-4 opacity-50 z-10" />
          </>
        ) : (
          <div className="flex justify-between relative w-full items-center">
            <p className="text-base">{selectRowText}</p>
            <ChevronDown className="h-4 w-4 opacity-50 z-10" />
          </div>
        );
      }}
    />
  );
}
