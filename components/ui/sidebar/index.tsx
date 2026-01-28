"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import SidebarContext, { useSidebar } from "./context";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "../button";

type SidebarProviderProps = {
  children: ReactNode;
  defaultOpen?: boolean;
};

function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggle: () => setOpen((v) => !v),
        close: () => setOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

type SidebarProps = {
  children: ReactNode;
  side?: "start" | "end";
  defaultOpen?: boolean;
  className?: string;
};

function Sidebar({ children, side = "start", className }: SidebarProps) {
  const { open } = useSidebar();

  return (
    <aside
      role="navigation"
      aria-label="Sidebar"
      data-side={side}
      data-state={open ? "open" : "closed"}
      className={cn(
        "h-screen bg-card border-e border-gray-300 sticky inset-block-start-0",
        "transition-[width] duration-300 ease-out overflow-hidden",
        open ? "w-64" : "w-0",
        className,
      )}
    >
      {children}
    </aside>
  );
}

function SidebarContent({ children }: { children: ReactNode }) {
  return <nav className="flex flex-col gap-2 p-2">{children}</nav>;
}

function SidebarList({ children }: { children: ReactNode }) {
  return (
    <ul className="flex flex-col gap-2" role="list">
      {children}
    </ul>
  );
}

function SidebarItem({ children }: { children: ReactNode }) {
  return (
    <li
      className="
      p-2
      rounded-md
      transition-colors
      hover:bg-muted
    "
    >
      {children}
    </li>
  );
}

type SidebarTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggle, open } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle sidebar"
      aria-expanded={open}
      onClick={toggle}
      className={cn(className)}
      {...props}
    >
      <span aria-hidden>
        <PanelLeftIcon size={18} />
      </span>
    </Button>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarItem,
  SidebarList,
  SidebarTrigger,
};
