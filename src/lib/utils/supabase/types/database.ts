import { type Theme } from "@/app/[locale]/_components/theme-provider";
import { type Language } from "@/lib/utils/localization/i18n";
import { type MergeDeep } from "type-fest";
import { type Database as DatabaseGenerated } from "./database-generated";
export type { Json, Tables } from "./database-generated";

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        user_settings: {
          Row: {
            theme: Theme | null;
            language: Language | null;
          };
          Insert: {
            theme?: Theme | null;
            language?: Language | null;
          };
          Update: {
            theme?: Theme | null;
            language?: Language | null;
          };
        };
      };
    };
  }
>;
