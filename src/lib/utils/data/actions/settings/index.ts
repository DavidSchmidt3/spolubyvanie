"use server";
import { getUser } from "@/lib/utils/data/user";
import { db } from "@/lib/utils/prisma";
import { formatZodErrorsToArray } from "@/lib/utils/zod";
import { type UserSettings } from "../../settings";
import { SETTINGS_FORM_SCHEMA } from "./schema";

export const saveSettings = async (input: unknown) => {
  const validatedSettingsInput = SETTINGS_FORM_SCHEMA.safeParse(input);

  if (!validatedSettingsInput.success) {
    const errors = formatZodErrorsToArray(validatedSettingsInput);
    return {
      isError: true,
      error: errors,
    };
  }

  const user = await getUser();
  if (!user) {
    console.error("User not found while saving settings");
    return {
      isError: true,
      error: "alerts.user.error.unauthenticated" as const,
    };
  }

  try {
    const newSettings = (await db.user_settings.upsert({
      where: {
        id: user.id,
      },
      create: {
        ...validatedSettingsInput.data,
        id: user.id,
      },
      update: validatedSettingsInput.data,
    })) as unknown as UserSettings;

    return {
      isError: false,
      data: newSettings,
    };
  } catch (error) {
    console.error("Error saving settings", error);
    return {
      isError: true,
      error: "alerts.settings.save.error.title" as const,
    };
  }
};
