"use client";
import ErrorAlert from "@/app/[locale]/_components/common/alerts/error";
import Loader from "@/app/[locale]/_components/common/loader";
import {
  DEFAULT_THEME,
  THEMES,
} from "@/app/[locale]/_components/theme-provider";
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
import { useControlledForm } from "@/hooks/form";
import { useSettingsQuery, useUpdateSettingsMutation } from "@/hooks/settings";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Language,
} from "@/lib/utils/localization/i18n";
import { type UserSettings } from "@/server/api/routers/user_settings";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as z from "zod";

const SETTINGS_FORM_SCHEMA = z.object({
  theme: z.enum(THEMES, {
    required_error: "settings.theme.validation.required",
  }),
  language: z.enum(LOCALES.map((language) => language.code) as [Language], {
    required_error: "settings.language.validation.required",
  }),
});

const DEFAULT: SettingsFormValues = {
  theme: DEFAULT_THEME,
  language: DEFAULT_LOCALE,
};

export type SettingsFormValues = z.infer<typeof SETTINGS_FORM_SCHEMA>;

type Props = {
  userQuery: UserSettings;
};

export default function SettingsForm({ userQuery }: Props) {
  // TODO: remove after this is fixed: https://github.com/react-hook-form/react-hook-form/issues/11910
  "use no memo";
  const t = useTranslations();
  const { data, isLoading } = useSettingsQuery();

  const defaultValues = useMemo<SettingsFormValues>(() => {
    return {
      language: data?.language ?? DEFAULT.language,
      theme: data?.theme ?? DEFAULT.theme,
    };
  }, [data]);

  const form = useControlledForm<SettingsFormValues>({
    schema: SETTINGS_FORM_SCHEMA,
    defaultValues,
  });

  // console.log(data, defaultValues, form.getValues());

  const {
    mutate: updateSettings,
    isError,
    isPending,
    error,
  } = useUpdateSettingsMutation();

  function onSubmit(data: SettingsFormValues) {
    updateSettings(data);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 sm:px-8 py-4 sm:py-8 w-full sm:w-auto sm:justify-center sm:flex sm:flex-col items-center">
      <div>{userQuery?.language}</div>
      {userQuery?.theme}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid space-y-3 sm:w-96 md:w-[40rem]"
        >
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t("settings.language.label")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("settings.language.select_prompt")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("settings.language.label")}</SelectLabel>
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
                <FormLabel>{t("settings.theme.label")}</FormLabel>
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
                      <div className="items-center p-1 border-2 rounded-md border-muted hover:border-accent">
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
                        {t("settings.theme.light.label")}
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
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
                        {t("settings.theme.dark.label")}
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin p" />
            )}
            {t("settings.save.button")}
          </Button>
        </form>
      </Form>
      {isError && (
        <ErrorAlert error={error} className="w-full sm:w-96 md:w-[40rem]" />
      )}
    </div>
  );
}
