"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getWords } from "@/services/wordsService";
import { Word } from "@/types/models/word";
import WordStatus from "../word-status";
export default function LastWords() {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<Word[]>([]);

  const fetchWords = async () => {
    try {
      const res = await getWords({ page: 1, limit: 10, scope: "me" });
      setWords(res.data);
    } catch {
      toast.error("حدث خطأ أثناء جلب الكلمات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner className="size-8 " />
      </div>
    );
  }

  if (!words.length) {
    return (
      <div className="text-center text-muted-foreground font-bold">
        لا توجد كلمات
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table defaultValue="outline">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="font-bold">الكلمة</TableHead>
            <TableHead className="font-bold text-center">التشكيل</TableHead>
            <TableHead className="font-bold text-center">الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word) => (
            <TableRow key={word.id}>
              <TableCell className="font-medium">{word.word}</TableCell>
              <TableCell className="text-center">{word.diacritic}</TableCell>
              <TableCell className="text-center">
                <WordStatus status={word.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
