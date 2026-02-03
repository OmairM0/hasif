"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/services/category";
import { Category } from "@/types/models/category";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

interface SelectCategoryProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function SelectCategory({
  value,
  onValueChange,
}: SelectCategoryProps) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <Select value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          {loading && <Spinner />}
          <SelectValue placeholder={loading ? "جاري التحميل..." : "التصنيف"} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.length === 0 && !loading && (
            <div className="p-2 text-sm text-muted-foreground text-center">
              لا توجد تصنيفات
            </div>
          )}
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
