import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";

export async function getMyAdvertisements(userId: string) {
  try {
    const advertisements = await db.advertisements.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
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

    return advertisements.map((advertisement) =>
      getFormattedAdvertisement(advertisement)
    );
  } catch (error) {
    console.error("Error fetching my advertisements", error);
    return [];
  }
}
