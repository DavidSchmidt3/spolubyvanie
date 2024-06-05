import { type SettingsFormValues } from "@/app/[locale]/_components/forms/settings-form";
import { useUserQuery } from "@/hooks/auth";
import { usePathname, useRouter } from "@/lib/utils/localization/navigation";
import { supabase } from "@/lib/utils/supabase/client";
import { DbApiError } from "@/lib/utils/supabase/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { DEFAULT_LOCALE } from "src/lib/utils/localization/i18n";

const SETTINGS_KEY = "user_settings";

export const useSettingsQuery = () => {
  const { data: user } = useUserQuery();
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { theme, setTheme } = useTheme();

  return useQuery({
    queryKey: [SETTINGS_KEY],
    queryFn: async () => {
      const { data: settings, error } = await supabase
        .from(SETTINGS_KEY)
        .select()
        .eq("id", user!.id)
        .maybeSingle();

      if (error) {
        throw new DbApiError(error);
      }

      if (!settings) {
        startTransition(() => {
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          router.replace({ pathname, params }, { locale: DEFAULT_LOCALE });
        });
        return null;
      }

      if (settings.language && settings.language !== params.locale) {
        startTransition(() => {
          // @ts-expect-error -- same as above
          router.replace({ pathname, params }, { locale: DEFAULT_LOCALE });
        });
      }

      if (settings.theme && theme !== settings.theme) {
        setTheme(settings.theme);
      }

      return settings;
    },
    enabled: Boolean(user),
  });
};

export const useUpdateSettingsMutation = () => {
  const { data: user } = useUserQuery();
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { theme, setTheme } = useTheme();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SettingsFormValues) => {
      if (theme !== data.theme) {
        setTheme(data.theme);
      }

      if (params.locale !== data.language) {
        startTransition(() => {
          console.log(data, pathname, params);
          // @ts-expect-error -- same as above
          router.replace({ pathname, params }, { locale: data.language });
        });
      }

      const { error } = await supabase
        .from(SETTINGS_KEY)
        .upsert({ ...data, id: user!.id });

      if (error) {
        throw new DbApiError(error);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [SETTINGS_KEY] });
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: [SETTINGS_KEY] });
    },
  });
};
