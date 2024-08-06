import { type AdvertisementFetchResult } from "@/lib/data/advertisement";
import { type AdvertisementsFetchResult } from "@/lib/data/advertisements";
import { type AdType } from "@/lib/data/advertisements/types";

export type Advertisement = ReturnType<typeof getFormattedAdvertisement>;
export function getFormattedAdvertisement(
  advertisement: AdvertisementsFetchResult | AdvertisementFetchResult,
  getIdsInsteadOfNames = false
) {
  return {
    id: advertisement.id,
    price: advertisement.price,
    description: advertisement.description,
    street: advertisement.street,
    user_id: advertisement.user_id,
    title: advertisement.title,
    floor: advertisement.floor,
    room_area: advertisement.room_area,
    primary_photo_url: advertisement.primary_photo_url,
    type: advertisement.type as AdType,
    apartment_area: advertisement.apartment_area,
    apartment_rooms: advertisement.apartment_rooms,
    max_floor: advertisement.max_floor,
    available_from: advertisement.available_from,
    municipality: getIdsInsteadOfNames
      ? advertisement.municipalities.id
      : advertisement.municipalities.name,
    district: getIdsInsteadOfNames
      ? advertisement.municipalities.districts.id
      : advertisement.municipalities.districts.name,
    advertisement_photos:
      "advertisements_photos" in advertisement
        ? advertisement.advertisements_photos
        : [],
    region: getIdsInsteadOfNames
      ? advertisement.municipalities.districts.regions.id
      : advertisement.municipalities.districts.regions.name,
  };
}
