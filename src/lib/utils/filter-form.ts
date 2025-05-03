import { type Property } from "@/lib/data/advertisements-properties";
import {
  type SortByOptions,
  type SortOrder,
  ADVERTISEMENT_FILTER_DEFAULT_VALUES,
} from "@/lib/data/advertisements/schema";
import { constructPropertiesObject } from "@/lib/utils/localization/navigation";

export const getFilterFormDefaultValues = (
  searchParams: URLSearchParams,
  properties: Property[]
) => {
  return {
    municipality:
      searchParams.get("municipality")?.split(",") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.municipality,
    district:
      searchParams.get("district")?.split(",") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.district,
    region:
      searchParams.get("region") ?? ADVERTISEMENT_FILTER_DEFAULT_VALUES.region,
    price_min:
      searchParams.get("price_min") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.price_min,
    price_max:
      searchParams.get("price_max") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.price_max,
    min_age:
      searchParams.get("min_age") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.min_age,
    max_age:
      searchParams.get("max_age") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.max_age,
    advertisement_type:
      searchParams.get("advertisement_type") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.advertisement_type,
    sort_by:
      (searchParams.get("sort_by") as SortByOptions) ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.sort_by,
    sort_order:
      (searchParams.get("sort_order") as SortOrder) ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.sort_order,
    properties:
      constructPropertiesObject(searchParams.get("properties"), properties) ??
      {},
    max_apartment_rooms:
      searchParams.get("max_apartment_rooms") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.max_apartment_rooms,
    min_room_area:
      searchParams.get("min_room_area") ??
      ADVERTISEMENT_FILTER_DEFAULT_VALUES.min_room_area,
  };
};
