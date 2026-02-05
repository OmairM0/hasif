import { Word } from "@/types/models/word";
import { apiFetch } from "./api";
import { ApiResponse } from "@/types/common";

export async function getWords({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ApiResponse<Word[]>> {
  const res = await apiFetch<ApiResponse<Word[]>>(
    `/words?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );

  return res;
}

export async function fetchRandomWord(): Promise<Word> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/words/random`);

  if (!res.ok) {
    throw new Error("Failed to fetch random word");
  }

  return (await res.json()).data;
}
