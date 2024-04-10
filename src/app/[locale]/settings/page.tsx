import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/_components/ui/select";
import * as z from "zod";

import Loader from "@/app/[locale]/_components/common/loader";
import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/[locale]/_components/ui/radio-group";
import { useControlledForm } from "@/hooks/form";
import { useSettingsQuery, useUpdateSettingsMutation } from "@/hooks/settings";
import {
  DEFAULT_LNG,
  languages,
  type Language,
} from "@/utils/localization/i18n";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../common/alerts/error";
import { Icons } from "../icons";
import { themes } from "../theme-provider";

const SETTINGS_FORM_SCHEMA = z.object({
  theme: z.enum(themes, {
    required_error: "settings.theme.validation.required",
  }),
  language: z.enum(languages.map((language) => language.code) as [Language], {
    required_error: "settings.language.validation.required",
  }),
});

const DEFAULT: SettingsFormValues = {
  theme: "dark",
  language: DEFAULT_LNG,
};

export type SettingsFormValues = z.infer<typeof SETTINGS_FORM_SCHEMA>;

export default function SettingsForm() {
  const { t } = useTranslation();
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 grid">
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
                        placeholder={t("settings.langue.select_prompt")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("settings.language.label")}</SelectLabel>
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.label}
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
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        {t("settings.theme.light.label")}
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        {t("settings.theme.dark.label")}
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin p" />
            )}
            {t("settings.save.button")}
          </Button>
        </form>
      </Form>
      {isError && <ErrorAlert error={error} />}
    </>
  );
}
