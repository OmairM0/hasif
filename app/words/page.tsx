import Header from "@/components/header";
import WordCard from "@/components/word-card";
import { IWord } from "@/interfaces";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/words");
  const words: IWord[] = await data.json();

  return (
    <div>
      <Header title={<h1 className="text-4xl font-bold">الكلمات</h1>} />
      <div className="mt-4 flex flex-col gap-2 max-h-[75dvh] overflow-auto no-scrollbar">
        {words.map((word) => (
          <WordCard word={word} key={word.word} />
        ))}
      </div>
    </div>
  );
}
