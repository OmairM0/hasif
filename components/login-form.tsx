"use client";
import { apiFetch } from "@/services/api";
import { Button } from "./ui/button";
import { setToken } from "@/utils/session";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { LoginResponse } from "@/types/api/auth";
import { ApiResponse } from "@/types/common";
import { toast } from "sonner";
import { ApiError } from "@/services/apiError";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

type LoginForm = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await apiFetch<ApiResponse<LoginResponse>>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      setToken(response.data.token);
      router.push("/dashboard");
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        } else {
          toast.error(err.message);
        }
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
      <Input
        {...register("email")}
        className="h-10"
        type="email"
        placeholder="البريد الإلكتروني"
        required
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Input
        {...register("password")}
        className="h-10"
        type="password"
        placeholder="كلمة المرور"
        required
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "تسجيل الدخول"}
      </Button>
    </form>
  );
}
