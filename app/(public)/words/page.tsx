import Header from "@/components/header";
import WordsContainer from "@/components/words-container";
import { getWords } from "@/services/wordsService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكلمات",
};

export default async function Page() {
  const words = await getWords();

  return (
    <>
      <Header title={<h1 className="text-4xl font-bold">الكلمات</h1>} />
      <main>
        <WordsContainer words={words} />
      </main>
    </>
  );
}
