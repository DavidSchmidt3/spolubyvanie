"use client";
import { FullscreenButton } from "@/app/[locale]/_components/advertisement/image-gallery/fullscreen-button";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { getImageFullUrl } from "@/lib/utils/supabase";
import ImageGalleryPrimitive from "react-image-gallery";

type Props = {
  photoUrls: { url: string }[];
  primaryPhotoUrl: string | null;
};

export default function ImageGallery({ photoUrls, primaryPhotoUrl }: Props) {
  return (
    <ImageGalleryPrimitive
      autoPlay={false}
      showPlayButton={false}
      slideDuration={200}
      items={photoUrls
        .toSorted((a, b) => {
          if (a.url === primaryPhotoUrl) {
            return -1;
          }
          if (b.url === primaryPhotoUrl) {
            return 1;
          }
          return 0;
        })
        .map((photo, idx) => {
          const imageFullUrl = getImageFullUrl(photo.url);
          return {
            loading: idx === 0 ? ("eager" as const) : ("lazy" as const),
            original: imageFullUrl,
            originalWidth: 140,
            thumbnailHeight: 60,
            thumbnailWidth: 80,
            originalHeight: 108,
            thumbnail: imageFullUrl,
          };
        })}
      renderLeftNav={(onClick, disabled) => (
        <Button
          type="button"
          variant="ghost"
          className="image-gallery-icon image-gallery-left-nav hover:bg-transparent hover:text-primary"
          disabled={disabled}
          onClick={onClick}
        >
          <Icons.arrowLeft className="w-14 h-14" />
        </Button>
      )}
      renderRightNav={(onClick, disabled) => (
        <Button
          type="button"
          variant="ghost"
          className="image-gallery-icon image-gallery-right-nav hover:bg-transparent hover:text-primary"
          disabled={disabled}
          onClick={onClick}
        >
          <Icons.arrowRight className="w-14 h-14" />
        </Button>
      )}
      renderFullscreenButton={(onClick, isFullScreen) => (
        <FullscreenButton onClick={onClick} isFullscreen={isFullScreen} />
      )}
    />
  );
}
