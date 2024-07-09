import * as z from "zod";
import { createAdTypeRegex } from "./types";

const ADVERTISEMENT_FILTER_BASE_SCHEMA = z.object({
  municipality: z.string().uuid().or(z.literal("")).or(z.undefined()),
  district: z.string().uuid().or(z.literal("")).or(z.undefined()),
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
});

const ADVERTISEMENT_PAGINATION_SCHEMA = z.object({
  page: z
    .string()
    .regex(/^\d*$/, {
      message: "alerts.pagination.page.invalid",
    })
    .or(z.literal(""))
    .or(z.undefined()),
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
