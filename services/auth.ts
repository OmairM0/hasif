import { ApiResponse } from "@/types/common";
import { apiFetch } from "./api";
import { User } from "@/types/models/user";

export async function getMe(): Promise<ApiResponse<User>> {
  const res = await apiFetch<ApiResponse<User>>(`/users/me`, {
    method: "GET",
  });

  return res;
}
