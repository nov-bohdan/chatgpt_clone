"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  sidebarHidden: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  return (
    <SidebarContext.Provider value={{ sidebarHidden, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar muse be used within a SidebarProvider");
  }

  return context;
}
