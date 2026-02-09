import CategoriesList from "@/components/categories-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التصنيفات",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4">التصنيفات</h2>
      <CategoriesList />
    </div>
  );
}
