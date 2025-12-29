import FavoritesList from "@/components/favorites-list";
import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المفضلة",
};

export default function Page() {
  return (
    <>
      <Header title={<h1 className="text-4xl font-bold">المفضلة</h1>} />
      <main>
        <FavoritesList />
      </main>
    </>
  );
}
