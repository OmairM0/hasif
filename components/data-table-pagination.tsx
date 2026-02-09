"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface IProps {
  page: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export default function DataTablePagination({
  page,
  totalPages,
  loading = false,
  onPageChange,
}: IProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/40">
      <span className="text-sm text-muted-foreground">
        الصفحة {page} من {totalPages}
      </span>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1 || loading}
          onClick={() => onPageChange(page - 1)}
        >
          {loading ? <Spinner className="size-4" /> : "السابق"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages || loading}
          onClick={() => onPageChange(page + 1)}
        >
          {loading ? <Spinner className="size-4" /> : "التالي"}
        </Button>
      </div>
    </div>
  );
}
