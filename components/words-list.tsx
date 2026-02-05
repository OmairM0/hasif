import * as motion from "motion/react-client";
import WordCard from "./word-card";
import { AnimatePresence } from "motion/react";
import { Word } from "@/types/models/word";
import { Ref } from "react";
import { Spinner } from "./ui/spinner";

interface IProps {
  words: Word[];
  observerRef?: Ref<HTMLDivElement>;
  isNewWordsLoading?: boolean;
}

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

const WordsList = ({ words, observerRef, isNewWordsLoading }: IProps) => {
  return (
    <>
      <motion.section
        layout
        className="mt-4 flex flex-col gap-2 max-h-[68dvh] overflow-auto no-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {words.map((word) => (
            <motion.div
              layout
              key={word.id}
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

        {isNewWordsLoading && (
          <div className="flex flex-col items-center mb-4">
            <Spinner className="size-8" />
            <p className="mt-2 text-sm">جاري التحميل...</p>
          </div>
        )}
        {<div ref={observerRef} className="min-h-2 w-full"></div>}
      </motion.section>
    </>
  );
};

export default WordsList;
