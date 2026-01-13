import { IWord } from "@/interfaces";
import { fetchRandomWord } from "@/services/wordsService";
import { useEffect, useState } from "react";

const exampleWord: IWord = {
  word: "سجية",
  diacritic: "سَجِيّة",
  meaning: "طبيعة النفس وخلقها الأصيل.",
  explanation: "تقال لما يكون طبعًا ثابتًا في الشخص.",
  example: "الصدقُ سَجيّةٌ كريمة.",
  category: "صفات",
  rarity: 4,
};

export function useTodayWord() {
  const [todayWord, setTodayWord] = useState<IWord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getToday = () => new Date().toDateString();
  const save = (word: IWord) => {
    localStorage.setItem(
      "todayWord",
      JSON.stringify({ word, date: getToday() })
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loadTodayWord = async () => {
      const stored = localStorage.getItem("todayWord");
      if (stored) {
        const { word, date } = JSON.parse(stored);
        const today = getToday();

        if (date === today) {
          setTodayWord(word);
          setIsLoading(false);
          return;
        }
      }
      try {
        const word = await fetchRandomWord();
        setTodayWord(word);
        save(word);
      } catch {
        setTodayWord(exampleWord);
        save(exampleWord);
      }
      setIsLoading(false);
    };

    loadTodayWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshWord = async () => {
    const word = await fetchRandomWord();
    setTodayWord(word);
  };

  return { todayWord, isLoading, refreshWord };
}
