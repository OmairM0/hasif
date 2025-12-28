"use client";
import { IWord } from "@/interfaces";
import SearchWord from "./SearchWord";
import WordsList from "./WordsList";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface IProps {
  words: IWord[];
}

const WordsContainer = ({ words }: IProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const filteredWords = useMemo(() => {
    if (!debouncedQuery) return words;

    const q = debouncedQuery.toLocaleLowerCase();

    return words.filter(
      (word) => word.word.includes(q) || word.meaning.includes(q)
    );
  }, [debouncedQuery, words]);

  return (
    <>
      <SearchWord value={query} onSearch={setQuery} />

      <WordsList words={filteredWords} />
    </>
  );
};

export default WordsContainer;
