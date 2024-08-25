"use client";

import { type Advertisement } from "@/lib/data/advertisements/format";
import { getImageFullUrl } from "@/lib/utils/supabase";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageModalGallery from "./image-modal-gallery";

type Props = {
  advertisement: Advertisement;
};

export default function AdvertisementImage({ advertisement }: Props) {
  const { advertisement_photos, primary_photo_url } = advertisement;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // need to cause a re-render to get the correct theme on client and prevent hydration error and wrong image being displayed
  useEffect(() => {
    setMounted(true);
  }, []);

  function getImageUrl() {
    if (primary_photo_url) return getImageFullUrl(primary_photo_url);

    // Use 'light' as default theme for server-side rendering
    const currentTheme = mounted ? theme : "light";
    return currentTheme === "dark"
      ? "/placeholder_dark.webp"
      : "/placeholder_light.webp";
  }

  function handleModalGalleryOpen() {
    if (!advertisement_photos?.length) return;
    setDialogOpen((dialogOpen) => !dialogOpen);
  }

  return (
    <>
      {advertisement_photos?.length ? (
        <ImageModalGallery
          advertisement={advertisement}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      ) : null}
      <Image
        src={getImageUrl()}
        alt="Advertisement"
        onClick={handleModalGalleryOpen}
        width={1440}
        height={1080}
        className={`rounded-sm w-full max-w-80 xl:max-w-96 ${
          advertisement_photos?.length ? "hover:cursor-pointer" : ""
        }`}
      />
    </>
  );
}
