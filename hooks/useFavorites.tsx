import { IWord } from "@/interfaces";
import { useEffect, useState } from "react";

const STORAGE_KEY = "favoritesWords";

export function useFavoritesState() {
  const [favorites, setFavorites] = useState<IWord[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setFavorites(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const addWord = (word: IWord) => {
    setFavorites((prev) =>
      prev.some((w) => w.word === word.word) ? prev : [...prev, word]
    );
  };

  const removeWord = (wordName: string) => {
    setFavorites((prev) => prev.filter((w) => w.word !== wordName));
  };

  const isFavorite = (wordName: string): boolean => {
    return favorites.some((word) => word.word === wordName);
  };

  return { favorites, addWord, removeWord, isFavorite };
}

/**
 * TODO — useFavoritesState Hook Improvements
 *
 * - [ ] Add toggleFavorite(word) helper
 * - [ ] Use stable identifier (id) instead of word string comparison
 * - [ ] Add safe JSON parsing (try/catch fallback)
 * - [ ] Prevent unnecessary localStorage writes (deep equality / debounce)
 * - [ ] Memoize isFavorite (useCallback or Set)
 * - [ ] Extract persistence logic into reusable helper
 * - [ ] Support initial value injection (for testing)
 * - [ ] Add optional max favorites limit
 * - [ ] Add versioning for stored data (migration-ready)
 * - [ ] Add unit tests for hook logic
 */
