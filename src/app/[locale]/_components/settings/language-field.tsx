"use client";
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
import { type SettingsFormValues } from "./form";

type Props = {
  control: Control<SettingsFormValues>;
};

export default function LanguageField({ control }: Props) {
  const t = useTranslations("translations.settings");
  return (
    <FormField
      control={control}
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
  );
}
