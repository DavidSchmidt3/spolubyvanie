"use server";
import { FILTER_FORM_SCHEMA } from "@/lib/data/actions/filters/schema";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { type UserFilter } from "@/lib/data/user";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";

export const upsertFilter = authActionClient
  .schema(FILTER_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      return (await db.users_filters.upsert({
        where: {
          id: userId,
        },
        create: {
          ...data,
          user_id: userId,
        },
        update: data,
      })) as unknown as UserFilter;
    } catch (error) {
      console.error("Error saving filter", error);
      throw new ActionError("alerts.filters.save.database_error.title");
    }
  });
