import Header from "@/components/header";
import { Star } from "lucide-react";

export default function Page() {
  return (
    <div>
      <Header title={<h1 className="text-4xl font-bold">المفضلة</h1>} />
      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-2">
        <Star size={40} />
        <div className="text-center">
          <h4 className="text-lg font-semibold">لم تقم بحفظ أي كلمة بعد</h4>
          <p className="text-sm">
            احفظ الكلمات من تبويب{" "}
            <span className="font-semibold">كلمة اليوم</span> أو من قائمة{" "}
            <span className="font-semibold">الكلمات</span>
          </p>
        </div>
      </div>
    </div>
  );
}
