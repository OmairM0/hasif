// import AnimatedCom from "@/components/animated-com";
import Header from "@/components/header";
import Logo from "@/components/logo";
import TodayWord from "@/components/today-word";
import { Settings } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header title={<Logo />} icon={<Settings aria-hidden="true" />} />
      <main>
        <TodayWord />
        {/* <AnimatedCom /> */}
      </main>
    </>
  );
}
