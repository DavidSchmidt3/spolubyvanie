"use client";

import { type getSettings } from "@/lib/utils/data/settings";
import { usePathname, useRouter } from "@/lib/utils/localization/navigation";
import { DEFAULT_THEME } from "@/lib/utils/theme/config";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { startTransition, useEffect } from "react";

type Props = {
  settings: Awaited<ReturnType<typeof getSettings>>;
};

export default function ThemeLocaleInitializer({ settings }: Props) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    if (settings?.theme && theme !== settings.theme) {
      startTransition(() => {
        setTheme(settings?.theme ?? DEFAULT_THEME);
      });
    }
    if (settings?.locale && params.locale !== settings.locale) {
      startTransition(() => {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: settings.locale }
        );
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);
  return null;
}
