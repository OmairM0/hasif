import { getToken } from "@/utils/session";
import { ApiError } from "./apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");

  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(
      body?.message || "Request failed",
      res.status,
      body?.errors,
    );
  }

  return body as T;
}
