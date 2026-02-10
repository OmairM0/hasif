import { render } from "@testing-library/react";
import { FavoritesProvider } from "@/contexts/favorites-context";

export function renderWithProviders(ui: React.ReactElement) {
  return render(<FavoritesProvider>{ui}</FavoritesProvider>);
}
