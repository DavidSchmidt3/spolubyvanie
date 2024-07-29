import { Icons } from "@/app/[locale]/_components/ui/icons";
import { memo, type MouseEventHandler } from "react";

type FullscreenButtonProps = {
  isFullscreen: boolean;
  onClick: MouseEventHandler<HTMLElement>;
};

export const FullscreenButton = memo(
  ({ isFullscreen, onClick }: FullscreenButtonProps) => {
    return (
      <button
        type="button"
        className="image-gallery-icon image-gallery-fullscreen-button"
        onClick={onClick}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Open Fullscreen"}
      >
        <Icons.fullScreen className="w-14 h-14" />
      </button>
    );
  }
);

FullscreenButton.displayName = "FullscreenButton";
