"use server";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import {
  ADVERTISEMENT_UPSERT_SCHEMA,
  type AdvertisementUpsertFormValues,
} from "@/lib/data/actions/upsert-advertisement/schema";
import { type AdType } from "@/lib/data/advertisements/types";
import { db, type TransactionalPrismaClient } from "@/lib/utils/prisma";
import {
  getFileNameFromFullPath,
  PHOTO_BUCKET,
  trimBucketName,
} from "@/lib/utils/supabase";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { revalidateTag } from "next/cache";

const fileService = {
  uploadPhotos: async (advertisementId: string, photos: File[]) => {
    const supabase = createClient();
    const uploadPromises = photos.map(async (photo) => {
      const asciiOnlyName = getAsciiName(photo.name);
      const data = await supabase.storage
        .from(PHOTO_BUCKET)
        .upload(`${advertisementId}/${asciiOnlyName}`, photo, {
          upsert: true,
        });
      return data;
    });

    const result = await Promise.all(uploadPromises);
    result.forEach((item) => {
      if (item.error) {
        throw new Error(`Error while uploading photo ${item.error.message}`);
      }
    });

    return result;
  },
  deletePhotos: async (photos: string[]) => {
    const supabase = createClient();
    const deleteResult = await supabase.storage
      .from(PHOTO_BUCKET)
      .remove(photos);

    if (deleteResult.error) {
      throw new Error(
        `Error while deleting photo ${deleteResult.error.message}`
      );
    }
  },
};

export const upsertAdvertisement = authActionClient
  .schema(ADVERTISEMENT_UPSERT_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    const isEditing = !!data.id;

    if (isEditing) {
      await validateIsMine(data.id!, userId);
    }

    try {
      await db.$transaction(async (tx) => {
        const upsertData = parseAdvertisementData(data);
        const { id, photos, primary_photo } = data;
        const { id: advertisementId } = await tx.advertisements.upsert({
          where: {
            id: id ?? "",
          },
          update: upsertData,
          create: {
            ...upsertData,
            user_id: userId,
          },
        });
        if (isEditing) {
          await handleEditPhotos(photos, primary_photo, advertisementId, tx);
        } else {
          await handleAddPhotos(photos, primary_photo, advertisementId, tx);
        }

        revalidateTag("advertisements");
      });
    } catch (error) {
      throw new ActionError(
        isEditing
          ? "alerts.add_advertisement.save.edit.error.title"
          : "alerts.add_advertisement.save.add.error.title"
      );
    }
  });

function parseAdvertisementData(data: AdvertisementUpsertFormValues) {
  const {
    municipality,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    district,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    region,
    price,
    apartment_area,
    floor,
    primary_photo,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    photos,
    max_floor,
    room_area,
    advertisement_type,
    apartment_rooms,
    ...rest
  } = data;

  const type = parseInt(advertisement_type) as AdType;
  const upsertData = {
    type,
    floor: floor ? parseInt(floor) : undefined,
    max_floor: max_floor ? parseInt(max_floor) : undefined,
    room_area: room_area ? parseInt(room_area) : undefined,
    apartment_area: apartment_area ? parseInt(apartment_area) : undefined,
    apartment_rooms: apartment_rooms ? parseInt(apartment_rooms) : undefined,
    primary_photo_url: primary_photo,
    municipality_id: municipality,
    price: parseInt(price),
    ...rest,
  };

  return upsertData;
}

async function validateIsMine(advertisementId: string, userId: string) {
  const advertisement = await db.advertisements.findUnique({
    where: {
      id: advertisementId,
    },
  });

  if (!advertisement || advertisement.user_id !== userId) {
    throw new ActionError("alerts.add_advertisement.save.edit.error.title");
  }
}

async function handleEditPhotos(
  photos: File[],
  primary_photo: string,
  advertisementId: string,
  tx: TransactionalPrismaClient
) {
  const advertisementPhotos = await tx.advertisements_photos.findMany({
    where: {
      advertisement_id: advertisementId,
    },
  });

  const photosToDelete = advertisementPhotos.reduce((toDelete, photo) => {
    const fileName = getFileNameFromFullPath(photo.url);
    if (!photos.find((p) => p.name === fileName)) {
      toDelete.push({
        ...photo,
        url: trimBucketName(photo.url),
      });
    }
    return toDelete;
  }, [] as (typeof advertisementPhotos)[number][]);

  await fileService.deletePhotos(photosToDelete.map((photo) => photo.url));
  await tx.advertisements_photos.deleteMany({
    where: {
      id: {
        in: photosToDelete.map((photo) => photo.id),
      },
    },
  });

  const photosToUpload = photos.filter(
    (photo) => !advertisementPhotos.some((p) => p.url.includes(photo.name))
  );

  const result = await fileService.uploadPhotos(
    advertisementId,
    photosToUpload
  );

  const asciiPrimaryPhoto = getAsciiName(primary_photo);
  let primaryPhotoUrl =
    result.find((item) => item.data!.fullPath.includes(asciiPrimaryPhoto))
      ?.data!.fullPath ?? "";

  // if the primary photo was not not form the new photos, but it was in the existing photos
  if (!primaryPhotoUrl) {
    const existingPrimaryPhoto = advertisementPhotos.find((photo) =>
      photo.url.includes(asciiPrimaryPhoto)
    );
    if (existingPrimaryPhoto) {
      primaryPhotoUrl = existingPrimaryPhoto.url;
    }
  }

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

async function handleAddPhotos(
  photos: File[],
  primary_photo: string,
  advertisementId: string,
  tx: TransactionalPrismaClient
) {
  const asciiPrimaryPhoto = getAsciiName(primary_photo);
  const result = await fileService.uploadPhotos(advertisementId, photos);
  const primaryPhotoUrl =
    result.find((item) => item.data!.fullPath.includes(asciiPrimaryPhoto))
      ?.data!.fullPath ?? "";

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
