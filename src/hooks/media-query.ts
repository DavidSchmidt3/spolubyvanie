import { useEffect, useState } from "react";
import { screens } from "tailwind.config";

export function useMediaQuery(query: keyof typeof screens) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(`(min-width: ${screens[query]})`);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
