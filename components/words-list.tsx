import * as motion from "motion/react-client";
import WordCard from "./word-card";
import { AnimatePresence } from "motion/react";
import { Word } from "@/types/models/word";

interface IProps {
  words: Word[];
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

const WordsList = ({ words }: IProps) => {
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
    </>
  );
};

export default WordsList;
