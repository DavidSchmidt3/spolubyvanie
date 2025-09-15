import { type AdvertisementFetchResult } from "@/lib/data/advertisement";
import { Inngest } from "inngest";

export type GeocodeRequestEvent = {
  name: "app/geocode.request";
  data: {
    advertisementId: string;
    street: AdvertisementFetchResult["street"];
    municipality: AdvertisementFetchResult["municipalities"]["name"];
    district: AdvertisementFetchResult["municipalities"]["districts"]["name"];
    region: AdvertisementFetchResult["municipalities"]["districts"]["regions"]["name"];
  };
};

export const inngest = new Inngest({ id: "roommate-portal" });
