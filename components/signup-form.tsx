"use client";

import { apiFetch } from "@/services/api";
import { Button } from "./ui/button";
import { setToken } from "@/utils/session";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignupResponse } from "@/types/api/auth";
import { ApiResponse } from "@/types/common";
import { toast } from "sonner";
import { ApiError } from "@/services/apiError";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await apiFetch<ApiResponse<SignupResponse>>(
        "/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      setToken(response.data.token);
      toast.success("تم إنشاء الحساب بنجاح");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message || "فشل إنشاء الحساب");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4 max-w-md mx-auto"
    >
      <Input {...register("name")} type="text" placeholder="الاسم" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <Input {...register("username")} type="text" placeholder="اسم المستخدم" />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <Input
        {...register("email")}
        type="email"
        placeholder="البريد الإلكتروني"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <Input
        {...register("password")}
        type="password"
        placeholder="كلمة المرور"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "إنشاء حساب"}
      </Button>
    </form>
  );
}
