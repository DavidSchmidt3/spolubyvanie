"use server";
import {
  ActionError,
  authActionClient,
} from "@/lib/data/actions/safe-action-client";
import {
  ADVERTISEMENT_UPSERT_SCHEMA,
  type AdvertisementUpsertFormValues,
} from "@/lib/data/actions/upsert-advertisement/schema";
import { AdType } from "@/lib/data/advertisements/types";
import { db, type TransactionalPrismaClient } from "@/lib/utils/prisma";
import {
  getFileNameFromFullPath,
  PHOTO_BUCKET,
  trimBucketName,
} from "@/lib/utils/supabase";
import { createClient } from "@/lib/utils/supabase/server";
import { formatZodErrors } from "@/lib/utils/zod";
import { type Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

const fileService = {
  uploadPhotos: async (
    advertisementId: string,
    photos: File[],
    userId: string
  ) => {
    const supabase = await createClient();
    const uploadPromises = photos.map(async (photo) => {
      const asciiOnlyName = getAsciiName(photo.name);
      const data = await supabase.storage
        .from(PHOTO_BUCKET)
        .upload(`${userId}/${advertisementId}/${asciiOnlyName}`, photo, {
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
    const supabase = await createClient();
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
        const upsertData = parseAdvertisementData(data, isEditing);
        const primary_photo = AdType.OfferingRoom ? data.primary_photo : "";

        if (isEditing) {
          const { id: advertisementId } = await tx.advertisements.update({
            where: {
              id: data.id,
            },
            data: {
              ...upsertData,
            },
          });
          await handleEditPhotos(
            data.photos,
            primary_photo,
            advertisementId,
            userId,
            tx
          );
        } else {
          const { id: advertisementId } = await tx.advertisements.create({
            data: {
              ...(upsertData as AdvertisementCreate),
              user_id: userId,
            },
          });
          await handleAddPhotos(
            data.photos,
            primary_photo,
            advertisementId,
            userId,
            tx
          );
        }

        revalidateTag("advertisements");
      });
    } catch (error) {
      console.error("Error upserting advertisement", error);
      throw new ActionError(
        "alerts.add_advertisement.save.database_error.title"
      );
    }
  });

type AdvertisementCreate = Prisma.advertisementsUncheckedCreateInput;
type AdvertisementUpdate = Prisma.advertisementsUncheckedUpdateInput;

function parseAdvertisementData(
  data: AdvertisementUpsertFormValues,
  isEditing: boolean
): AdvertisementCreate | AdvertisementUpdate {
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
    street,
    properties,
    ...rest
  } = data;
  const type = parseInt(advertisement_type) as AdType;

  if (type === AdType.OfferingRoom) {
    const propertiesData = properties
      ? {
          deleteMany: isEditing ? {} : undefined,
          create: Object.keys(properties)
            .filter((propertyId) => properties[propertyId])
            .map((propertyId) => ({
              properties: {
                connect: { id: propertyId },
              },
            })),
        }
      : undefined;

    return {
      type,
      floor: floor ? parseInt(floor) : undefined,
      max_floor: max_floor ? parseInt(max_floor) : undefined,
      room_area: room_area ? parseInt(room_area) : undefined,
      apartment_area: apartment_area ? parseInt(apartment_area) : undefined,
      apartment_rooms,
      street,
      primary_photo_url: primary_photo,
      advertisements_properties: propertiesData,
      municipality_id: municipality,
      price: parseInt(price),
      ...rest,
    };
  } else {
    return {
      type,
      primary_photo_url: primary_photo,
      municipality_id: municipality,
      price: parseInt(price),
      ...rest,
    };
  }
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
  userId: string,
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

  if (photosToDelete.length > 0) {
    await fileService.deletePhotos(photosToDelete.map((photo) => photo.url));
    await tx.advertisements_photos.deleteMany({
      where: {
        id: {
          in: photosToDelete.map((photo) => photo.id),
        },
      },
    });
  }

  const photosToUpload = photos.filter(
    (photo) => !advertisementPhotos.some((p) => p.url.includes(photo.name))
  );

  let primaryPhotoUrl = "";
  let result;
  const asciiPrimaryPhoto = getAsciiName(primary_photo);
  if (photosToUpload.length > 0) {
    result = await fileService.uploadPhotos(
      advertisementId,
      photosToUpload,
      userId
    );

    primaryPhotoUrl =
      result.find((item) => item.data!.fullPath.includes(asciiPrimaryPhoto))
        ?.data!.fullPath ?? "";
  }

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
        create: result?.map((item) => ({
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
  userId: string,
  tx: TransactionalPrismaClient
) {
  const asciiPrimaryPhoto = getAsciiName(primary_photo);
  const result = await fileService.uploadPhotos(
    advertisementId,
    photos,
    userId
  );
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
