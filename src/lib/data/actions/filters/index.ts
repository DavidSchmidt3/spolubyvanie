"use server";
import {
  DELETE_FILTER_SCHEMA,
  UPSERT_FILTER_FORM_SCHEMA,
} from "@/lib/data/actions/filters/schema";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { type UserFilter } from "@/lib/data/user";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";

export const createFilter = authActionClient
  .schema(UPSERT_FILTER_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      return (await db.users_filters.create({
        data: {
          ...data,
          user_id: userId,
        },
      })) as unknown as UserFilter;
    } catch (error) {
      console.error("Error saving filter", error);
      throw new ActionError("alerts.filters.save.database_error.title");
    }
  });

export const deleteFilter = authActionClient
  .schema(DELETE_FILTER_SCHEMA)
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      return (await db.users_filters.delete({
        where: {
          id: data.id,
          user_id: userId,
        },
      })) as unknown as UserFilter;
    } catch (error) {
      console.error("Error deleting filter", error);
      throw new ActionError("alerts.filters.delete.database_error.title");
    }
  });
