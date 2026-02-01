import CategoriesList from "@/components/categories-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التصنيفات",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <CategoriesList />
    </div>
  );
}
