export enum AdType {
  SearchingRoom = 1,
  OfferingRoom,
}

export const adTypeKeys = {
  [AdType.SearchingRoom]: "searching_room",
  [AdType.OfferingRoom]: "offering_room",
} as const;

export const createAdTypeRegex = (isRequired = false): RegExp => {
  const adTypeValues = Object.values(AdType).filter(
    (value) => typeof value === "number"
  );

  const adTypePattern = adTypeValues.join("|");
  return new RegExp(`^(${adTypePattern})${isRequired ? "" : "?"}$`);
};
