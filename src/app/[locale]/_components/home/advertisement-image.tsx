"use client";

import { AdType } from "@/lib/data/advertisements/types";
import { getImageFullUrl } from "@/lib/utils/supabase";
import { useTheme } from "next-themes";
import Image from "next/image";

type Props = {
  primary_photo_url: string | null;
  type: AdType;
};

export default function AdvertisementImage({ primary_photo_url, type }: Props) {
  const { theme } = useTheme();
  function getImageUrl() {
    if (type === AdType.SearchingRoom) {
      if (theme === "dark") return "/placeholder_dark.webp";
      return "/placeholder_light.webp";
    }

    if (primary_photo_url) return getImageFullUrl(primary_photo_url);
    return "/room.webp";
  }

  return (
    <Image
      src={getImageUrl()}
      alt="Advertisement"
      width={1440}
      height={1080}
      className="rounded-sm w-full max-w-80 xl:max-w-96"
    />
  );
}
