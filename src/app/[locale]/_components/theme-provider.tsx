"use client";

import ThemeInitializer from "@/app/[locale]/_components/theme-initializer";
import { DEFAULT_THEME } from "@/lib/utils/theme/config";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme={DEFAULT_THEME}
      // storageKey="" TODO: after known domain, add theme.domain as storage key
    >
      <ThemeInitializer />
      {children}
    </NextThemesProvider>
  );
}
