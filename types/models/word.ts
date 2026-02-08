export interface Word {
  id: string;
  word: string;
  diacritic: string;
  meaning: string;
  explanation: string;
  example: string;
  category: string;
  status: "approved" | "pending" | "rejected";
  // createdAt: string;
  // updatedAt: string;
}
