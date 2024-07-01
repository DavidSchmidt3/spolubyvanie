import {
  DEFAULT_LOCALE,
  LOCALE_PREFIX,
  LOCALES_CODES,
  pathnames,
} from "@/lib/utils/localization/i18n";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
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

  const { data } = await supabase.auth.getUser();
  const pathnameWithoutLocale = request.nextUrl.pathname.replace(
    new RegExp(`^/(${LOCALES_CODES.join("|")})`),
    ""
  );

  const redirectLocale = response.headers.get(
    "x-middleware-request-x-next-intl-locale"
  );

  console.log("user 1", data.user?.email);
  // if user is already logged in, don't allow him to visit auth pages
  if (data.user && authPathnames.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(
      `${getBaseUrl()}://${process.env.VERCEL_URL}/${redirectLocale}`
    );
  }

  console.log("user 2", data.user?.email);
  // if user wants to change password, there must be a code in the url
  if (
    changePasswordPathnames.includes(pathnameWithoutLocale) &&
    !request.nextUrl.searchParams.get("code")
  ) {
    return NextResponse.redirect(
      `${getBaseUrl()}://${process.env.VERCEL_URL}/${redirectLocale}`
    );
  }

  console.log("user 3", data.user?.email);

  return localizationMiddleWare(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(sk|en)/:path*"],
};

const authPathnames = [
  ...Object.values(pathnames["/login"]),
  ...Object.values(pathnames["/register"]),
  ...Object.values(pathnames["/password-reset"]),
  ...Object.values(pathnames["/password-change"]),
] as string[];

const changePasswordPathnames = [
  ...Object.values(pathnames["/password-change"]),
] as string[];

export function getBaseUrl() {
  const protocol = process.env.VERCEL_ENV === "production" ? "https" : "http";
  return `${protocol}://${process.env.VERCEL_URL}`;
}
