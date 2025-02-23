"use client";
import { themeBackgrounds } from "@/lib/utils/theme/background-config";
import { type Theme } from "@/lib/utils/theme/config";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div></div>;
  }

  const currentTheme =
    ((theme === "system" ? systemTheme : theme) as Exclude<Theme, "system">) ||
    "dark";

  const backgroundConfig = themeBackgrounds[currentTheme];

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-background transition-colors duration-300"
      style={{
        backgroundImage: `
          ${backgroundConfig.overlayGradient},
          radial-gradient(circle at center, ${backgroundConfig.dotColor} 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 50px 50px",
      }}
    />
  );
}
