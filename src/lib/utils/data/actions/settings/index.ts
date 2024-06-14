"use server";
import { getUser } from "@/lib/utils/data/user";
import { db } from "@/lib/utils/prisma";
import { SETTINGS_FORM_SCHEMA } from "./schema";

export const saveSettings = async (input: unknown) => {
  const validatedSettingsInput = SETTINGS_FORM_SCHEMA.safeParse(input);

  if (!validatedSettingsInput.success) {
    const fieldErrors = validatedSettingsInput.error.flatten().fieldErrors;
    const keys = Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>;
    const errors = keys.map((key) => fieldErrors[key]!); // when key is present it will always have a value
    return {
      isError: true,
      error: errors,
    };
  }

  const user = await getUser();
  if (!user) {
    return {
      isError: true,
      error: "errors.unauthenticated",
    };
  }

  const response = await db.user_settings.upsert({
    where: {
      id: user.id,
    },
    create: {
      ...validatedSettingsInput.data,
      id: user.id,
    },
    update: validatedSettingsInput.data,
  });

  // revalidatePath("/settings");
  return {
    isError: false,
    data: response,
  };
};
