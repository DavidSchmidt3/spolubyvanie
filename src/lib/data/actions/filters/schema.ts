import { z } from "zod";

export const FILTER_FORM_SCHEMA = z.object({
  name: z.string(),
  query: z.string(),
});
