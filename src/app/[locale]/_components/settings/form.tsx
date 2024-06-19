"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import { Form } from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { saveSettings } from "@/lib/utils/data/actions/settings";
import { SETTINGS_FORM_SCHEMA } from "@/lib/utils/data/actions/settings/schema";
import { type UserSettings } from "@/lib/utils/data/settings";
import { type User } from "@/lib/utils/data/user";
import { DEFAULT_LOCALE, type Locale } from "@/lib/utils/localization/i18n";
import { usePathname, useRouter } from "@/lib/utils/localization/navigation";
import { DEFAULT_THEME, type Theme } from "@/lib/utils/theme/config";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { startTransition, useMemo } from "react";
import type * as z from "zod";
import LocaleField from "./locale-field";
import ThemeField from "./theme-field";

const DEFAULT: SettingsFormValues = {
  theme: DEFAULT_THEME,
  locale: DEFAULT_LOCALE,
};

export type SettingsFormValues = z.infer<typeof SETTINGS_FORM_SCHEMA>;

type Props = {
  userSettings: UserSettings | null;
  user: User;
};

export default function SettingsForm({ userSettings, user }: Props) {
  const t = useTranslations("translations.settings");
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const params = useParams();

  const defaultValues = useMemo<SettingsFormValues>(() => {
    return {
      locale:
        userSettings?.locale ?? (params.locale as Locale) ?? DEFAULT.locale,
      theme: userSettings?.theme ?? (theme as Theme) ?? DEFAULT.theme,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to initialize only once after load, userData will be fetched on the server and available here if user has any
  }, []);

  const form = useControlledForm<SettingsFormValues>({
    schema: SETTINGS_FORM_SCHEMA,
    defaultValues,
  });

  async function onSubmit(data: SettingsFormValues) {
    if (!user) {
      updateSettings(form.getValues().theme, form.getValues().locale);
      return;
    }

    // call server action only when user is authenticated so we can save settings in DB
    const response = await saveSettings(data);
    if (response.isError) {
      toast({
        title: "alerts.settings.save.error.title",
        description: response.error,
        variant: "destructive",
      });
      return;
    }
    updateSettings(response.data?.theme, response.data?.locale);
  }

  function updateSettings(newTheme?: Theme, newLocale?: Locale) {
    startTransition(() => {
      toast({
        title: "alerts.settings.save.success.title",
        variant: "success",
      });

      if (newTheme && theme !== newTheme) {
        setTheme(newTheme);
      }

      if (newLocale && params.locale !== newLocale) {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: newLocale }
        );
      }
    });
  }

  const isPending = form.formState.isSubmitting;

  return (
    <div className="items-center w-full px-4 py-4 sm:px-8 sm:py-8 sm:w-auto sm:justify-center sm:flex sm:flex-col">
      <h1 className="text-3xl">{t("title")}</h1>
      <Form {...form}>
        <form
          className="grid space-y-3 sm:w-96 md:w-[40rem] mt-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <LocaleField control={form.control} />
          <ThemeField control={form.control} />
          <Button type="submit" variant="ringHover" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
            )}
            {t("save.button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
