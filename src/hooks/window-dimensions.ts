import { useSyncExternalStore } from "react";

const heightStore = {
  height: undefined,
} as { height?: number };

const widthStore = {
  width: undefined,
} as { width?: number };

export const useWindowHeight = () => {
  const height = useSyncExternalStore(subscribeHeight, getHeightSnapshot);
  return height;
};

export const useWindowWidth = () => {
  const width = useSyncExternalStore(subscribeWidth, getWidthSnapshot);
  return width;
};

function getHeightSnapshot() {
  if (heightStore.height !== window.innerHeight) {
    heightStore.height = window.innerHeight;
  }
  return heightStore.height;
}

function getWidthSnapshot() {
  if (widthStore.width !== window.innerWidth) {
    widthStore.width = window.innerWidth;
  }
  return widthStore.width;
}

function subscribeHeight(callback: () => void) {
  const handleResize = () => {
    if (heightStore.height !== window.innerHeight) {
      callback();
    }
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}

function subscribeWidth(callback: () => void) {
  const handleResize = () => {
    if (widthStore.width !== window.innerWidth) {
      callback();
    }
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}

// If you still need a combined hook, you can create one like this:
export const useWindowDimensions = () => {
  const height = useWindowHeight();
  const width = useWindowWidth();
  return { height, width };
};
