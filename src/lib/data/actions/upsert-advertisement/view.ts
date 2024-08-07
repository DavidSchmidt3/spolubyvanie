import { db } from "@/lib/utils/prisma";
import "server-only";

export async function addAdvertisementView(id: string) {
  await db.advertisements.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
