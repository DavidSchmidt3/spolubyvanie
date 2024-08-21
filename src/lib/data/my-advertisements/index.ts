import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";

export type MyAdvertisementsMeta = Awaited<
  ReturnType<typeof getMyAdvertisements>
>["paginationData"];
export async function getMyAdvertisements(userId: string, page: string) {
  const parsedPage = parseInt(page);
  try {
    const [myAdvertisements, paginationData] = await db.advertisements
      .paginate({
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
          advertisements_photos: {
            select: {
              url: true,
            },
          },
        },
      })
      .withPages({
        page: isNaN(parsedPage) ? 1 : parsedPage,
        limit: 10,
      });

    return {
      myAdvertisements: myAdvertisements.map((advertisement) =>
        getFormattedAdvertisement(advertisement)
      ),
      paginationData,
    };
  } catch (error) {
    console.error("Error fetching my advertisements", error);
    return {
      myAdvertisements: [],
      paginationData: null,
    };
  }
}
