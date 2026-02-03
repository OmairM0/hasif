"use client";
import SearchWord from "./search-word";
import WordsList from "./words-list";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Word } from "@/types/models/word";

interface IProps {
  words: Word[];
}

const WordsContainer = ({ words }: IProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const filteredWords = useMemo(() => {
    if (!debouncedQuery) return words;

    const q = debouncedQuery.toLocaleLowerCase();

    return words.filter(
      (word) => word.word.includes(q) || word.meaning.includes(q),
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
