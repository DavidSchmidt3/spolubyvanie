import {
  DEFAULT_LOCALE,
  LOCALE_PREFIX,
  LOCALES_CODES,
  pathnames,
} from "@/lib/utils/localization/i18n";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { type Database } from "./lib/utils/supabase/types/database";

const localizationMiddleWare = createMiddleware({
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES_CODES,
  localePrefix: LOCALE_PREFIX,
  pathnames,
});

export async function middleware(request: NextRequest) {
  const response = localizationMiddleWare(request);

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.cookies.set({ name, value, ...options });
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.cookies.set({ name, value: "", ...options });
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return localizationMiddleWare(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(sk|en)/:path*"],
};
