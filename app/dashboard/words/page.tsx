import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الكلمات",
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h2>اخر الكلمات</h2>
      <form className="mt-4 flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div>
            <label htmlFor="word">الكلمة</label>
            <Input type="text" name="word" placeholder="الكلمة" />
          </div>
          <div>
            <label htmlFor="diacritic">التشكيل</label>
            <Input type="text" name="diacritic" placeholder="التشكيل" />
          </div>
          <div>
            <label htmlFor="meaning">المعنى</label>
            <Input type="text" name="meaning" placeholder="المعنى" />
          </div>
        </div>
        <div>
          <label htmlFor="explanation">الشرح</label>
          <Input type="text" name="explanation" placeholder="الشرح" />
        </div>
        <div>
          <label htmlFor="example">المثال</label>
          <Input type="text" name="example" placeholder="المثال" />
        </div>
        <div>
          <label htmlFor="category">التصنيف</label>
          <Input type="text" name="category" placeholder="التصنيف" />
        </div>
      </form>
    </div>
  );
}
