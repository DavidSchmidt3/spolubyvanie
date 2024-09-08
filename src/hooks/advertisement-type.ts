import { AdType } from "@/lib/data/advertisements/types";

export const useAdvertisementType = (advertisementType?: string) => {
  const parsedAdvertisementType = parseInt(advertisementType ?? "0") as AdType;
  const isOffering = parsedAdvertisementType === AdType.OfferingRoom;

  return isOffering;
};
