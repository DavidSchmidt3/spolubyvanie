import { getFormattedAdvertisement } from "@/lib/data/advertisements/format";
import { db } from "@/lib/utils/prisma";
import "server-only";
import { getUser } from "../user";

export type MyAdvertisementsMeta = Awaited<
  ReturnType<typeof getMyAdvertisements>
>["paginationData"];
export async function getMyAdvertisements(page: string) {
  const parsedPage = parseInt(page);
  const user = await getUser();

  if (!user) {
    return {
      myAdvertisements: [],
      paginationData: null,
    };
  }

  try {
    const [myAdvertisements, paginationData] = await db.advertisements
      .paginate({
        where: {
          user_id: user.id,
        },
        orderBy: {
          updated_at: "desc",
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
