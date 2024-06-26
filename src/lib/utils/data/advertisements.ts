export enum AdType {
  SearchingRoom = 1,
  OfferingRoom,
  SearchingApartment,
  OfferingApartment,
}

export const adTypeKeys = {
  [AdType.SearchingRoom]: "searching_room",
  [AdType.OfferingRoom]: "offering_room",
  [AdType.SearchingApartment]: "searching_apartment",
  [AdType.OfferingApartment]: "offering_apartment",
} as const;
