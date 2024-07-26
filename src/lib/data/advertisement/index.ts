import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";

export async function getAdvertisement(id: string) {
  const advertisement = await db.advertisements.findUnique({
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
    },
  });

  if (advertisement) {
    return getFormattedAdvertisement(advertisement);
  }

  return null;
}
