import Header from "@/components/header";
import SignupForm from "@/components/signup-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "إنشاء حساب",
};

export default async function Page() {
  return (
    <div className="max-w-6xl mx-auto min-h-dvh flex flex-col p-4">
      <Header title={<h1 className="text-4xl font-bold">حصيف</h1>} />
      <main className="mt-4">
        <h1 className="text-center text-3xl font-bold">إنشاء حساب</h1>
        <h2 className="text-center text-sm mt-4 font-bold">
          اهلاً بك👋، قم بإنشاء حسابك
        </h2>
        <SignupForm />
        <Link
          href="/login"
          className="block text-center mt-4 text-blue-500 hover:underline"
        >
          لديك حساب بالفعل؟ سجل الدخول
        </Link>
        <Link
          href="/"
          className="block mt-4 text-center text-muted-foreground hover:text-foreground"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </main>
    </div>
  );
}
