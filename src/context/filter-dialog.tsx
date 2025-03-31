import { createContext, useContext, useState, type ReactNode } from "react";

type ConfigTabState = "add" | "view";
type FilterDialogContextType = {
  configTabState: ConfigTabState;
  setConfigTabState: (state: ConfigTabState) => void;
  activeTab: (typeof TABS)[keyof typeof TABS];
  setActiveTab: (tab: (typeof TABS)[keyof typeof TABS]) => void;
};

export const TABS = {
  FILTER: "filter",
  CONFIG: "config",
} as const;

const FilterDialogContext = createContext<FilterDialogContextType | undefined>(
  undefined
);

export function FilterDialogProvider({ children }: { children: ReactNode }) {
  const [configTabState, setConfigTabState] = useState<ConfigTabState>("view");
  const [activeTab, setActiveTab] = useState<(typeof TABS)[keyof typeof TABS]>(
    TABS.FILTER
  );

  return (
    <FilterDialogContext.Provider
      value={{
        configTabState,
        setConfigTabState,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </FilterDialogContext.Provider>
  );
}

export function useFilterDialog() {
  const context = useContext(FilterDialogContext);
  if (context === undefined) {
    throw new Error(
      "useFilterDialog must be used within a FilterDialogProvider"
    );
  }
  return context;
}
