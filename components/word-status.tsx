import { Badge } from "./ui/badge";

export default function WordStatus({ status }: { status: string }) {
  status = status.toLowerCase();

  const statusMap: Record<string, { label: string; className: string }> = {
    pending: {
      label: "في الانتظار",
      className:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
    approved: {
      label: "مقبول",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    rejected: {
      label: "مرفوض",
      className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    },
  };

  const current = statusMap[status] || {
    label: "غير معروف",
    className: "bg-gray-200 text-gray-600",
  };

  return (
    <Badge
      className={`px-2 py-1 rounded-full text-xs font-medium ${current.className}`}
    >
      {current.label}
    </Badge>
  );
}
