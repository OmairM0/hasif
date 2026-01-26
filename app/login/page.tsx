import Header from "@/components/header";
import LoginForm from "@/components/login-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default async function Page() {
  return (
    <>
      <Header title={<h1 className="text-4xl font-bold">حصيف</h1>} />
      <main className="mt-4">
        <h1 className="text-center text-3xl font-bold">تسجيل الدخول</h1>
        <h2 className="text-center text-sm mt-4 font-bold">
          اهلاً بك👋، قم بتسجيل الدخول
        </h2>
        <LoginForm />
        {/* <Link
          href="/register"
          className="block text-center mt-4 text-blue-500 hover:underline"
        >
          ليس لديك حساب؟ سجل الآن
        </Link> */}
        <Link
          href="/"
          className="block mt-4 text-center text-muted-foreground hover:text-foreground"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </main>
    </>
  );
}
