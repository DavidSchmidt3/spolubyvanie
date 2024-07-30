"use client";
import AdvertisementPreview from "@/app/[locale]/_components/home/advertisement-preview";
import MeasuredItem from "@/app/[locale]/_components/my-advertisements/measured-item";
import { useWindowHeight } from "@/hooks/window-dimensions";
import { type Advertisement } from "@/lib/data/advertisements/format";
import { useCallback, useRef } from "react";
import { VariableSizeList } from "react-window";

type Props = {
  myAdvertisements: Advertisement[];
};

export const GUTTER_SIZE = 25;
export default function VirtualizedAdvertisementsList({
  myAdvertisements,
}: Props) {
  const height = useWindowHeight();
  const listRef = useRef<VariableSizeList>(null);
  const rowHeights = useRef<Record<number, number>>({});

  const getRowHeight = (index: number) => {
    return rowHeights.current[index] ?? 400;
  };

  const setRowHeight = useCallback((index: number, size: number) => {
    if (rowHeights.current[index] !== size) {
      rowHeights.current[index] = size;
      if (listRef.current) {
        listRef.current.resetAfterIndex(index);
      }
    }
  }, []);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div
      style={{
        ...style,
        top: (style.top as number) + GUTTER_SIZE,
        height: (style.height as number) - GUTTER_SIZE,
      }}
    >
      <MeasuredItem onResize={(height) => setRowHeight(index, height)}>
        <AdvertisementPreview
          myAdvertisement
          key={myAdvertisements[index]?.id}
          advertisement={myAdvertisements[index]!}
        />
      </MeasuredItem>
    </div>
  );

  return (
    <VariableSizeList
      height={height}
      itemCount={myAdvertisements.length}
      itemSize={getRowHeight}
      width={"100%"}
      ref={listRef}
    >
      {Row}
    </VariableSizeList>
  );
}
