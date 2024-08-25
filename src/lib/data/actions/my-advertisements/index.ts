"use server";
import { DELETE_ADVERTISEMENTS_SCHEMA } from "@/lib/data/actions/my-advertisements/schema";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { db } from "@/lib/utils/prisma";
import { PHOTO_BUCKET, trimBucketName } from "@/lib/utils/supabase";
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

      const urls = advertisementPhotos.map((photo) =>
        trimBucketName(photo.url)
      );
      // first delete the entry from the database
      await db.advertisements.delete({
        where: {
          id: data.advertisement_id,
          user_id: userId,
        },
      });

      // then delete the photos from the storage
      // if this was done vice versa and the db deletion failed, we wouldn't have the images, only entry in the db
      const deleteResult = await supabase.storage
        .from(PHOTO_BUCKET)
        .remove(urls);
      if (deleteResult.error) {
        console.error("Error deleting photos", deleteResult.error);
      }
    } catch (error) {
      console.error("Error deleting advertisement", error);
      throw new ActionError(
        "alerts.my_advertisements.delete.database_error.title"
      );
    }
  });
