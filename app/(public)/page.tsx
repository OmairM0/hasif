// import AnimatedCom from "@/components/animated-com";
import Header from "@/components/header";
import Logo from "@/components/logo";
import TodayWord from "@/components/today-word";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header
        title={<Logo />}
        icon={
          // <Settings size={20} aria-hidden="true" className="cursor-pointer" />
          <Link href="/login" aria-label="تسجيل الدخول">
            تسجيل الدخول
          </Link>
        }
      />
      <main>
        <TodayWord />
        {/* <AnimatedCom /> */}
      </main>
    </>
  );
}
