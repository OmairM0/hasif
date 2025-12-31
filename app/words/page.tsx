import Header from "@/components/header";
import WordsContainer from "@/components/words-container";
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
    <>
      <Header title={<h1 className="text-4xl font-bold">الكلمات</h1>} />
      <main>
        <WordsContainer words={words} />
      </main>
    </>
  );
}
