"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { createCategorySchema } from "@/schema";
import { apiFetch } from "@/services/api";
import { ApiError } from "@/services/apiError";
import { ApiResponse } from "@/types/common";
import { Category } from "@/types/models/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type createCategoryForm = z.infer<typeof createCategorySchema>;

type CategoryFormMode = "create" | "edit";

type CategoryFormProps = {
  mode: CategoryFormMode;
  initialValues?: {
    id: string;
    name: string;
    description?: string;
  };
  onSubmitSuccess?: (category: Category) => void;
};

export default function CategoryForm({
  mode,
  initialValues,
  onSubmitSuccess,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name,
        description: initialValues.description ?? "",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: createCategoryForm) => {
    const payload = {
      name: data.name,
      ...(data.description?.trim()
        ? { description: data.description.trim() }
        : {}),
    };

    try {
      const category = await apiFetch<ApiResponse<Category>>(
        mode === "create" ? "/categories" : `/categories/${initialValues?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          body: JSON.stringify(payload),
        },
      );

      reset();
      toast.success(
        mode === "create" ? "تم إضافة التصنيف بنجاح" : "تم تحديث التصنيف بنجاح",
      );
      onSubmitSuccess?.(category.data);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          toast.error("التصنيف موجود بالفعل");
        } else {
          toast.error(err.message || "حدث خطأ أثناء إضافة التصنيف");
        }
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">التصنيف</label>
          <Input
            {...register("name")}
            className="h-10"
            type="text"
            placeholder="التصنيف"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">
            الوصف <span className="text-sm text-gray-300">اختياري</span>
          </label>
          <Input {...register("description")} type="text" placeholder="الوصف" />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : mode === "create" ? "حفظ" : "تحديث"}
        </Button>
      </form>
    </>
  );
}
