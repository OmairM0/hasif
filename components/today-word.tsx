"use client";
import { Button } from "./ui/button";
import { Shuffle, Star, StarOff } from "lucide-react";
import MainCard from "./main-card";
import { Spinner } from "./ui/spinner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useTodayWord } from "@/hooks/useTodayWord";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

export default function TodayWord() {
  const { todayWord, isLoading, refreshWord } = useTodayWord();
  const { addWord, removeWord, isFavorite } = useFavorites();

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">كلمة اليوم</h2>
          <MainCard word={todayWord!} />
          <div className="mt-2 space-y-2">
            <MotionButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-3xl"
              onClick={async () => {
                refreshWord();
              }}
            >
              <Shuffle size={20} />
              كلمة عشوائية
            </MotionButton>

            {isFavorite(todayWord!.word) ? (
              <MotionButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                variant="secondary"
                className="w-full rounded-3xl"
                onClick={() => removeWord(todayWord!.word)}
              >
                <StarOff size={20} />
                حذف من المفضلة
              </MotionButton>
            ) : (
              <MotionButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                variant="secondary"
                className="w-full rounded-3xl"
                onClick={() => addWord(todayWord!)}
              >
                <Star size={20} />
                إضافة للمفضلة
              </MotionButton>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
