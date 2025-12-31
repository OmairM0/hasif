"use client";

import { IWord } from "@/interfaces";
import { ChevronLeft, Star, StarOff } from "lucide-react";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTrigger,
} from "./ui/bottom-sheet";
import Button from "./ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

interface IProps {
  word: IWord;
}

export default function WordCard({ word }: IProps) {
  const { word: name, meaning } = word;
  const { addWord, removeWord, isFavorite } = useFavorites();

  return (
    <BottomSheet>
      <BottomSheetTrigger>
        <button
          aria-label={`فتح تفاصيل كلمة ${word.word}`}
          className="border border-border rounded-lg px-2 py-3 flex justify-between items-center cursor-pointer"
        >
          <div className="text-right">
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="text-sm">{meaning}</p>
          </div>
          <ChevronLeft />
        </button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">{word.word}</h3>
          <div>
            <p className="text-lg italic">{word.diacritic}</p>
          </div>
          <div>
            <p className="font-bold text-lg">المعنى</p>
            <p className="text-base">{word.meaning}</p>
          </div>
          <div>
            <p className="font-bold text-lg">الشرح</p>
            <p className="text-base">{word.explanation}</p>
          </div>
          <div>
            <p className="font-bold text-lg">مثال في جملة</p>
            <p className="text-base">{word.example}</p>
          </div>

          <div className="mx-auto mt-8 w-fit">
            {isFavorite(word.word) ? (
              <Button
                variant="secondary"
                icon={<StarOff size={20} />}
                className="mx-auto rounded-3xl"
                onClick={() => removeWord(word.word)}
              >
                حذف من المفضلة
              </Button>
            ) : (
              <Button
                icon={<Star size={20} />}
                className="mx-auto rounded-3xl"
                onClick={() => addWord(word)}
              >
                إضافة للمفضلة
              </Button>
            )}
          </div>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}
