import WordForm from "@/components/word-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة كلمة",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4">إضافة كلمة</h2>
      <WordForm mode="create" />
    </div>
  );
}
