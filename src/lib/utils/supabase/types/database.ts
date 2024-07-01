import { type Locale } from "@/lib/utils/localization/i18n";
import { type Database as DatabaseGenerated } from "@/lib/utils/supabase/types/database-generated";
import { type Theme } from "@/lib/utils/theme/config";
import { type MergeDeep } from "type-fest";
export type {
  Json,
  Tables,
} from "@/lib/utils/supabase/types/database-generated";

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
