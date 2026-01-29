import Header from "@/components/header";
import "../globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarProvider>
        <Sidebar defaultOpen={true}>
          <SidebarHeader>
            <h1 className="text-3xl font-bold text-center">حصيف</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <Link href="/dashboard/words">الكلمات</Link>
              </SidebarItem>
              <SidebarItem>
                <Link href="/dashboard/categories">التصنيفات</Link>
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-2">
          <div className="flex">
            <SidebarTrigger />
            <div className="flex-1">
              <Header
                title={<h1 className="text-2xl font-semibold">لوحة التحكم</h1>}
              />
            </div>
          </div>

          <main className="mt-4">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
