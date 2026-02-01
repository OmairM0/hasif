"use client";

import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ThemeSwitcher from "@/components/theme-switcher";
import { usePathname } from "next/navigation";
import { buildBreadcrumb } from "@/utils/navigation";
import { Fragment } from "react/jsx-runtime";

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const breadcrumbs = buildBreadcrumb(pathname);
  return (
    <>
      <header className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((bc) => (
              <Fragment key={bc.href}>
                <BreadcrumbItem key={bc.href}>
                  {bc.isLast ? (
                    <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link href={bc.href}>{bc.label}</Link>
                      </BreadcrumbLink>
                    </>
                  )}
                </BreadcrumbItem>
                {!bc.isLast && <BreadcrumbSeparator className="rotate-180" />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mr-auto">
          <ThemeSwitcher />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </>
  );
}
