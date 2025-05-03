import { z } from "zod";

export const UPSERT_FILTER_FORM_SCHEMA = z.object({
  name: z.string(),
  query: z.string(),
});

export const DELETE_FILTER_SCHEMA = z.object({
  id: z.string(),
});
