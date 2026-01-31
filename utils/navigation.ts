// for collapsible sections
export function isSectionActive(pathname: string, basePath: string) {
  return pathname === basePath || pathname.startsWith(basePath + "/");
}

// for submenu links
export function isSubItemActive(pathname: string, href: string) {
  return pathname === href;
}

export function buildBreadcrumb(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  const map: Record<string, string> = {
    dashboard: "لوحة التحكم",
    words: "الكلمات",
    favorites: "المفضلة",
    categories: "التصنيفات",
    create: "إضافة",
  };

  return segments.map((seg, index) => ({
    label: map[seg] ?? seg,
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));
}
