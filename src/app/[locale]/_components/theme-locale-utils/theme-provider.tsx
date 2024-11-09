"use client";

import { DEFAULT_THEME } from "@/lib/utils/theme/config";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <Suspense fallback={null}>
      <NextThemesProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
        defaultTheme={DEFAULT_THEME}
        storageKey={`theme.${process.env.NEXT_PUBLIC_VERCEL_URL}`}
      >
        {children}
      </NextThemesProvider>
    </Suspense>
  );
}
