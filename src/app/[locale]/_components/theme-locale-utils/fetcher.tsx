import ThemeLocaleInitializer from "@/app/[locale]/_components/theme-locale-utils/initializer";
import { getSettings } from "@/lib/data/settings";

export default async function UserSettingsFetcher() {
  const settings = await getSettings();

  return <ThemeLocaleInitializer settings={settings} />;
}
