import { AdType } from "@/lib/data/advertisements/types";

export const useAdvertisementType = (advertisementType: string) => {
  const parsedAdvertisementType = parseInt(advertisementType) as AdType;
  const isOffering = parsedAdvertisementType === AdType.OfferingRoom;

  return isOffering;
};
