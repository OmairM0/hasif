"use client";

import { FavoritesProvider } from "@/contexts/favorites-context";

export function FavoritesClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
