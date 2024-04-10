import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from "@/lib/utils/localization/i18n";
import { updateSession } from "@/lib/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const localizationMiddleWare = createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

export async function middleware(request: NextRequest) {
  if (supabaseRoutes.includes(request.nextUrl.pathname)) {
    await updateSession(request);
  }
  return localizationMiddleWare(request);
}

const supabaseRoutes = ["settings"] as string[];

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(sk|en)/:path*"],
};
