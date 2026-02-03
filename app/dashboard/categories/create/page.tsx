import CategoryForm from "@/components/category-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة تصنيف",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4">إضافة تصنيف</h2>
      <CategoryForm mode="create" />
    </div>
  );
}
