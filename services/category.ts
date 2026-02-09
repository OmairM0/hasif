import { ApiResponse } from "@/types/common";
import { Category } from "@/types/models/category";
import { apiFetch } from "./api";

export async function getCategories({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ApiResponse<Category[]>> {
  const res = await apiFetch<ApiResponse<Category[]>>(
    `/categories?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );

  return res;
}

export async function getCategory(id: string): Promise<Category> {
  const res = await apiFetch<ApiResponse<Category>>(`/categories/${id}`, {
    method: "GET",
  });

  return res.data;
}

export type UpdateCategoryPayload = {
  name: string;
  description?: string;
};

export async function updateCategory(
  id: string,
  payload: UpdateCategoryPayload,
): Promise<Category> {
  const res = await apiFetch<ApiResponse<Category>>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res.data;
}

export async function deleteCategory(id: string): Promise<{ message: string }> {
  const res = await apiFetch<{ message: string }>(`/categories/${id}`, {
    method: "DELETE",
  });

  return res;
}
