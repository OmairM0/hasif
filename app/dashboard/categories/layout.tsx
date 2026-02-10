// app/dashboard/categories/layout.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isAdmin) redirect("/dashboard");

  return <>{children}</>;
}
