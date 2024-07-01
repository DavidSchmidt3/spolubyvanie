"use client";
import { type SettingsFormValues } from "@/app/[locale]/_components/settings/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/_components/ui/select";
import { LOCALES } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<SettingsFormValues>;
};

export default function LocaleField({ control }: Props) {
  const t = useTranslations("translations.settings");
  return (
    <FormField
      control={control}
      name="locale"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{t("locale.label")}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger aria-label={t("locale.select_prompt")}>
                <SelectValue placeholder={t("locale.select_prompt")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("locale.label")}</SelectLabel>
                {LOCALES.map((locale) => (
                  <SelectItem key={locale.code} value={locale.code}>
                    {locale.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
