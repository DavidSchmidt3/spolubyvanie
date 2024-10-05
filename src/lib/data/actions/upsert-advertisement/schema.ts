import { AdType, createAdTypeRegex } from "@/lib/data/advertisements/types";
import * as z from "zod";

export const ADVERTISEMENT_UPSERT_SCHEMA = z
  .object({
    id: z.string().uuid().or(z.undefined()),
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
    street: z.string(),
    apartment_area: z.string().regex(/^\d+$/).or(z.literal("")),
    apartment_rooms: z.number().int().min(1).max(5),
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
    primary_photo: z.string(),
    photos: z.array(z.instanceof(File)).max(10, {
      message: "alerts.add_advertisement.photos.max_length",
    }),
    properties: z.record(z.boolean()).or(z.undefined()),
    room_max_occupancy: z.number().int().min(1).max(3),
  })
  .superRefine((data, ctx) => {
    const advertisement_type = parseInt(data.advertisement_type) as AdType;

    if (advertisement_type === AdType.OfferingRoom) {
      if (!data.photos.length) {
        ctx.addIssue({
          path: ["photos"],
          code: "custom",
          message: "alerts.add_advertisement.photos.min_length",
        });
      }

      if (!data.street) {
        ctx.addIssue({
          path: ["street"],
          code: "custom",
          message: "alerts.add_advertisement.street.required",
        });
      }

      if (!data.region) {
        ctx.addIssue({
          path: ["region"],
          code: "custom",
          message: "alerts.add_advertisement.region.required",
        });
      }

      if (!data.district) {
        ctx.addIssue({
          path: ["district"],
          code: "custom",
          message: "alerts.add_advertisement.district.required",
        });
      }

      if (!data.municipality) {
        ctx.addIssue({
          path: ["municipality"],
          code: "custom",
          message: "alerts.add_advertisement.municipality.required",
        });
      }

      if (parseInt(data.floor) > parseInt(data.max_floor)) {
        ctx.addIssue({
          path: ["floor"],
          code: "custom",
          message: "alerts.add_advertisement.floor.higher_than_max_floor",
        });
      }

      if (parseInt(data.room_area) > parseInt(data.apartment_area)) {
        ctx.addIssue({
          path: ["room_area"],
          code: "custom",
          message:
            "alerts.add_advertisement.room_area.larger_than_apartment_area",
        });
      }
    }
  });

export type AdvertisementUpsertFormValues = z.infer<
  typeof ADVERTISEMENT_UPSERT_SCHEMA
>;
