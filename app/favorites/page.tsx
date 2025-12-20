import FavoritesList from "@/components/favorites-list";
import Header from "@/components/header";

export default function Page() {
  return (
    <div>
      <Header title={<h1 className="text-4xl font-bold">المفضلة</h1>} />
      <FavoritesList />
    </div>
  );
}
