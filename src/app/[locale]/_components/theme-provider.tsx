"use client";

import ThemeInitializer from "@/app/[locale]/_components/theme-initializer";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const THEMES = ["dark", "light", "system"] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = "dark";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme="system"
      // storageKey="" TODO: after known domain, add theme.domain as storage key
    >
      <ThemeInitializer />
      {children}
    </NextThemesProvider>
  );
}
