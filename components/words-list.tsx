import { IWord } from "@/interfaces";
import WordCard from "./word-card";

interface IProps {
  words: IWord[];
}

const WordsList = ({ words }: IProps) => {
  return (
    <>
      <section className="mt-4 flex flex-col gap-2 max-h-[68dvh] overflow-auto no-scrollbar">
        {words.map((word) => (
          <WordCard word={word} key={word.word} />
        ))}
      </section>
    </>
  );
};

export default WordsList;
