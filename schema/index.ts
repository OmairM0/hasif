import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
});

export const signupSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.email("البريد الإلكتروني غير صالح"),
  username: z.string().min(4, "اسم المستخدم يجب أن يكون 4 أحرف على الأقل"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
});