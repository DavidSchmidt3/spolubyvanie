import { createAdTypeRegex } from "@/lib/data/advertisements/types";
import * as z from "zod";

export const ADVERTISEMENT_ADD_SCHEMA = z.object({
  region: z.string().uuid({
    message: "alerts.add_advertisement.region.required",
  }),
  district: z.string().uuid({
    message: "alerts.add_advertisement.district.required",
  }),
  municipality: z.string().uuid({
    message: "alerts.add_advertisement.municipality.required",
  }),
  price: z.string().regex(/^\d+$/, {
    message: "alerts.add_advertisement.price.required",
  }),
  advertisement_type: z.string().regex(createAdTypeRegex(true), {
    message: "alerts.add_advertisement.type.required",
  }),
  street: z.string().min(2, {
    message: "alerts.add_advertisement.street.required",
  }),
  apartment_area: z.string().regex(/^\d+$/).or(z.literal("")),
  room_area: z.string().regex(/^\d+$/).or(z.literal("")),
  floor: z.string().regex(/^\d+$/).or(z.literal("")),
  max_floor: z.string().regex(/^\d+$/).or(z.literal("")),
  description: z
    .string()
    .min(100, {
      message: "alerts.add_advertisement.description.min_length",
    })
    .max(5000, {
      message: "alerts.add_advertisement.description.max_length",
    }),
  title: z.string().min(10, {
    message: "alerts.add_advertisement.title.min_length",
  }),
  available_from: z.date({
    message: "alerts.add_advertisement.available_from.required",
  }),
  primary_photo: z.string().url(),
  photos: z.array(z.string().url()).max(10),
});

export type AdvertisementAddFormValues = z.infer<
  typeof ADVERTISEMENT_ADD_SCHEMA
>;
