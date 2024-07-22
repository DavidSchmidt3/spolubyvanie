"use client";
import {
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
import { type SettingsFormValues } from "@/lib/data/actions/settings/schema";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

type Props = {
  control: Control<SettingsFormValues>;
};

export default function ThemeField({ control }: Props) {
  const t = useTranslations("translations.settings");
  return (
    <FormField
      control={control}
      name="theme"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-base">{t("theme.label")}</FormLabel>
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
                <span className="block w-full p-2 font-normal text-center text-base">
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
                <span className="block w-full p-2 font-normal text-center text-base">
                  {t("theme.dark.label")}
                </span>
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormItem>
      )}
    />
  );
}
