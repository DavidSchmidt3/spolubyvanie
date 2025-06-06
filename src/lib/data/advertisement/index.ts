import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";
import { getAdvertisementFromCache } from "@/lib/utils/redis";
import {
  getFileNameFromFullPath,
  PHOTO_BUCKET,
  trimBucketName,
} from "@/lib/utils/supabase";
import { createClient } from "@/lib/utils/supabase/server";

export async function getAdvertisement(
  id: string,
  getIdsInsteadOfNames = false
) {
  const advertisement = await fetchAdvertisement(id);
  if (advertisement) {
    return getFormattedAdvertisement(advertisement, getIdsInsteadOfNames);
  }

  return null;
}

async function fetchAdvertisement(id: string) {
  return (
    (await getAdvertisementFromCache(id)) ??
    (await fetchAdvertisementFromDB(id))
  );
}

export type AdvertisementFetchResult = Exclude<
  Awaited<ReturnType<typeof fetchAdvertisementFromDB>>,
  undefined
>;
export async function fetchAdvertisementFromDB(id: string) {
  try {
    return await db.advertisements.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        municipalities: {
          include: {
            districts: {
              include: {
                regions: true,
              },
            },
          },
        },
        advertisements_photos: {
          select: {
            url: true,
          },
        },
        advertisements_properties: {
          select: {
            property_id: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAdvertisementPhotosFiles(photosUrls: string[]) {
  try {
    const supabase = await createClient();
    const photos = await Promise.all(
      photosUrls.map(async (photoUrl, idx) => {
        const fileName = getFileNameFromFullPath(photoUrl) ?? `photo-${idx}`;
        const fileType = fileName.split(".").pop();
        const fetchedPhoto = await supabase.storage
          .from(PHOTO_BUCKET)
          .download(trimBucketName(photoUrl));

        if (fetchedPhoto.data instanceof Blob) {
          const convertedFile = Buffer.from(
            await fetchedPhoto.data.arrayBuffer()
          );
          const base64Data = convertedFile.toString("base64");

          let mimeType;
          switch (fileType) {
            case "jpg":
            case "jpeg":
              mimeType = "image/jpeg";
              break;
            case "png":
              mimeType = "image/png";
              break;
            case "gif":
              mimeType = "image/gif";
              break;
            default:
              mimeType = "image/jpeg";
          }

          const dataUrl = `data:${mimeType};base64,${base64Data}`;
          return {
            fileName,
            bytes: dataUrl,
          };
        }
        console.error(
          "Error fetching photo or wrong photo type",
          fetchedPhoto.error
        );
        return null;
      })
    );
    return photos.filter((photo) => photo !== null);
  } catch (error) {
    console.error(error);
  }
}
