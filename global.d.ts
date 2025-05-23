import { type routing } from "@/i18n/routing";
import type enAlerts from "src/lib/utils/localization/en/alerts.json";
import type enMetadata from "src/lib/utils/localization/en/metadata.json";
import type enTranslations from "src/lib/utils/localization/en/translations.json";

export type Messages = typeof enAlerts &
  typeof enMetadata &
  typeof enTranslations;

declare global {
  // Use type-safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

type LeafKeys<T, P extends string = ""> = T extends object
  ? {
      [K in keyof T]: T[K] extends string
        ? `${P}${K}`
        : T[K] extends object
        ? LeafKeys<T[K], `${P}${K}.`>
        : never;
    }[keyof T]
  : "";

export type MessageKeys<T> = LeafKeys<T>;

type AllKeys<T, P extends string = ""> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${P}${K}` | AllKeys<T[K], `${P}${K}.`>
        : `${P}${K}`;
    }[keyof T]
  : never;

export type PathKeys<T> = AllKeys<T>;

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}
