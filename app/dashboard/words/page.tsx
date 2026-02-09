import WordsDashboardList from "@/components/words-dashboard-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكلمات",
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4">الكلمات</h2>
      <WordsDashboardList />
    </div>
  );
}
