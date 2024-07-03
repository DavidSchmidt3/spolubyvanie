import { MainNav } from "@/app/[locale]/_components/layouts/main-nav";
import UserNav from "@/app/[locale]/_components/layouts/user-nav";
import ThemeLocaleInitializer from "@/app/[locale]/_components/theme-locale-utils/fetcher";
import { ThemeProvider } from "@/app/[locale]/_components/theme-locale-utils/theme-provider";
import { Toaster } from "@/app/[locale]/_components/ui/toaster";
import { cn } from "@/lib/utils";
import { pickLocaleMessages } from "@/lib/utils/localization/helpers";
import "@/styles/globals.css";
import { Loader } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Spolubývanie",
  description: "Nájdi si spolubývajúcich",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning className="overflow-hidden">
      <body
        className={cn(
          "bg-background h-dvh font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider>
          <div className="flex flex-col h-full">
            <div className="fixed top-0 z-10 flex left-0 h-16 items-center w-full px-4 py-4 border-b bg-background">
              <MainNav className="mx-6" />
              <div className="flex items-center ml-auto space-x-4">
                <Suspense fallback={<Loader height={32} />}>
                  <UserNav />
                  <ThemeLocaleInitializer />
                </Suspense>
                <NextIntlClientProvider
                  messages={pickLocaleMessages(messages, ["alerts"])}
                >
                  <Toaster />
                </NextIntlClientProvider>
              </div>
            </div>
            <div className="flex-1 mt-16 overflow-y-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
