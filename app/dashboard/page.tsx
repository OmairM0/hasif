import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم",
};

export default async function Page() {
  return (
    <>
      <Header title={<h1 className="text-4xl font-bold">حصيف</h1>} />
      <main className="mt-4">
        <h1 className="text-center text-3xl font-bold">لوحة التحكم</h1>
        <h2 className="text-center text-sm mt-4 font-bold">اهلاً بك👋،</h2>
      </main>
    </>
  );
}
