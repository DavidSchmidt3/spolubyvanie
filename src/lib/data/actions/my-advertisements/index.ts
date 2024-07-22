"use server";
import { DELETE_ADVERTISEMENTS_SCHEMA } from "@/lib/data/actions/my-advertisements/schema";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";

export const deleteAdvertisement = authActionClient
  .schema(DELETE_ADVERTISEMENTS_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
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
