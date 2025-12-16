"use client";
import { cn } from "@/lib/utils";
import { ClipboardList, Home, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";

interface INavItem {
  label: string;
  href: string;
  icon: ElementType;
  isActive: (path: string) => boolean;
}

const navItems: INavItem[] = [
  {
    label: "الرئيسية",
    href: "/",
    icon: Home,
    isActive: (path: string) => path === "/",
  },
  {
    label: "الكلمات",
    href: "/words",
    icon: ClipboardList,
    isActive: (path: string) => path.startsWith("/words"),
  },
  {
    label: "المفضلة",
    href: "/favorites",
    icon: Star,
    isActive: (path: string) => path.startsWith("/favorites"),
  },
];

export default function BottomNavbar() {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive(pathName);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={cn(
                    "px-2 py-1 rounded-3xl hover:bg-muted",
                    isActive && "bg-muted"
                  )}
                >
                  <Icon size={20} />
                </span>
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
