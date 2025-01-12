import { CheckPropertySchema } from "@/lib/data/advertisements-properties/types";
import { AdType, createAdTypeRegex } from "@/lib/data/advertisements/types";
import { type Locale } from "@/lib/utils/localization/i18n";
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
    locale: z.custom<Locale>((value) => value as Locale),
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
    properties: z.record(CheckPropertySchema).or(z.undefined()),
    room_max_occupancy: z.number().int().min(1).max(3),
    min_age: z.string().regex(/^\d+$/).or(z.literal("")),
    max_age: z.string().regex(/^\d+$/).or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const advertisement_type = parseInt(data.advertisement_type) as AdType;

    const minAge = parseInt(data.min_age);

    if (minAge <= 0) {
      ctx.addIssue({
        path: ["min_age"],
        code: "custom",
        message: "alerts.add_advertisement.min_age.min",
      });
    }

    if (minAge > 99) {
      ctx.addIssue({
        path: ["min_age"],
        code: "custom",
        message: "alerts.add_advertisement.min_age.max",
      });
    }

    const maxAge = parseInt(data.max_age);

    if (maxAge <= 0) {
      ctx.addIssue({
        path: ["max_age"],
        code: "custom",
        message: "alerts.add_advertisement.max_age.min",
      });
    }

    if (maxAge > 99) {
      ctx.addIssue({
        path: ["max_age"],
        code: "custom",
        message: "alerts.add_advertisement.max_age.max",
      });
    }

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

      if (parseInt(data.min_age) > parseInt(data.max_age)) {
        ctx.addIssue({
          path: ["min_age"],
          code: "custom",
          message: "alerts.add_advertisement.min_age.higher_than_max_age",
        });
      }

      if (data.properties) {
        const checkedProperties = Object.values(data.properties).filter(
          (p) => p.checked
        );

        const propertiesByGroup: Record<string, typeof checkedProperties> = {};

        for (const prop of checkedProperties) {
          const groupId = prop.property_group_id;
          if (groupId) {
            if (!propertiesByGroup[groupId]) {
              propertiesByGroup[groupId] = [];
            }
            propertiesByGroup[groupId].push(prop);
          }
        }

        for (const groupId in propertiesByGroup) {
          const groupProperties = propertiesByGroup[groupId];
          if (groupProperties && groupProperties?.length >= 2) {
            const propertiesGroup = groupProperties[0]?.properties_group;
            if (propertiesGroup) {
              ctx.addIssue({
                path: ["properties"],
                code: "custom",
                message: propertiesGroup[`${data.locale}_translation`],
              });
            }
          }
        }
      }
    }
  });

export type AdvertisementUpsertFormValues = z.infer<
  typeof ADVERTISEMENT_UPSERT_SCHEMA
>;

export const ADVERTISEMENT_VIEW_SCHEMA = z.string().uuid();
