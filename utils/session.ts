"use server";
import { cookies } from "next/headers";

/**
 * Set token in cookies
 */
export async function setToken(token: string) {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

/**
 * Get token from cookies
 */
export async function getToken(): Promise<string | undefined> {
  return (await cookies()).get("token")?.value;
}

/**
 * Remove token from cookies
 */
export async function removeToken() {
  (await cookies()).delete("token");
}
