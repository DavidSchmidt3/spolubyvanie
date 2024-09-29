import { type Property } from "@/lib/data/advertisements-properties";
import { advertisementPropertySortOrder } from "@/lib/data/advertisements-properties/types";
import { groupBy } from "lodash";

export const useGroupedProperties = (properties: Property[]) => {
  if (!properties) return [];

  // Group properties by type
  const grouped = groupBy(properties, "type");

  // Convert Map to array of entries
  const entries = Object.entries(grouped) as [Property["type"], Property[]][];

  // Sort the entries based on advertisementPropertySortOrder
  const sortedEntries = entries.toSorted(([keyA], [keyB]) => {
    return (
      advertisementPropertySortOrder[keyA] -
      advertisementPropertySortOrder[keyB]
    );
  });

  // For each entry, sort the value array without mutating the original
  const sortedEntriesWithSortedValues = sortedEntries.map(([key, value]) => {
    const sortedValue = [...value].sort((a, b) => {
      return (
        (a.order ?? Number.MAX_SAFE_INTEGER) -
        (b.order ?? Number.MAX_SAFE_INTEGER)
      );
    });
    return [key, sortedValue] as [Property["type"], Property[]];
  });

  return sortedEntriesWithSortedValues;
};
