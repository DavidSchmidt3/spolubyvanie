import { createAdTypeRegex } from "@/lib/data/advertisements/types";
import * as z from "zod";

export const ADVERTISEMENT_ADD_SCHEMA = z.object({
  user_id: z.string().uuid(),
  region: z.string().uuid(),
  district: z.string().uuid(),
  municipality: z.string().uuid(),
  price: z.string().regex(/^\d+$/, {
    message: "TODO: ",
  }),
  type: z
    .string()
    .regex(createAdTypeRegex())
    .or(z.literal(""))
    .or(z.undefined()),
  street: z.string(),
  apartment_area: z.string().regex(/^\d+$/).or(z.undefined()),
  room_area: z.string().regex(/^\d+$/).or(z.undefined()),
  floor: z.string().regex(/^\d+$/).or(z.undefined()),
  max_floor: z.string().regex(/^\d+$/).or(z.undefined()),
  description: z
    .string()
    .min(100, {
      message: "TODO: ",
    })
    .max(5000, {
      message: "TODO: ",
    }),
  title: z.string().min(10, {
    message: "TODO: ",
  }),
  available_from: z.string().date(),
  primary_photo: z.string().url(),
  photos: z.array(z.string().url()).max(10),
});

export type AdvertisementAddFormValues = z.infer<
  typeof ADVERTISEMENT_ADD_SCHEMA
>;
