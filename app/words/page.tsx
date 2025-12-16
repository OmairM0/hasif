import Header from "@/components/header";
import WordCard from "@/components/word-card";

const words = [
  {
    word: "سجية",
    diacritic: "سَجِيّة",
    meaning: "طبيعة النفس وخلقها الأصيل.",
    explanation: "تقال لما يكون طبعًا ثابتًا في الشخص.",
    example: "الصدقُ سَجيّةٌ كريمة.",
    category: "صفات",
    rarity: 4,
  },
  {
    word: "دَهْش",
    diacritic: "دَهْش",
    meaning: "الحيرة والذهول.",
    explanation: "تُستعمل لوصف شدة التعجب أو الاستغراب.",
    example: "وقفَ في دَهْشٍ مما رأى.",
    category: "مشاعر",
    rarity: 3,
  },
  {
    word: "نَضِير",
    diacritic: "نَضِير",
    meaning: "حسنٌ جميلٌ مشرق.",
    explanation: "تقال لوصف الجمال المشرق أو البهي.",
    example: "كان وجهه نَضِيرًا بالبِشر.",
    category: "صفات",
    rarity: 4,
  },
  {
    word: "أَفْنَى",
    diacritic: "أَفْنَى",
    meaning: "أهلك أو أزال تمامًا.",
    explanation: "فعل يدل على الإزالة الكاملة أو الإهلاك.",
    example: "أفنى الزمنُ آثارَ المكان.",
    category: "أفعال",
    rarity: 2,
  },
  {
    word: "بَهِيّ",
    diacritic: "بَهِيّ",
    meaning: "شديد الحُسن والضياء.",
    explanation: "صفة تُستعمل لوصف الجمال اللافت.",
    example: "طلع الصباحُ بَهِيًّا.",
    category: "صفات",
    rarity: 3,
  },
];

export default function Page() {
  return (
    <div>
      <Header title={<h1 className="text-4xl font-bold">الكلمات</h1>} />
      <div className="mt-4 flex flex-col gap-2">
        {words.map((word) => (
          <WordCard word={word} key={word.word} />
        ))}
      </div>
    </div>
  );
}
