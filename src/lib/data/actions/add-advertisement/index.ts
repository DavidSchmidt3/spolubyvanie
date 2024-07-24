"use server";
import { ADVERTISEMENT_ADD_SCHEMA } from "@/lib/data/actions/add-advertisement/schema";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import { AdType } from "@/lib/data/advertisements/types";
import { db, type TransactionalPrismaClient } from "@/lib/utils/prisma";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";

export const addAdvertisement = authActionClient
  .schema(ADVERTISEMENT_ADD_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      const {
        municipality,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        district,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        region,
        price,
        apartment_area,
        floor,
        max_floor,
        room_area,
        advertisement_type,
        primary_photo,
        apartment_rooms,
        photos,
        ...rest
      } = data;

      const asciiOnlyPrimaryPhoto = getAsciiName(primary_photo);
      const type = parseInt(advertisement_type) as AdType;

      await db.$transaction(async (tx) => {
        const { id: advertisementId } = await tx.advertisements.create({
          data: {
            user_id: userId,
            type,
            floor: parseInt(floor),
            max_floor: parseInt(max_floor),
            room_area: parseInt(room_area),
            apartment_area: parseInt(apartment_area),
            apartment_rooms: parseInt(apartment_rooms),
            municipality_id: municipality,
            price: parseInt(price),
            id: randomUUID(),
            ...rest,
          },
        });

        if (type === AdType.SearchingRoom) {
          revalidateTag("advertisements");
          return;
        }

        await uploadPhotos(photos, asciiOnlyPrimaryPhoto, advertisementId, tx);
        revalidateTag("advertisements");
      });
    } catch (error) {
      console.error("Error adding advertisement", error);
      throw new ActionError("alerts.add_advertisement.save.error.title");
    }
  });

async function uploadPhotos(
  photos: File[],
  primary_photo: string,
  advertisementId: string,
  tx: TransactionalPrismaClient
) {
  const supabase = createClient();

  const uploadPromises = photos.map(async (photo) => {
    const asciiOnlyName = getAsciiName(photo.name);
    const data = await supabase.storage
      .from("photos")
      .upload(`${advertisementId}/${asciiOnlyName}`, photo, {
        upsert: true,
      });
    return data;
  });

  const result = await Promise.all(uploadPromises);
  let primaryPhotoUrl = "";
  result.forEach((item) => {
    if (item.error) {
      throw new Error(`Error while uploading photo ${item.error.message}`);
    }
    if (item.data.fullPath.includes(primary_photo)) {
      primaryPhotoUrl = item.data.fullPath;
    }
  });

  await tx.advertisements.update({
    where: {
      id: advertisementId,
    },
    data: {
      primary_photo_url: primaryPhotoUrl,
      advertisements_photos: {
        create: result.map((item) => ({
          url: item.data!.fullPath,
        })),
      },
    },
  });
}

function getAsciiName(name: string) {
  return name.replace(/[^\x20-\x7E]/g, "");
}
