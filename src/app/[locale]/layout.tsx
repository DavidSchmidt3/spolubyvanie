import { MediaQueryProvider } from "@/app/[locale]/_components/providers/media-query-provider";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";

import { SidebarProvider } from "@/app/[locale]/_components/providers/sidebar-provider";
import { ThemeProvider } from "@/app/[locale]/_components/theme-locale-utils/theme-provider";
import { Toaster } from "@/app/[locale]/_components/ui/sonner";
import { getUser } from "@/lib/data/user";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/utils/localization/i18n";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { unstable_rootParams as getRootParams } from "next/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Spolubývanie",
  description: "Nájdi si spolubývajúcich",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const rootParams = await getRootParams();
  const locale = rootParams.locale as Locale;
  const userPromise = getUser();

  return (
    <html className="overflow-y-hidden" lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "bg-background h-dvh font-sans antialiased",
          inter.variable
        )}
      >
        <MediaQueryProvider>
          <ThemeProvider>
            {/* <Background /> */}
            <NextIntlClientProvider locale={locale}>
              <div className="flex flex-col h-full z-[1] relative">
                <SidebarProvider userPromise={userPromise}>
                  <div className={cn("flex-1 overflow-y-auto", "main-content")}>
                    {children}
                    <SpeedInsights />
                    <Analytics />
                    <Toaster
                      richColors
                      duration={20000}
                      toastOptions={{
                        style: {
                          zIndex: "1000 !important",
                        },
                      }}
                    />
                  </div>
                </SidebarProvider>
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </MediaQueryProvider>
      </body>
    </html>
  );
}
