import { createContext, useContext } from "react";

type SidebarContextType = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within <Sidebar />");
  }
  return ctx;
}

export default SidebarContext;
