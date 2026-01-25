"use client";
import { apiFetch } from "@/services/api";
import Button from "./ui/button";
import Input from "./ui/Input";
import { setToken } from "@/utils/session";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type LoginForm = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (data: LoginForm) => {
    const response = await apiFetch<{ data: { token: string } }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    console.log(response);
    setToken(response.data.token);
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
      <Button type="submit">تسجيل الدخول</Button>
    </form>
  );
}
