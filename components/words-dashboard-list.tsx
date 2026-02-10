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
import {
  changeWordStatus,
  deleteWord,
  getWords,
} from "@/services/wordsService";
import { Word } from "@/types/models/word";
import WordStatus from "./word-status";
import WordForm from "./word-form";
import { ApiError } from "@/services/apiError";
import DataTablePagination from "./data-table-pagination";
import { useAuth } from "@/hooks/use-auth";

export default function WordsDashboardList() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [words, setWords] = useState<Word[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 20;
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchWords = async (pageNumber: number) => {
    try {
      if (pageNumber == 1) {
        setLoading(true);
      } else {
        setPageLoading(true);
      }

      const res = await getWords({ page: pageNumber, limit });
      setWords(res.data);
      setTotalPages(res.pagination?.totalPages || 1);
      setPage(pageNumber);
    } catch {
      toast.error("حدث خطأ أثناء جلب الكلمات");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchWords(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!selectedWord) return;
    try {
      await deleteWord(id);
      setWords((prev) => prev.filter((c) => c.id !== id));
      toast.success("تم حذف الكلمة");

      setDeleteOpen(false);
      setSelectedWord(null);
    } catch {
      toast.error("فشل حذف الكلمة");
    }
  };

  const handleChangeStatus = async (id: string, status: string) => {
    if (processingIds.has(id)) return;

    setProcessingIds((prev) => new Set(prev).add(id));
    try {
      const updated = (await changeWordStatus(id, status)).data;
      setWords((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
      toast.success("تم تحديث حالة الكلمة بنجاح");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          toast.error("الكلمة غير موجودة");
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const statusActions = {
    approved: [
      {
        label: "رفض",
        status: "rejected",
        className: "bg-red-100 text-red-700 hover:bg-red-200",
      },
      {
        label: "تعليق",
        status: "pending",
        className: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      },
    ],
    pending: [
      {
        label: "رفض",
        status: "rejected",
        className: "bg-red-100 text-red-700 hover:bg-red-200",
      },
      {
        label: "قبول",
        status: "approved",
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      },
    ],
    rejected: [
      {
        label: "تعليق",
        status: "pending",
        className: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      },
      {
        label: "قبول",
        status: "approved",
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      },
    ],
  } as const;

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
              <TableCell className="text-left flex gap-2 justify-end">
                {isAdmin &&
                  statusActions[word.status]?.map((action) => (
                    <Button
                      key={action.status}
                      size="sm"
                      className={action.className}
                      disabled={processingIds.has(word.id)}
                      onClick={() => handleChangeStatus(word.id, action.status)}
                    >
                      {processingIds.has(word.id) ? (
                        <Spinner className="size-4" />
                      ) : (
                        action.label
                      )}
                    </Button>
                  ))}

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
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => {
                            setSelectedWord(word);
                            setDeleteOpen(true);
                          }}
                        >
                          حذف
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination
        page={page}
        totalPages={totalPages}
        loading={pageLoading}
        onPageChange={fetchWords}
      />

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

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
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
