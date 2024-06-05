import SuppressLogs from "@/app/[locale]/_components/common/suppress-logs";
import { MainNav } from "@/app/[locale]/_components/layouts/main-nav";
import { UserNav } from "@/app/[locale]/_components/layouts/user-nav";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";

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
            <div className="flex items-center px-4 min bg-background py-4 min-h-20 border-b w-full sticky top-0 z-20">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
                {/* // TODO: - delete when https://github.com/radix-ui/primitives/pull/2811 gets merged  */}
                <SuppressLogs />
              </div>
            </div>
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
