import * as z from "zod";

export const DELETE_ADVERTISEMENTS_SCHEMA = z.object({
  advertisement_id: z.string().uuid(),
});

export type DeleteAdvertisementsInput = z.infer<
  typeof DELETE_ADVERTISEMENTS_SCHEMA
>;
