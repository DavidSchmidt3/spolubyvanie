import { type Database } from "@/lib/utils/supabase/types/database";

enum AdvertisementProperty {
  room = "room",
  roommate = "roommate",
  room_orientation = "room_orientation",
  apartment = "apartment",
  special_apartment = "special_apartment",
}

export const advertisementPropertySortOrder: {
  [key in Database["public"]["Enums"]["advertisement_property"]]: number;
} = {
  [AdvertisementProperty.room]: 1,
  [AdvertisementProperty.roommate]: 2,
  [AdvertisementProperty.room_orientation]: 3,
  [AdvertisementProperty.apartment]: 4,
  [AdvertisementProperty.special_apartment]: 5,
};
