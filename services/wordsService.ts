import { Word } from "@/types/models/word";
import { apiFetch } from "./api";
import { ApiResponse } from "@/types/common";
import z from "zod";
import { createWordSchema } from "@/schema";

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

type UpdateWordPayload = z.infer<typeof createWordSchema>;

export async function updateWord(
  id: string,
  payload: UpdateWordPayload,
): Promise<Word> {
  const res = await apiFetch<ApiResponse<Word>>(`/words/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res.data;
}

export async function deleteWord(id: string): Promise<{ message: string }> {
  const res = await apiFetch<{ message: string }>(`/words/${id}`, {
    method: "DELETE",
  });

  return res;
}

export async function fetchRandomWord(): Promise<Word> {
  const res = await apiFetch<ApiResponse<Word>>(`/words/random`);

  return res.data;
}
