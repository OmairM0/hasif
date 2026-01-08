"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return <div className="h-9 w-9" aria-hidden />;
  }

  return (
    <button
      className="cursor-pointer"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme !== "light" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;
