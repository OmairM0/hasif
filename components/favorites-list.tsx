"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { Star } from "lucide-react";
import WordCard from "./word-card";

export default function FavoritesList() {
  const { favorites } = useFavorites();
  if (favorites.length === 0) {
    return (
      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-2">
        <Star size={40} />
        <div className="text-center">
          <h4 className="text-lg font-semibold">لم تقم بحفظ أي كلمة بعد</h4>
          <p className="text-sm">
            احفظ الكلمات من تبويب{" "}
            <span className="font-semibold">كلمة اليوم</span> أو من قائمة
            <span className="font-semibold"> الكلمات</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-2 max-h-[75dvh] overflow-auto no-scrollbar">
      {favorites.map((word) => (
        <WordCard word={word} key={word.word} />
      ))}
    </div>
  );
}
