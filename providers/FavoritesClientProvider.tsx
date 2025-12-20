"use client";

import { FavoritesProvider } from "@/contexts/FavoritesContext";

export function FavoritesClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
