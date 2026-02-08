// import AnimatedCom from "@/components/animated-com";
import Header from "@/components/header";
import Logo from "@/components/logo";
import TodayWord from "@/components/today-word";
import { getToken } from "@/utils/session";
import Link from "next/link";

export default async function Home() {
  const isAuthenticated = await getToken();
  return (
    <>
      <Header
        title={<Logo />}
        icon={
          // <Settings size={20} aria-hidden="true" className="cursor-pointer" />
          !isAuthenticated ? (
            <Link href="/login" aria-label="تسجيل الدخول">
              تسجيل الدخول
            </Link>
          ) : (
            <Link href="/dashboard" aria-label="لوحة التحكم">
              لوحة التحكم
            </Link>
          )
        }
      />
      <main>
        <TodayWord />
        {/* <AnimatedCom /> */}
      </main>
    </>
  );
}
