"use server";
import { DELETE_ADVERTISEMENTS_SCHEMA } from "@/lib/data/actions/my-advertisements/schema";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { db } from "@/lib/utils/prisma";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";

export const deleteAdvertisement = authActionClient
  .schema(DELETE_ADVERTISEMENTS_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      const supabase = createClient();
      const advertisementPhotos = await db.advertisements_photos.findMany({
        where: {
          advertisement_id: data.advertisement_id,
        },
      });

      const urls = advertisementPhotos.map((photo) => photo.url);
      await supabase.storage.from("photos").remove(urls);

      await db.advertisements.delete({
        where: {
          id: data.advertisement_id,
          user_id: userId,
        },
      });
    } catch (error) {
      console.error("Error deleting advertisement", error);
      throw new ActionError("alerts.my_advertisements.delete.error.title");
    }
  });
