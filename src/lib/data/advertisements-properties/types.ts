import { type Database } from "@/lib/utils/supabase/types/database";
import * as z from "zod";

export enum AdvertisementProperty {
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

export type PropertyGroup =
  Database["public"]["Tables"]["properties_group"]["Row"];

export const CheckPropertySchema = z.object({
  id: z.string(),
  type: z.nativeEnum(AdvertisementProperty),
  order: z.number().nullable(),
  sk_translation: z.string(),
  property_group_id: z.string().nullable(),
  en_translation: z.string(),
  properties_group: z
    .custom<PropertyGroup>((value) => value as PropertyGroup)
    .nullable(),
  checked: z.boolean(),
});
export type CheckPropertySchemaType = z.infer<typeof CheckPropertySchema>;
