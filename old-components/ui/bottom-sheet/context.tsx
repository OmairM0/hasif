"use client";

import { createContext, useContext } from "react";

interface BottomSheetContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const BottomSheetContext = createContext<BottomSheetContextValue | null>(null);

export function useBottomSheet() {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) {
    throw new Error("BottomSheet componets must be used inside <BottomSheet>");
  }
  return ctx;
}

export default BottomSheetContext;
