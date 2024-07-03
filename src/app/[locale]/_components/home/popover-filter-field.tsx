import { type FilterData } from "@/app/[locale]/_components/home/administrative-division-filter";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/[locale]/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/[locale]/_components/ui/popover";
import SelectCancelButton from "@/app/[locale]/_components/ui/select-cancel-button";
import { useCombobox } from "@/hooks/combobox";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { ChevronDown } from "lucide-react";
import { type Control, type UseFormSetValue } from "react-hook-form";
import { FixedSizeList } from "react-window";
import { FormField, FormItem, FormMessage } from "../ui/form";

type Props = {
  filterData: FilterData[];
  filterFunction: (row: FilterData) => boolean;
  placeholderText: string;
  emptyText: string;
  selectRowText: string;
  title: string;
  control: Control<AdvertisementFilterFormValues>;
  fieldName: keyof AdvertisementFilterFormValues;
  setValue: UseFormSetValue<AdvertisementFilterFormValues>;
};

export default function PopoverFilterField({
  filterData,
  filterFunction,
  placeholderText,
  emptyText,
  selectRowText,
  title,
  control,
  fieldName,
  setValue,
}: Props) {
  const { searchResults, searchFilterData, open, setOpen } =
    useCombobox(filterData);

  const finalData = searchResults.filter((row) => {
    return filterFunction(row);
  });

  return (
    <div className="flex flex-col w-full">
      <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <Popover open={open} onOpenChange={setOpen} modal={true}>
              <div className="flex flex-col w-full gap-y-1 relative">
                <h4 className="text-base">{title}</h4>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-label={selectRowText}
                    aria-expanded={open}
                    className="w-full h-11"
                  >
                    {filterData.find((row) => row.id === field.value) ? (
                      <div className="flex items-center justify-start w-full">
                        <p className="text-wrap pr-4 text-base">
                          {
                            filterData.find((row) => row.id === field.value)
                              ?.name
                          }
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-between relative w-full items-center">
                        <p className="text-base">{selectRowText}</p>
                        <ChevronDown className="h-4 w-4 opacity-50 z-10" />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <div className="z-20 items-center -ml-11 absolute right-0 bottom-0 mr-2 mb-1.5">
                  {field.value && (
                    <SelectCancelButton
                      onCancel={() => setValue(fieldName, "")}
                    />
                  )}
                </div>
              </div>
              <PopoverContent
                className="py-0 px-2 sm:px-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]"
                align="start"
              >
                <Command shouldFilter={false} onChange={searchFilterData}>
                  <CommandInput
                    placeholder={placeholderText}
                    className="text-base"
                  />
                  <CommandList>
                    <CommandEmpty className="text-base">
                      {emptyText}
                    </CommandEmpty>
                    <CommandGroup>
                      <FixedSizeList
                        width={"100%"}
                        height={250}
                        itemCount={finalData.length}
                        itemSize={36}
                      >
                        {({ index, style }) => (
                          <CommandItem
                            className="justify-start hover:cursor-pointer px-8 text-base"
                            key={finalData[index]?.id}
                            value={finalData[index]?.id}
                            onSelect={(currentValue) => {
                              setValue(fieldName, currentValue);
                              setOpen(false);
                            }}
                            style={{
                              ...style,
                            }}
                          >
                            {finalData[index]?.name}
                          </CommandItem>
                        )}
                      </FixedSizeList>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
