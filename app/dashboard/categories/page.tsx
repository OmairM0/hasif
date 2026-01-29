import CreateCategory from "@/components/create-category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التصنيفات",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <CreateCategory />
    </div>
  );
}
