import { IWord } from "@/interfaces";
import { clsx } from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchRandomWord(): Promise<IWord> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(`${apiUrl}/api/words/random`).then((res) => res.json());
}
