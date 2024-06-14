"use client";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/[locale]/_components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/_components/ui/select";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { saveSettings } from "@/lib/utils/data/actions/settings";
import { SETTINGS_FORM_SCHEMA } from "@/lib/utils/data/actions/settings/schema";
import { type UserSettings } from "@/lib/utils/data/settings";
import { type User } from "@/lib/utils/data/user";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Language,
} from "@/lib/utils/localization/i18n";
import { usePathname, useRouter } from "@/lib/utils/localization/navigation";
import { DEFAULT_THEME, type Theme } from "@/lib/utils/theme/config";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { startTransition, useMemo } from "react";
import type * as z from "zod";

const DEFAULT: SettingsFormValues = {
  theme: DEFAULT_THEME,
  language: DEFAULT_LOCALE,
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
      language:
        userSettings?.language ??
        (params.locale as Language) ??
        DEFAULT.language,
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
      updateSettings();
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
    updateSettings();
  }

  function updateSettings() {
    startTransition(() => {
      toast({
        title: "alerts.settings.save.success.title",
        variant: "success",
      });

      const newTheme = form.getValues().theme;
      if (theme !== newTheme) {
        setTheme(newTheme);
      }

      const newLanguage = form.getValues().language;
      if (params.locale !== newLanguage) {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params },
          { locale: newLanguage }
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
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t("language.label")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("language.select_prompt")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("language.label")}</SelectLabel>
                      {LOCALES.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t("theme.label")}</FormLabel>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div className="items-center p-1 border-2 rounded-md border-muted hover:border-accent hover:cursor-pointer">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="p-2 space-y-2 bg-white rounded-md shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 font-normal text-center">
                        {t("theme.light.label")}
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground hover:cursor-pointer">
                        <div className="p-2 space-y-2 rounded-sm bg-slate-950">
                          <div className="p-2 space-y-2 rounded-md shadow-sm bg-slate-800">
                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
                            <div className="w-4 h-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
                            <div className="w-4 h-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 font-normal text-center">
                        {t("theme.dark.label")}
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button type="submit" variant="ringHover" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
            )}
            {t("save.button")}
          </Button>
        </form>
      </Form>
      {/* {isError && (
        <ErrorAlert error={error} className="w-full sm:w-96 md:w-[40rem]" />
      )} */}
    </div>
  );
}
