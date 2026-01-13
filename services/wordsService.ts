import { IWord } from "@/interfaces";

export async function getWords(): Promise<IWord[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/words`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch words");
  }

  return (await res.json()).data;
}

export async function fetchRandomWord(): Promise<IWord> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/words/random`);

  if (!res.ok) {
    throw new Error("Failed to fetch random word");
  }

  return (await res.json()).data;
}
