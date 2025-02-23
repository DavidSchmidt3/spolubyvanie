import { type Theme } from "./config";

interface BackgroundGradient {
  overlayGradient: string;
  dotColor: string;
}

type ThemeBackgrounds = {
  [key in Exclude<Theme, "system">]: BackgroundGradient;
};

export const themeBackgrounds: ThemeBackgrounds = {
  dark: {
    overlayGradient: `
      linear-gradient(
        to bottom,
        #050505,
        transparent 40%,
        transparent 60%,
        #050505
      )
    `,
    dotColor: "#ffffff50",
  },
  light: {
    overlayGradient: `
      linear-gradient(
        to bottom,
        #ffffff,
        transparent 40%,
        transparent 60%,
        #ffffff
      )
    `,
    dotColor: "#00000025",
  },
};
