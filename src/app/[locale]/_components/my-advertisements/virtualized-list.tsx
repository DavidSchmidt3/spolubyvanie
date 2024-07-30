"use client";
import AdvertisementPreview from "@/app/[locale]/_components/home/advertisement-preview";
import { useWindowHeight } from "@/hooks/window-dimensions";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { FixedSizeList } from "react-window";

type Props = {
  myAdvertisements: Advertisement[];
};

export default function VirtualizedAdvertisementsList({
  myAdvertisements,
}: Props) {
  const height = useWindowHeight();

  return (
    <FixedSizeList
      width={"100%"}
      height={height}
      itemCount={myAdvertisements.length}
      itemSize={400}
    >
      {({ index }) => (
        <div className="mb-8 px-2">
          <AdvertisementPreview
            myAdvertisement
            key={myAdvertisements[index]?.id}
            advertisement={myAdvertisements[index]!}
          />
        </div>
      )}
    </FixedSizeList>
  );
}
