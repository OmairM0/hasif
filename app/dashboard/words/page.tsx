import { Input } from "@/components/ui/input";
import WordsDashboardList from "@/components/words-dashboard-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكلمات",
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h2>اخر الكلمات</h2>
      <WordsDashboardList />
    </div>
  );
}
