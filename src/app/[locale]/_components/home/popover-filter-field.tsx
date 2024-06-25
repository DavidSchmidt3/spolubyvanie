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
import pkg, { type IndexOptionsForDocumentSearch } from "flexsearch";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { TRANSITION_DURATION } from "tailwind.config";
import { Icons } from "../ui/icons";
import { type FilterData } from "./administrative-division-filter";
const { Document } = pkg;

const documentIndexParams = {
  document: {
    id: "id",
    index: [
      {
        field: "name",
        tokenize: "forward",
        resolution: 9,
      },
    ],
    store: true,
  },
} satisfies IndexOptionsForDocumentSearch<unknown, boolean>;

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
  const [open, setOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(
    new Document(documentIndexParams)
  );
  const [searchResults, setSearchResults] = useState(filterData);

  function searchFilterData(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      setSearchResults(filterData);
      return;
    }
    const [nameFieldResult] = searchIndex.search(event.target.value, {
      enrich: true,
      index: "name",
    });
    const formattedResults = nameFieldResult?.result.map((result) => {
      // @ts-ignore wrong type
      const doc = result.doc;
      return doc as unknown as FilterData;
    });
    setSearchResults(formattedResults ?? []);
  }

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchResults(filterData);
      }, TRANSITION_DURATION);
    }
  }, [open, filterData]);

  useEffect(() => {
    setSearchResults(filterData);
    const newSearchIndex = new Document(documentIndexParams);
    filterData.forEach((row) => {
      newSearchIndex.add({
        id: row.id,
        name: row.name,
        region_id: row.region_id,
        district_id: row.district_id,
      });
    });
    setSearchIndex(newSearchIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finalData = searchResults.filter((row) => {
    return filterFunction(row);
  });

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-md font-semibold mb-2">{title}</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex gap-1 w-full">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full"
            >
              {filterData.find((row) => row.id === selectedRow)?.name ??
                selectRowText}
            </Button>
          </PopoverTrigger>
          <div className="w-14">
            {selectedRow && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedRow(undefined);
                }}
              >
                <Icons.cross />
              </Button>
            )}
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
                  height={200}
                  itemCount={finalData.length}
                  itemSize={40}
                >
                  {({ index, style }) => (
                    <CommandItem
                      className="justify-center hover:cursor-pointer"
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
