import Header from "@/components/header";
import WordCard from "@/components/word-card";
import { IWord } from "@/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكلمات",
};

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${apiUrl}/api/words`, {
    cache: "no-store",
  });
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
