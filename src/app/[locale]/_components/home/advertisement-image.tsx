"use client";

import { AdType } from "@/lib/data/advertisements/types";
import { getImageFullUrl } from "@/lib/utils/supabase";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  primary_photo_url: string | null;
  type: AdType;
};

export default function AdvertisementImage({ primary_photo_url, type }: Props) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // need to cause a re-render to get the correct theme on client and prevent hydration error and wrong image being displayed
  useEffect(() => {
    setMounted(true);
  }, []);

  function getImageUrl() {
    if (type === AdType.SearchingRoom) {
      // Use 'light' as default theme for server-side rendering
      const currentTheme = mounted ? theme : "light";
      return currentTheme === "dark"
        ? "/placeholder_dark.webp"
        : "/placeholder_light.webp";
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
