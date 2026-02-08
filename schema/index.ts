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

export const createCategorySchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().optional(),
});

export const createWordSchema = z.object({
  word: z.string().min(1, "يجب إدخال الكلمة"),
  diacritic: z.string().min(1, "يجب إدخال التشكيل"),
  meaning: z.string().min(1, "يجب إدخال المعنى"),
  explanation: z.string().min(1, "يجب إدخال الشرح"),
  example: z.string().min(1, "يجب إدخال المثال"),
  category: z.string().min(1, "يرجى اختيار تصنيف"),
});

export const changeWordStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"], {
    message: "حالة الكلمة غير صالحة",
  }),
});
