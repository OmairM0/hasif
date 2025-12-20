"use client";
import { createContext, useContext } from "react";
import { useFavoritesState } from "@/hooks/useFavorites";

type FavoritesContextType = ReturnType<typeof useFavoritesState>;

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const value = useFavoritesState();
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
