"use client";
import { ChevronLeft, Star, StarOff } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useFavorites } from "@/contexts/favorites-context";
import { Word } from "@/types/models/word";

interface IProps {
  word: Word;
}

export default function WordCard({ word }: IProps) {
  const { word: name, meaning } = word;
  const { addWord, removeWord, isFavorite } = useFavorites();
  const status =
    word.status === "approved"
      ? "مقبولة"
      : word.status === "pending"
        ? "قيد المراجعة"
        : "مرفوضة";

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          aria-label={`فتح تفاصيل كلمة ${word.word}`}
          className="border border-border rounded-lg px-2 py-3 flex justify-between items-center cursor-pointer"
        >
          <div className="text-right">
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="text-sm">{meaning}</p>
          </div>
          <div className="flex items-center gap-2">
            {status === "قيد المراجعة" && (
              <span className="bg-yellow-400 text-sm font-medium text-white px-2 py-1 rounded-full">
                {status}
              </span>
            )}
            {status === "مرفوضة" && (
              <span className="bg-red-600 text-sm font-medium text-white px-2 py-1 rounded-full">
                {status}
              </span>
            )}
            <ChevronLeft />
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="space-y-4 p-4">
          <DrawerHeader className="text-right">
            <DrawerTitle asChild>
              <h3 className="text-3xl font-bold">{word.word}</h3>
            </DrawerTitle>
            <div>
              <p className="text-lg italic">{word.diacritic}</p>
            </div>
          </DrawerHeader>
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

          {status == "مقبولة" && (
            <div className="mx-auto mt-8 w-fit">
              {isFavorite(word.word) ? (
                <Button
                  variant="secondary"
                  className="mx-auto rounded-3xl"
                  onClick={() => removeWord(word.word)}
                >
                  <StarOff size={20} />
                  حذف من المفضلة
                </Button>
              ) : (
                <Button
                  className="mx-auto rounded-3xl"
                  onClick={() => addWord(word)}
                >
                  <Star size={20} />
                  إضافة للمفضلة
                </Button>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
