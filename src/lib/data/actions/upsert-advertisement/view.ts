"use server";
import { actionClient } from "@/lib/data/actions/safe-action-client";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";
import { ADVERTISEMENT_VIEW_SCHEMA } from "./schema";

export const addAdvertisementView = actionClient
  .schema(ADVERTISEMENT_VIEW_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data }) => {
    await db.advertisements.update({
      where: {
        id: data,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  });
