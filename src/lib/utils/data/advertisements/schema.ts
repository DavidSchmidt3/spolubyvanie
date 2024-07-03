import * as z from "zod";
import { createAdTypeRegex } from "./types";

export const ADVERTISEMENTS_FILTER_SCHEMA = z
  .object({
    municipality: z.string().uuid().or(z.undefined()),
    district: z.string().uuid().or(z.undefined()),
    region: z.string().uuid().or(z.undefined()),
    price_min: z
      .string()
      .regex(/^\d+$/, {
        message: "alerts.advertisement.price.number",
      })
      .refine((val) => !val || parseInt(val) >= 0, {
        message: "alerts.advertisement.price.invalid",
      })
      .or(z.undefined()),
    price_max: z
      .string()
      .regex(/^\d+$/, {
        message: "alerts.advertisement.price.number",
      })
      .refine((val) => !val || parseInt(val) >= 0, {
        message: "alerts.advertisement.price.invalid",
      })
      .or(z.undefined()),
    advertisement_type: z.string().regex(createAdTypeRegex()).or(z.undefined()),
  })
  .superRefine((data, context) => {
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

export type AdvertisementFilterFormValues = z.infer<
  typeof ADVERTISEMENTS_FILTER_SCHEMA
>;
