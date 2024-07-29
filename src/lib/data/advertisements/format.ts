import { type fetchAdvertisement } from "@/lib/data/advertisement";
import { type fetchAdvertisements } from "@/lib/data/advertisements";

export type Advertisement = ReturnType<typeof getFormattedAdvertisement>;
export function getFormattedAdvertisement(
  advertisement:
    | Awaited<ReturnType<typeof fetchAdvertisements>>[0][number]
    | Awaited<ReturnType<typeof fetchAdvertisement>>
) {
  return {
    id: advertisement?.id,
    price: advertisement.price,
    description: advertisement.description,
    street: advertisement.street,
    title: advertisement.title,
    floor: advertisement.floor,
    room_area: advertisement.room_area,
    primary_photo_url: advertisement.primary_photo_url,
    type: advertisement.type,
    apartment_area: advertisement.apartment_area,
    apartment_rooms: advertisement.apartment_rooms,
    max_floor: advertisement.max_floor,
    available_from: advertisement.available_from,
    municipality: advertisement.municipalities.name,
    district: advertisement.municipalities.districts.name,
    advertisement_photos:
      "advertisements_photos" in advertisement
        ? advertisement.advertisements_photos
        : [],
    region: advertisement.municipalities.districts.regions.name,
  };
}
