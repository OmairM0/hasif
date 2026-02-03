import { Word } from "@/types/models/word";
import { useEffect, useState } from "react";

const STORAGE_KEY = "favoritesWords";

export function useFavoritesState() {
  const [favorites, setFavorites] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // load from localStorage (once)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch {
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setFavorites(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const addWord = (word: Word) => {
    setFavorites((prev) =>
      prev.some((w) => w.word === word.word) ? prev : [...prev, word],
    );
  };

  const removeWord = (wordName: string) => {
    setFavorites((prev) => prev.filter((w) => w.word !== wordName));
  };

  const isFavorite = (wordName: string): boolean => {
    return favorites.some((word) => word.word === wordName);
  };

  return { favorites, addWord, removeWord, isFavorite, isLoading };
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
