import Header from "@/components/header";
import WordsContainer from "@/components/words-container";
import { getWords } from "@/services/wordsService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكلمات",
};

export default async function Page() {
  const res = await getWords({ page: 1, limit: 20 });
  const words = res.data;

  return (
    <>
      <Header title={<h1 className="text-4xl font-bold">الكلمات</h1>} />
      <main>
        <WordsContainer initialWords={words} />
      </main>
    </>
  );
}
