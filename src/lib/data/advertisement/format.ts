import { type AdvertisementUpsertFormValues } from "@/lib/data/actions/upsert-advertisement/schema";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { getFileNameFromFullPath } from "@/lib/utils/supabase";

export function getFormDefaultValues(
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
    apartment_rooms: advertisement?.apartment_rooms?.toString() ?? "",
    room_area: advertisement?.room_area?.toString() ?? "",
    floor: advertisement?.floor?.toString() ?? "",
    max_floor: advertisement?.max_floor?.toString() ?? "",
    description: advertisement?.description ?? "",
    available_from: advertisement?.available_from ?? new Date(),
    primary_photo: advertisement?.primary_photo_url
      ? getFileNameFromFullPath(advertisement.primary_photo_url)
      : "",
    photos: [],
    title: advertisement?.title ?? "",
  };
}
