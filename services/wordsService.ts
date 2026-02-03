import { Word } from "@/types/models/word";

export async function getWords(): Promise<Word[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/words`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch words");
  }

  return (await res.json()).data;
}

export async function fetchRandomWord(): Promise<Word> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/words/random`);

  if (!res.ok) {
    throw new Error("Failed to fetch random word");
  }

  return (await res.json()).data;
}
