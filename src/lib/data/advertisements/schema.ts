import * as z from "zod";
import { createAdTypeRegex } from "./types";

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
  advertisement_type: z
    .string()
    .regex(createAdTypeRegex())
    .or(z.literal(""))
    .or(z.undefined()),
  sort_by: z
    .literal("price")
    .or(z.literal("created_at"))
    .or(z.literal("apartment_rooms"))
    .or(z.literal("room_area"))
    .or(z.undefined()),
  sort_order: z.literal("asc").or(z.literal("desc")).or(z.undefined()),
});
export const sortFields = ["sort_by", "sort_order"] as const;

export type SortByOptions = z.infer<
  typeof ADVERTISEMENT_FILTER_BASE_SCHEMA
>["sort_by"];
export type SortOrder = z.infer<
  typeof ADVERTISEMENT_FILTER_BASE_SCHEMA
>["sort_order"];

const ADVERTISEMENT_PAGINATION_SCHEMA = z.object({
  page: z.string().regex(/^\d*$/, {
    message: "alerts.pagination.page.invalid",
  }),
});

function attachPriceRefinements<
  O extends z.infer<typeof ADVERTISEMENT_FILTER_BASE_SCHEMA>,
  T extends z.ZodTypeDef,
  I
>(schema: z.ZodType<O, T, I>) {
  return schema.superRefine((data, context) => {
    if (!data.price_min || !data.price_max) {
      return;
    }
    if (parseInt(data.price_min) >= parseInt(data.price_max)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "alerts.advertisement.price.max_higher_than_min",
        path: ["price_max"],
      });
    }
  });
}

export const ADVERTISEMENTS_FULL_SCHEMA = attachPriceRefinements(
  ADVERTISEMENT_FILTER_BASE_SCHEMA.merge(ADVERTISEMENT_PAGINATION_SCHEMA)
);

export const ADVERTISEMENTS_FILTER_SCHEMA = attachPriceRefinements(
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
    advertisement_type: "",
    sort_by: "price",
    sort_order: "asc",
  };
