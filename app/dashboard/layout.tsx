import "../globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import DashboardContent from "@/components/dashboard-content";
import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AuthProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashboardContent>{children}</DashboardContent>
          </SidebarInset>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
