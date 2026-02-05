"use client";
import SearchWord from "./search-word";
import WordsList from "./words-list";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Word } from "@/types/models/word";
import { getWords } from "@/services/wordsService";

interface IProps {
  initialWords: Word[];
}

const WordsContainer = ({ initialWords }: IProps) => {
  const [words, setWords] = useState<Word[]>(initialWords);
  const [page, setPage] = useState(2);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, _setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await getWords({ page, limit });
    const newWords = res.data;
    setWords((prev) => [...prev, ...newWords]);
    setHasMore(res.pagination ? res.pagination.hasNext : false);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (!hasMore || loading) return;
    const options = {
      root: rootRef.current,
      rootMargin: "200px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasMore, loading]);

  const filteredWords = useMemo(() => {
    if (!debouncedQuery) return words;

    const q = debouncedQuery.toLocaleLowerCase();

    return words.filter(
      (word) => word.word.includes(q) || word.meaning.includes(q),
    );
  }, [debouncedQuery, words]);

  if (!words.length) {
    return (
      <p className="mt-4 text-center text-gray-500">لا توجد كلمات لعرضها.</p>
    );
  }

  return (
    <>
      <SearchWord value={query} onSearch={setQuery} />

      <div ref={rootRef}>
        <WordsList
          words={filteredWords}
          observerRef={observerRef}
          isNewWordsLoading={loading}
        />
      </div>
    </>
  );
};

export default WordsContainer;
