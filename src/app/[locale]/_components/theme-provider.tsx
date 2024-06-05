"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export type Theme = "dark" | "light" | "system";
export const THEMES = ["dark", "light", "system"] as const;
export const DEFAULT_THEME: Theme = "dark";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme="system"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
