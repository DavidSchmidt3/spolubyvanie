import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";
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

export type AdvertisementFetchResult = Exclude<
  Awaited<ReturnType<typeof fetchAdvertisement>>,
  undefined
>;
export async function fetchAdvertisement(id: string) {
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
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAdvertisementPhotosFiles(photosUrls: string[]) {
  const supabase = createClient();
  try {
    const photos = await Promise.all(
      photosUrls.map(async (photoUrl, idx) => {
        const fileName = getFileNameFromFullPath(photoUrl) ?? `photo-${idx}`;
        const fileType = fileName.split(".").pop();
        const fetchedPhoto = await supabase.storage
          .from(PHOTO_BUCKET)
          .download(trimBucketName(photoUrl), {
            transform: {
              format: "origin",
            },
          });

        console.log("fetchedPhoto", fetchedPhoto, fileName, fileType);
        console.log(supabase);
        console.log(fetchedPhoto.data);
        console.log(fetchedPhoto.data instanceof Blob);

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
        return null;
      })
    );
    console.log("photos", photos);
    return photos.filter((photo) => photo !== null);
  } catch (error) {
    console.error(error);
  }
}
