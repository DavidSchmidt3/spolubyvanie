import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";

export async function getAdvertisement(id: string) {
  const advertisement = await fetchAdvertisement(id);
  if (advertisement) {
    return getFormattedAdvertisement(advertisement);
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
