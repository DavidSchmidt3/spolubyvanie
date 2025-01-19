import { CheckPropertySchema } from "@/lib/data/advertisements-properties/types";
import { AdType, createAdTypeRegex } from "@/lib/data/advertisements/types";
import * as z from "zod";

const ADVERTISEMENT_FILTER_BASE_SCHEMA = z.object({
  municipality: z.array(z.string().uuid()).or(z.undefined()).or(z.string()),
  district: z.array(z.string().uuid()).or(z.undefined()).or(z.string()),
  region: z.string().uuid().or(z.literal("")).or(z.undefined()),
  price_min: z
    .string()
    .regex(/^\s*\d*\s*$/, {
      message: "alerts.advertisement.price.number",
    })
    .refine((val) => !val || parseInt(val) >= 0, {
      message: "alerts.advertisement.price.invalid",
    })
    .or(z.literal(""))
    .or(z.undefined()),
  price_max: z
    .string()
    .regex(/^\s*\d*\s*$/, {
      message: "alerts.advertisement.price.number",
    })
    .refine((val) => !val || parseInt(val) >= 0, {
      message: "alerts.advertisement.price.invalid",
    })
    .or(z.literal(""))
    .or(z.undefined()),
  min_age: z
    .string()
    .regex(/^\s*\d*\s*$/, {
      message: "alerts.advertisement.age.number",
    })
    .refine((val) => !val || parseInt(val) >= 0, {
      message: "alerts.advertisement.age.invalid",
    })
    .or(z.literal(""))
    .or(z.undefined()),
  max_age: z
    .string()
    .regex(/^\s*\d*\s*$/, {
      message: "alerts.advertisement.age.number",
    })
    .refine((val) => !val || parseInt(val) >= 0, {
      message: "alerts.advertisement.age.invalid",
    })
    .or(z.literal(""))
    .or(z.undefined()),
  advertisement_type: z
    .string()
    .regex(createAdTypeRegex())
    .or(z.literal(""))
    .or(z.undefined()),
  sort_by: z
    .literal("price")
    .or(z.literal("updated_at"))
    .or(z.literal("apartment_rooms"))
    .or(z.literal("room_area"))
    .or(z.undefined()),
  sort_order: z.literal("asc").or(z.literal("desc")).or(z.undefined()),
  properties: z.record(CheckPropertySchema).or(z.string()).or(z.undefined()),
});

export const DEFAULT_SORT_BY = "updated_at";
export const DEFAULT_SORT_ORDER = "asc";
export const OFFERING_ROOM_ONLY_SORT_BY_VALUES = [
  "room_area",
  "apartment_rooms",
] as const;
export const NULLABLE_SORT_BY_VALUES = [
  "apartment_rooms",
  "room_area",
] as const;

export type SortByOptions = z.infer<
  typeof ADVERTISEMENT_FILTER_BASE_SCHEMA
>["sort_by"];
export type SortOrder = z.infer<
  typeof ADVERTISEMENT_FILTER_BASE_SCHEMA
>["sort_order"];
export type AdvertisementProperties = z.infer<
  typeof ADVERTISEMENT_FILTER_BASE_SCHEMA
>["properties"];

const ADVERTISEMENT_PAGINATION_SCHEMA = z.object({
  page: z.string().regex(/^\d*$/, {
    message: "alerts.pagination.page.invalid",
  }),
});

function attachPriceAgeRefinements<
  O extends z.infer<typeof ADVERTISEMENT_FILTER_BASE_SCHEMA>,
  T extends z.ZodTypeDef,
  I
>(schema: z.ZodType<O, T, I>) {
  return schema.superRefine((data, context) => {
    if (
      data.price_min &&
      data.price_max &&
      parseInt(data.price_min) >= parseInt(data.price_max)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "alerts.advertisement.price.max_higher_than_min",
        path: ["price_max"],
      });
    }

    const advertisement_type = data.advertisement_type
      ? (parseInt(data.advertisement_type) as AdType)
      : undefined;
    if (
      data.min_age &&
      data.max_age &&
      advertisement_type === AdType.SearchingRoom && // validate only for searching room - thats when we provide range
      parseInt(data.min_age) >= parseInt(data.max_age)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "alerts.advertisement.age.max_higher_than_min",
        path: ["min_age"],
      });
    }
  });
}

export const ADVERTISEMENTS_FULL_SCHEMA = attachPriceAgeRefinements(
  ADVERTISEMENT_FILTER_BASE_SCHEMA.merge(ADVERTISEMENT_PAGINATION_SCHEMA)
);

export const ADVERTISEMENTS_FILTER_SCHEMA = attachPriceAgeRefinements(
  ADVERTISEMENT_FILTER_BASE_SCHEMA
);

export type AdvertisementFilterFormValues = z.infer<
  typeof ADVERTISEMENTS_FILTER_SCHEMA
>;

export type AdvertisementFullSchemaValues = z.infer<
  typeof ADVERTISEMENTS_FULL_SCHEMA
>;

export const ADVERTISEMENT_FILTER_DEFAULT_VALUES: AdvertisementFilterFormValues =
  {
    municipality: [],
    district: [],
    region: "",
    price_min: "",
    price_max: "",
    min_age: "",
    max_age: "",
    advertisement_type: "",
    sort_by: "price",
    sort_order: "asc",
    properties: {},
  };
