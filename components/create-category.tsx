"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/old-components/ui/spinner";
import { createCategorySchema } from "@/schema";
import { apiFetch } from "@/services/api";
import { ApiError } from "@/services/apiError";
import { ApiResponse } from "@/types/common";
import { Category } from "@/types/models/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type createCategoryForm = z.infer<typeof createCategorySchema>;

export default function CreateCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createCategoryForm>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = async (data: createCategoryForm) => {
    const payload = {
      name: data.name,
      ...(data.description?.trim()
        ? { description: data.description.trim() }
        : {}),
    };

    try {
      await apiFetch<ApiResponse<Category>>("/categories", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      reset();
      toast.success("تم إضافة التصنيف بنجاح");
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
      <h2>إضافة تصنيف</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
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
          {isSubmitting ? <Spinner /> : "حفظ"}
        </Button>
      </form>
    </>
  );
}
