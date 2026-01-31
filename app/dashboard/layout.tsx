"use client";
import "../globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ChevronLeft, GalleryVerticalEnd, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import ThemeSwitcher from "@/components/theme-switcher";
import { usePathname } from "next/navigation";
import {
  buildBreadcrumb,
  isSectionActive,
  isSubItemActive,
} from "@/utils/navigation";

export const menuItems = [
  {
    title: "الكلمات",
    icon: List,
    basePath: "/dashboard/words",
    items: [
      { title: "كل الكلمات", href: "/dashboard/words" },
      { title: "المفضلة", href: "/dashboard/favorites" },
    ],
  },
  {
    title: "التصنيفات",
    icon: GalleryVerticalEnd,
    basePath: "/dashboard/categories",
    items: [
      { title: "كل التصنيفات", href: "/dashboard/categories" },
      { title: "إضافة تصنيف", href: "/dashboard/categories/create" },
      { title: "s تصنيف", href: "/dashboard/categories/test" },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const breadcrumbs = buildBreadcrumb(pathname);

  return (
    <div className="flex">
      <SidebarProvider>
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
                              const active = isSubItemActive(
                                pathname,
                                sub.href,
                              );

                              return (
                                <SidebarMenuSubItem key={sub.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={active}
                                  >
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

        <SidebarInset>
          <header className="flex h-16 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((bc) => (
                  <BreadcrumbItem key={bc.href}>
                    {bc.isLast ? (
                      <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink asChild>
                          <Link href={bc.href}>{bc.label}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator className="rotate-180" />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mr-auto">
              <ThemeSwitcher />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
