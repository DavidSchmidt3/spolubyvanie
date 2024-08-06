import PopoverCommon, {
  type CommonPopoverFieldProps,
} from "@/app/[locale]/_components/home/filter/popover-common";
import SelectCancelButton from "@/app/[locale]/_components/ui/select-cancel-button";
import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { ChevronDown } from "lucide-react";
import {
  type ControllerRenderProps,
  type UseFormSetValue,
} from "react-hook-form";

export default function PopoverFilterField(props: CommonPopoverFieldProps) {
  const { form, filterData, fieldName, selectRowText } = props;
  const setValue = form.setValue as UseFormSetValue<
    AdvertisementUpsertFormValues | AdvertisementFilterFormValues
  >;

  return (
    <PopoverCommon
      {...props}
      handleSelect={(value: string) => {
        setValue(fieldName, value, { shouldValidate: true });
      }}
      popoverTriggerContent={(field: ControllerRenderProps) => {
        return filterData.find((row) => row.id === field.value) ? (
          <div className="flex items-center justify-start w-full">
            <p className="pr-4 text-base font-normal text-wrap">
              {filterData.find((row) => row.id === field.value)?.name}
            </p>
          </div>
        ) : (
          <div className="relative flex items-center justify-between w-full">
            <p className="text-base font-normal">{selectRowText}</p>
            <ChevronDown className="z-10 w-4 h-4 opacity-50" />
          </div>
        );
      }}
      popoverAfterTriggerContent={(field: ControllerRenderProps) => {
        return (
          <div className="absolute bottom-0 right-0 z-20 items-center mb-2 mr-2 -ml-11">
            {field.value && (
              <SelectCancelButton
                onCancel={() =>
                  setValue(fieldName, "", { shouldValidate: true })
                }
              />
            )}
          </div>
        );
      }}
    />
  );
}
