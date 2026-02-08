"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteWord, getWords } from "@/services/wordsService";
import { Word } from "@/types/models/word";
import WordStatus from "./word-status";
import WordForm from "./word-form";

export default function WordsDashboardList() {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<Word[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const fetchWords = async () => {
    try {
      const data = await getWords({ page: 1, limit: 20 });
      setWords(data.data);
    } catch {
      toast.error("حدث خطأ أثناء جلب الكلمات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleDelete = async (id: string) => {
    if (!selectedWord) return;
    try {
      await deleteWord(id);
      setWords((prev) => prev.filter((c) => c.id !== id));
      toast.success("تم حذف الكلمة");
    } catch {
      toast.error("فشل حذف الكلمة");
    }
  };

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
            <TableHead className="font-bold text-left">الإجراءات</TableHead>
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
              <TableCell className="text-left">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">فتح القائمة</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingWord(word);
                        setEditOpen(true);
                      }}
                    >
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        setSelectedWord(word);
                        setOpen(true);
                      }}
                    >
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>تعديل التصنيف</AlertDialogTitle>
          </AlertDialogHeader>

          <WordForm
            mode="edit"
            initialValues={editingWord ?? undefined}
            onSubmitSuccess={(updated) => {
              setWords((prev) =>
                prev.map((c) => (c.id === updated.id ? updated : c)),
              );

              setEditOpen(false);
              setEditingWord(null);
            }}
          />
          <AlertDialogCancel
            type="button"
            onClick={() => {
              setEditOpen(false);
              setEditingWord(null);
            }}
          >
            إلغاء
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>حذف الكلمة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف الكلمة
              <span className="font-bold"> {selectedWord?.word} </span>؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              onClick={() => {
                setSelectedWord(null);
              }}
            >
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleDelete(selectedWord?.id || "")}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
