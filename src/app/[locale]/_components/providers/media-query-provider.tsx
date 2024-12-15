"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { screens } from "tailwind.config";

const MediaQueryContext = createContext(false);

export function MediaQueryProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(`(min-width: ${screens.md})`);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, []);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}

export const useMediaQueryContext = () => {
  const context = useContext(MediaQueryContext);

  if (context === null) {
    throw new Error(
      "useSplitContext must be used within a SplitContextProvider"
    );
  }

  return context;
};
