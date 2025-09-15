import { db } from "@/lib/utils/prisma";
import { geocodeAddress } from "../geocode";
import { inngest } from "./client";

export const geocodeAd = inngest.createFunction(
  {
    id: "geocode-advertisement-address",
    throttle: {
      limit: 1,
      period: "1s",
    },
  },
  { event: "app/geocode.request" },
  async ({ event, step }) => {
    const { advertisementId, street, municipality, district, region } =
      event.data;

    const coords = await step.run("geocode-the-address", async () => {
      return await geocodeAddress({
        street,
        municipality,
        district,
        region,
      });
    });

    if (coords) {
      // TODO: check projection 4326
      await step.run("update-ad-with-location", async () => {
        await db.$executeRaw`
          UPDATE "public"."advertisements"
          SET
            location = ST_SetSRID(ST_MakePoint(${coords.lng}, ${coords.lat}), 4326), 
            "geocoding_status" = 'COMPLETED'
          WHERE id = ${advertisementId}::uuid
        `;
      });
      return { status: "success", adId: advertisementId, coords };
    } else {
      await step.run("mark-ad-as-failed", async () => {
        await db.advertisements.update({
          where: { id: advertisementId },
          data: { geocoding_status: "FAILED" },
        });
      });
      return { status: "failed", message: "Geocoding returned no results" };
    }
  }
);
