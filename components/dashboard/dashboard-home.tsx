"use client";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "../ui/spinner";
import LastWords from "./last-words";

export default function DashboardHome() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        مرحباً بك👋 <span className="font-semibold">{user?.name}</span>
      </div>
      <h2>اخر الكلمات</h2>
      <LastWords />
    </div>
  );
}
