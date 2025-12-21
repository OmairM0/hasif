"use client";

import Button from "./ui/button";
import { Shuffle, Star, StarOff } from "lucide-react";
import MainCard from "./main-card";
import Spinner from "./ui/spinner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useTodayWord } from "@/hooks/useTodayWord";

export default function TodayWord() {
  const { todayWord, isLoading, refreshWord } = useTodayWord();
  const { addWord, removeWord, isFavorite } = useFavorites();

  return (
    <div className="mt-4">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">كلمة اليوم</h2>
          <MainCard word={todayWord!} />
          <div className="mt-2 space-y-2">
            <Button
              icon={<Shuffle size={20} />}
              className="w-full rounded-3xl"
              onClick={async () => {
                refreshWord();
              }}
            >
              كلمة عشوائية
            </Button>

            {isFavorite(todayWord!.word) ? (
              <Button
                variant="secondary"
                icon={<StarOff size={20} />}
                className="w-full rounded-3xl"
                onClick={() => removeWord(todayWord!.word)}
              >
                حذف من المفضلة
              </Button>
            ) : (
              <Button
                variant="secondary"
                icon={<Star size={20} />}
                className="w-full rounded-3xl"
                onClick={() => addWord(todayWord!)}
              >
                إضافة للمفضلة
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
