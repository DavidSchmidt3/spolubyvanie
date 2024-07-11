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
import { useCombobox } from "@/hooks/combobox";
import { type AdvertisementFilterFormValues } from "@/lib/data/actions/advertisements/schema";
import { ChevronDown } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";
import { FixedSizeList } from "react-window";
import { Badge } from "../../ui/badge";
import { FormField, FormItem, FormMessage } from "../../ui/form";
import { Icons } from "../../ui/icons";
import { type FilterData } from "./administrative-division-filter";

type Props = {
  filterData: FilterData[];
  filterFunction: (row: FilterData) => boolean;
  placeholderText: string;
  emptyText: string;
  selectRowText: string;
  title: string;
  fieldName: "districts" | "municipalities";
  form: UseFormReturn<AdvertisementFilterFormValues>;
};

export default function PopoverMultiselectFilterField({
  filterData,
  filterFunction,
  placeholderText,
  emptyText,
  selectRowText,
  title,
  form,
  fieldName,
}: Props) {
  const { searchResults, searchFilterData, open, setOpen } =
    useCombobox(filterData);

  const finalData = searchResults.filter((row) => {
    return filterFunction(row);
  });

  function handleUnselect(row: FilterData) {
    const value = form.getValues(fieldName);
    const newValue = Array.isArray(value)
      ? value?.filter((id) => id !== row.id)
      : [];
    form.setValue(fieldName, newValue);
  }

  function handleAddValue(row: string) {
    const value = form.getValues(fieldName);
    const newValue = value ? [...value, row] : [row];
    form.setValue(fieldName, newValue);
  }

  return (
    <div className="flex flex-col w-full">
      <FormField
        control={form.control}
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
                    {field.value?.length ? (
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
                    )}
                  </Button>
                </PopoverTrigger>
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
                              handleAddValue(value);
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
