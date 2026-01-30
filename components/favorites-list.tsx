"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { Star } from "lucide-react";
import WordCard from "./word-card";
import { Spinner } from "./ui/spinner";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
  },
};

export default function FavoritesList() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <Spinner />
      </div>
    );
  }

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
    <motion.section
      layout
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mt-4 flex flex-col gap-2 max-h-[75dvh] overflow-auto no-scrollbar"
    >
      <AnimatePresence>
        {favorites.map((word) => (
          <motion.div
            layout
            key={word.word}
            variants={itemVariants}
            className="*:w-full"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -8 }}
          >
            <WordCard word={word} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}
