import PopoverCommon, {
  type CommonPopoverFieldProps,
} from "@/app/[locale]/_components/home/filter/popover-common";
import SelectCancelButton from "@/app/[locale]/_components/ui/select-cancel-button";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { ChevronDown } from "lucide-react";
import {
  type ControllerRenderProps,
  type UseFormSetValue,
} from "react-hook-form";

export default function PopoverFilterField(props: CommonPopoverFieldProps) {
  const { form, filterData, fieldName, selectRowText } = props;
  const setValue = form.setValue as UseFormSetValue<
    AdvertisementAddFormValues | AdvertisementFilterFormValues
  >;

  return (
    <PopoverCommon
      {...props}
      handleSelect={(value: string) => {
        setValue(fieldName, value);
      }}
      popoverTriggerContent={(field: ControllerRenderProps) => {
        return filterData.find((row) => row.id === field.value) ? (
          <div className="flex items-center justify-start w-full">
            <p className="text-wrap pr-4 text-base">
              {filterData.find((row) => row.id === field.value)?.name}
            </p>
          </div>
        ) : (
          <div className="flex justify-between relative w-full items-center">
            <p className="text-base">{selectRowText}</p>
            <ChevronDown className="h-4 w-4 opacity-50 z-10" />
          </div>
        );
      }}
      popoverAfterTriggerContent={(field: ControllerRenderProps) => {
        return (
          <div className="z-20 items-center -ml-11 absolute right-0 bottom-0 mr-2 mb-2">
            {field.value && (
              <SelectCancelButton onCancel={() => setValue(fieldName, "")} />
            )}
          </div>
        );
      }}
    />
  );
}
