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
import { ChevronDown } from "lucide-react";
import { FixedSizeList } from "react-window";

type Props = {
  filterData: FilterData[];
  selectedRow?: string;
  setSelectedRow: (rowId?: string) => void;
  filterFunction: (row: FilterData) => boolean;
  placeholderText: string;
  emptyText: string;
  selectRowText: string;
  title: string;
};

export default function PopoverFilterField({
  filterData,
  selectedRow,
  setSelectedRow,
  filterFunction,
  placeholderText,
  emptyText,
  selectRowText,
  title,
}: Props) {
  const { searchResults, searchFilterData, open, setOpen } =
    useCombobox(filterData);

  const finalData = searchResults.filter((row) => {
    return filterFunction(row);
  });

  return (
    <div className="flex flex-col w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-col w-full gap-y-1 relative">
          <h4 className="text-sm">{title}</h4>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-label={selectRowText}
              aria-expanded={open}
              className="w-full h-11"
            >
              {filterData.find((row) => row.id === selectedRow) ? (
                <div className="flex items-center justify-start w-full">
                  <p className="text-wrap pr-4">
                    {filterData.find((row) => row.id === selectedRow)?.name}
                  </p>
                </div>
              ) : (
                <div className="flex justify-between relative w-full items-center">
                  <p>{selectRowText}</p>
                  <ChevronDown className="h-4 w-4 opacity-50 z-10" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <div className="z-20 items-center -ml-11 absolute right-0 bottom-0 mr-2 mb-1.5">
            {selectedRow && <SelectCancelButton onCancel={setSelectedRow} />}
          </div>
        </div>
        <PopoverContent
          className="py-0 px-2 sm:px-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]"
          align="start"
        >
          <Command shouldFilter={false} onChange={searchFilterData}>
            <CommandInput placeholder={placeholderText} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                <FixedSizeList
                  width={"100%"}
                  height={250}
                  itemCount={finalData.length}
                  itemSize={44}
                >
                  {({ index, style }) => (
                    <CommandItem
                      className="justify-center hover:cursor-pointer text-center"
                      key={finalData[index]?.id}
                      value={finalData[index]?.id}
                      onSelect={(currentValue) => {
                        setSelectedRow(currentValue);
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
    </div>
  );
}
