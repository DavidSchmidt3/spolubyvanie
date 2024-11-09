import { MainNav } from "@/app/[locale]/_components/layouts/main-nav";
import MainNavLoader from "@/app/[locale]/_components/layouts/main-nav-loader";
import UserNav from "@/app/[locale]/_components/layouts/user-nav";
import NextIntlClientProvider from "@/app/[locale]/_components/providers/next-intl-provider";
import ThemeLocaleInitializer from "@/app/[locale]/_components/theme-locale-utils/fetcher";
import { ThemeProvider } from "@/app/[locale]/_components/theme-locale-utils/theme-provider";
import { Toaster } from "@/app/[locale]/_components/ui/sonner";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/utils/localization/i18n";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Loader } from "lucide-react";
import { Inter } from "next/font/google";
import { Suspense } from "react";

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
  params: Promise<{ locale: Locale }>;
};
export default function RootLayout({ children, params }: Props) {
  return (
    // TODO: when this is fixed https://github.com/vercel/next.js/discussions/71927
    <html className="overflow-y-hidden" suppressHydrationWarning lang="sk">
      <body
        className={cn(
          "bg-background h-dvh font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider>
          <div className="flex flex-col h-full">
            <div className="fixed top-0 left-0 z-10 flex items-center w-full h-16 py-4 pl-5 pr-2 border-b sm:px-4 bg-background">
              <Suspense fallback={<MainNavLoader />}>
                <MainNav />
              </Suspense>
              <div className="flex items-center ml-auto sm:space-x-4">
                <Suspense fallback={<Loader height={32} />}>
                  <UserNav params={params} />
                  <ThemeLocaleInitializer />
                </Suspense>
                <NextIntlClientProvider messages={["alerts"]}>
                  <Toaster richColors />
                </NextIntlClientProvider>
              </div>
            </div>
            <div className="flex-1 mt-16 overflow-y-auto">
              {children}
              <SpeedInsights />
              <Analytics />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
