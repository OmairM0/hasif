import DashboardHome from "@/components/dashboard/dashboard-home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم",
};

export default async function Page() {
  return (
    <div>
      <DashboardHome />
    </div>
  );
}
