"use client";

import { fetchRandomWord } from "@/lib/utils";
import Button from "./ui/button";
import { Shuffle, Star, StarOff } from "lucide-react";
import MainCard from "./main-card";
import { IWord } from "@/interfaces";
import { useEffect, useState } from "react";
import Spinner from "./ui/spinner";
import { useFavorites } from "@/contexts/FavoritesContext";

const exampleWord: IWord = {
  word: "سجية",
  diacritic: "سَجِيّة",
  meaning: "طبيعة النفس وخلقها الأصيل.",
  explanation: "تقال لما يكون طبعًا ثابتًا في الشخص.",
  example: "الصدقُ سَجيّةٌ كريمة.",
  category: "صفات",
  rarity: 4,
};

export default function TodayWord() {
  const [todayWord, setTodayWord] = useState<IWord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addWord, removeWord, isFavorite } = useFavorites();

  useEffect(() => {
    const loadTodayWord = async () => {
      const stored = localStorage.getItem("todayWord");
      if (stored) {
        const { word, date } = JSON.parse(stored);
        const today = new Date().toDateString();

        if (date === today) {
          setTodayWord(word);
          setIsLoading(false);
          return;
        }
      }
      try {
        const word = await fetchRandomWord();
        setTodayWord(word);
        saveTodayWordToLocalStorage(word);
      } catch {
        setTodayWord(exampleWord);
        saveTodayWordToLocalStorage(exampleWord);
      }
      setIsLoading(false);
    };
    const saveTodayWordToLocalStorage = (word: IWord) => {
      const data = {
        word,
        date: new Date().toDateString(),
      };
      localStorage.setItem("todayWord", JSON.stringify(data));
    };
    loadTodayWord();
  }, []);

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
                const randomWord = await fetchRandomWord();
                setTodayWord(randomWord);
                // const data = {
                //   word: randomWord,
                //   date: new Date().toDateString(),
                // };
                // localStorage.setItem("todayWord", JSON.stringify(data));
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
