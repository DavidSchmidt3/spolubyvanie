import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { type Locale } from "@/lib/utils/localization/i18n";
import { getFileNameFromFullPath } from "@/lib/utils/supabase";
import { type Property } from "../advertisements-properties";
import { type CheckPropertySchemaType } from "../advertisements-properties/types";

export function getFormDefaultValues(
  locale: Locale,
  properties: Property[],
  advertisement?: Advertisement
): AdvertisementUpsertFormValues {
  return {
    id: advertisement?.id,
    municipality: advertisement?.municipality ?? "",
    region: advertisement?.region ?? "",
    district: advertisement?.district ?? "",
    price: advertisement?.price?.toString() ?? "",
    advertisement_type: advertisement?.type?.toString() ?? "",
    street: advertisement?.street ?? "",
    apartment_area: advertisement?.apartment_area?.toString() ?? "",
    apartment_rooms: advertisement?.apartment_rooms ?? 1,
    room_area: advertisement?.room_area?.toString() ?? "",
    floor: advertisement?.floor?.toString() ?? "",
    max_floor: advertisement?.max_floor?.toString() ?? "",
    description: advertisement?.description ?? "",
    locale,
    available_from: advertisement?.available_from ?? new Date(),
    primary_photo: advertisement?.primary_photo_url
      ? getFileNameFromFullPath(advertisement.primary_photo_url)
      : "",
    properties:
      advertisement?.advertisements_properties?.reduce((acc, property) => {
        if (property.property_id) {
          const fullPropertyObject = properties.find(
            (p) => p.id === property.property_id
          )!;
          acc[property.property_id] = {
            checked: true,
            ...fullPropertyObject,
            type: fullPropertyObject.type as CheckPropertySchemaType["type"],
          };
        }
        return acc;
      }, {} as Record<string, CheckPropertySchemaType>) ?? {},
    room_max_occupancy: advertisement?.room_max_occupancy ?? 1,
    photos: [],
    title: advertisement?.title ?? "",
  };
}
