"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronLeft, GalleryVerticalEnd, List } from "lucide-react";
import { isSectionActive, isSubItemActive } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const menuItems = [
  {
    title: "الكلمات",
    icon: List,
    basePath: "/dashboard/words",
    items: [
      { title: "كل الكلمات", href: "/dashboard/words" },
      { title: "إضافة كلمة", href: "/dashboard/words/create" },
    ],
  },
  {
    title: "التصنيفات",
    icon: GalleryVerticalEnd,
    basePath: "/dashboard/categories",
    items: [
      { title: "كل التصنيفات", href: "/dashboard/categories" },
      { title: "إضافة تصنيف", href: "/dashboard/categories/create" },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar dir="rtl" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex items-center justify-center bg-foreground text-background aspect-square px-3 py-1 text-sm font-black rounded-lg">
                  ح
                </div>
                <h1 className="text-3xl font-bold">حصيف</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isSecActive = isSectionActive(pathname, item.basePath);
              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={isSecActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isSecActive}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronLeft className="mr-auto transition-transform group-data-[state=open]/collapsible:rotate-270" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((sub) => {
                          const active = isSubItemActive(pathname, sub.href);

                          return (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton asChild isActive={active}>
                                <Link href={sub.href}>{sub.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
