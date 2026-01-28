import Header from "@/components/header";
import {
  SidebarContent,
  SidebarItem,
  SidebarList,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم",
};

export default async function Page() {
  return (
    <div className="flex">
      <SidebarProvider>
        <Sidebar defaultOpen={true}>
          <SidebarContent>
            <SidebarList>
              <SidebarItem>
                <a href="#">كلماتي</a>
              </SidebarItem>
              <SidebarItem>
                <a href="#">المفضلة</a>
              </SidebarItem>
            </SidebarList>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-2">
          <div className="flex">
            <SidebarTrigger />
            <div className="flex-1">
              <Header title={<h1 className="text-4xl font-bold">حصيف</h1>} />
            </div>
          </div>

          <main className="mt-4">
            <h1 className="text-center text-3xl font-bold">لوحة التحكم</h1>
            <h2 className="text-center text-sm mt-4 font-bold">اهلاً بك👋،</h2>
            <SidebarItem>
              <a href="#">كلماتي</a>
            </SidebarItem>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
