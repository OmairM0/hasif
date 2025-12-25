import Header from "@/components/header";
import Logo from "@/components/logo";
import TodayWord from "@/components/today-word";
import { Settings } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Header title={<Logo />} icon={<Settings aria-hidden="true" />} />
      <TodayWord />
    </div>
  );
}
