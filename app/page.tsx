import BottomNavbar from "@/components/bottom-navbar";
import Header from "@/components/header";
import Logo from "@/components/logo";
import MainCard from "@/components/main-card";
import Button from "@/components/ui/button";
import { IWord } from "@/interfaces";
import { Settings, Shuffle, Star } from "lucide-react";

const exampleWord: IWord = {
  word: "سجية",
  diacritic: "سَجِيّة",
  meaning: "طبيعة النفس وخلقها الأصيل.",
  explanation: "تقال لما يكون طبعًا ثابتًا في الشخص.",
  example: "الصدقُ سَجيّةٌ كريمة.",
  category: "صفات",
  rarity: 4,
};

export default function Home() {
  return (
    <div>
      <Header title={<Logo />} icon={<Settings />} />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">كلمة اليوم</h2>
        <MainCard word={exampleWord} />
        <div className="mt-2 space-y-2">
          <Button icon={<Shuffle size={20} />} className="w-full rounded-3xl">
            كلمة عشوائية
          </Button>
          <Button
            variant="secondary"
            icon={<Star size={20} />}
            className="w-full rounded-3xl"
          >
            إضافة للمفضلة
          </Button>
        </div>
      </div>
    </div>
  );
}
