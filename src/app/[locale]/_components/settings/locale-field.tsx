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
import { type SettingsFormValues } from "@/lib/data/actions/settings/schema";
import { LOCALES } from "@/lib/utils/localization/i18n";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
          <FormLabel className="text-base">{t("locale.label")}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger
                aria-label={t("locale.select_prompt")}
                className="text-base"
              >
                <SelectValue placeholder={t("locale.select_prompt")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-base">
                  {t("locale.label")}
                </SelectLabel>
                {LOCALES.map((locale) => (
                  <SelectItem
                    className="text-base"
                    key={locale.code}
                    value={locale.code}
                  >
                    <div className="flex gap-x-3">
                      <Image
                        src={locale.flagPath}
                        alt={locale.name}
                        width={20}
                        height={20}
                      />
                      {locale.name}
                    </div>
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
