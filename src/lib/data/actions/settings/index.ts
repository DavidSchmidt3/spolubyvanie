"use server";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { SETTINGS_FORM_SCHEMA } from "@/lib/data/actions/settings/schema";
import { type UserSettings } from "@/lib/data/settings";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";

export const saveSettings = authActionClient
  .schema(SETTINGS_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      return (await db.user_settings.upsert({
        where: {
          id: userId,
        },
        create: {
          ...data,
          id: userId,
        },
        update: data,
      })) as unknown as UserSettings;
    } catch (error) {
      console.error("Error saving settings", error);
      throw new ActionError("alerts.settings.save.error.title");
    }
  });
