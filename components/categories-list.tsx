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
import { deleteCategory, getCategories } from "@/services/category";
import { Category } from "@/types/models/category";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CategoryForm from "./category-form";

export default function CategoriesList() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.error("حدث خطأ أثناء جلب التصنيفات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("تم حذف التصنيف");
    } catch {
      toast.error("فشل حذف التصنيف");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner className="size-8 " />
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="text-center text-muted-foreground font-bold">
        لا توجد تصنيفات
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table defaultValue="outline">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="font-bold">الاسم</TableHead>
            <TableHead className="font-bold text-center">الوصف</TableHead>
            <TableHead className="font-bold text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-center">
                {category.description || "—"}
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
                        setEditingCategory(category);
                        setEditOpen(true);
                      }}
                    >
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        setSelectedCategory(category);
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

          <CategoryForm
            mode="edit"
            initialValues={editingCategory ?? undefined}
            onSubmitSuccess={(updated) => {
              setCategories((prev) =>
                prev.map((c) => (c.id === updated.id ? updated : c)),
              );

              setEditOpen(false);
              setEditingCategory(null);
            }}
          />
          <AlertDialogCancel
            type="button"
            onClick={() => {
              setEditOpen(false);
              setEditingCategory(null);
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
            <AlertDialogTitle>حذف التصنيف؟</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف التصنيف
              <span className="font-bold"> {selectedCategory?.name} </span>؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              onClick={() => {
                setSelectedCategory(null);
              }}
            >
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleDelete(selectedCategory?.id || "")}
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
