import SuppressLogs from "@/app/[locale]/_components/common/suppress-logs";
import { MainNav } from "@/app/[locale]/_components/layouts/main-nav";
import { UserNav } from "@/app/[locale]/_components/layouts/user-nav";
import { ThemeProvider } from "@/app/[locale]/_components/theme-provider";
import { Toaster } from "@/app/[locale]/_components/ui/toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Spolubývanie",
  description: "Nájdi si spolubývajúcich",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider>
            <div className="sticky top-0 z-20 flex items-center w-full px-4 py-4 border-b min bg-background min-h-20">
              <MainNav className="mx-6" />
              <div className="flex items-center ml-auto space-x-4">
                <UserNav />
                {/* // TODO: - delete when https://github.com/radix-ui/primitives/pull/2811 gets merged  */}
                <SuppressLogs />
                <Toaster />
              </div>
            </div>
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
