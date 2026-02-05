"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { createWordSchema } from "@/schema";
import { apiFetch } from "@/services/api";
import { ApiError } from "@/services/apiError";
import { ApiResponse } from "@/types/common";
import { Word } from "@/types/models/word";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SelectCategory from "./select-category";

type wordForm = z.infer<typeof createWordSchema>;

type WordFormMode = "create" | "edit";

type WordFormProps = {
  mode: WordFormMode;
  initialValues?: {
    id: string;
    word: string;
    diacritic: string;
    meaning: string;
    explanation: string;
    example: string;
    category: string;
  };
  onSubmitSuccess?: (category: Word) => void;
};

export default function WordForm({
  mode,
  initialValues,
  onSubmitSuccess,
}: WordFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<wordForm>({
    resolver: zodResolver(createWordSchema),
    defaultValues: {
      word: initialValues?.word ?? "",
      diacritic: initialValues?.diacritic ?? "",
      meaning: initialValues?.meaning ?? "",
      explanation: initialValues?.explanation ?? "",
      example: initialValues?.example ?? "",
      category: initialValues?.category ?? "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        word: initialValues.word ?? "",
        diacritic: initialValues.diacritic ?? "",
        meaning: initialValues.meaning ?? "",
        explanation: initialValues.explanation ?? "",
        example: initialValues.example ?? "",
        category: initialValues.category ?? "",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: wordForm) => {
    const payload = {
      word: data.word,
      diacritic: data.diacritic,
      meaning: data.meaning,
      explanation: data.explanation,
      example: data.example,
      category: data.category,
    };

    try {
      const word = await apiFetch<ApiResponse<Word>>(
        mode === "create" ? "/words" : `/words/${initialValues?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          body: JSON.stringify(payload),
        },
      );

      reset();
      toast.success(
        mode === "create" ? "تم إضافة الكلمة بنجاح" : "تم تحديث الكلمة بنجاح",
      );
      onSubmitSuccess?.(word.data);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          toast.error("الكلمة موجودة بالفعل");
        } else {
          toast.error(err.message || "حدث خطأ أثناء إضافة الكلمة");
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
          <div>
            <div>
              <label htmlFor="word">الكلمة</label>
              <Input
                type="text"
                {...register("word")}
                className="h-10"
                placeholder="الكلمة"
              />
              {errors.word && (
                <p className="text-red-500 text-sm">{errors.word.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="diacritic">التشكيل</label>
              <Input
                type="text"
                {...register("diacritic")}
                className="h-10"
                placeholder="التشكيل"
              />
              {errors.diacritic && (
                <p className="text-red-500 text-sm">
                  {errors.diacritic.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="meaning">المعنى</label>
              <Input
                type="text"
                {...register("meaning")}
                className="h-10"
                placeholder="المعنى"
              />
              {errors.meaning && (
                <p className="text-red-500 text-sm">{errors.meaning.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="explanation">الشرح</label>
            <Input
              type="text"
              {...register("explanation")}
              className="h-10"
              placeholder="الشرح"
            />
            {errors.explanation && (
              <p className="text-red-500 text-sm">
                {errors.explanation.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="example">المثال</label>
            <Input
              type="text"
              {...register("example")}
              className="h-10"
              placeholder="المثال"
            />
            {errors.example && (
              <p className="text-red-500 text-sm">{errors.example.message}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="category">التصنيف</label>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectCategory
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : mode === "create" ? "حفظ" : "تحديث"}
        </Button>
      </form>
    </>
  );
}
