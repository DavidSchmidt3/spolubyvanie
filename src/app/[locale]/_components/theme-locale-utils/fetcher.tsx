import { getSettings } from "@/lib/utils/data/settings";
import ThemeLocaleInitializer from "./initializer";

export default async function UserSettingsFetcher() {
  const settings = await getSettings();

  return <ThemeLocaleInitializer settings={settings} />;
}
