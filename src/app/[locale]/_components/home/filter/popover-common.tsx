import { type FilterData } from "@/app/[locale]/_components/home/filter/administrative-division-filter";
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
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/[locale]/_components/ui/popover";
import { useCombobox } from "@/hooks/combobox";
import { type AdvertisementAddFormValues } from "@/lib/data/actions/add-advertisement/schema";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import {
  type Control,
  type ControllerRenderProps,
  type UseFormReturn,
} from "react-hook-form";
import { FixedSizeList } from "react-window";

export type CommonPopoverFieldProps = {
  filterData: FilterData[];
  filterFunction: (row: FilterData) => boolean;
  placeholderText: string;
  emptyText: string;
  selectRowText: string;
  title: string;
  fieldName: keyof AdvertisementFilterFormValues;
  form:
    | UseFormReturn<AdvertisementFilterFormValues>
    | UseFormReturn<AdvertisementAddFormValues>;
};

type Props = CommonPopoverFieldProps & {
  handleSelect: (value: string) => void;
  popoverTriggerContent: (field: ControllerRenderProps) => React.ReactNode;
  popoverAfterTriggerContent?: (
    field: ControllerRenderProps
  ) => React.ReactNode;
};

export default function PopoverCommonField({
  filterData,
  filterFunction,
  placeholderText,
  emptyText,
  selectRowText,
  title,
  form,
  fieldName,
  handleSelect,
  popoverTriggerContent,
  popoverAfterTriggerContent,
}: Props) {
  const { searchResults, searchFilterData, open, setOpen } =
    useCombobox(filterData);

  const finalData = searchResults.filter((row) => {
    return filterFunction(row);
  });

  const control = form.control as Control<
    AdvertisementAddFormValues | AdvertisementFilterFormValues
  >;

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
                    className="w-full min-h-12 h-auto"
                  >
                    {popoverTriggerContent(field)}
                  </Button>
                </PopoverTrigger>
                {popoverAfterTriggerContent
                  ? popoverAfterTriggerContent(field)
                  : null}
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
                            onSelect={(value) => {
                              handleSelect(value);
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
