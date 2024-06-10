"use client";
import { useTheme } from "next-themes";

export default function ThemeInitializer() {
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   if (!theme || (settings?.theme && theme !== settings.theme)) {
  //     setTheme(settings?.theme ?? DEFAULT_THEME);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [settings]);

  return null;
}
