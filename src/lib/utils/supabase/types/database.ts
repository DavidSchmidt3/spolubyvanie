import { type Locale } from "@/lib/utils/localization/i18n";
import { type Theme } from "@/lib/utils/theme/config";
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
            theme: Theme;
            locale: Locale;
          };
          Insert: {
            theme?: Theme;
            locale?: Locale;
          };
          Update: {
            theme?: Theme;
            locale?: Locale;
          };
        };
      };
    };
  }
>;
