"use client";
import { createPortal } from "react-dom";
import BottomSheetContext, { useBottomSheet } from "./context";
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface IProps {
  children: ReactNode;
}

function BottomSheet({ children }: IProps) {
  const [open, setOpen] = useState(false);
  return (
    <BottomSheetContext.Provider value={{ open, setOpen }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

type ClickableElement = ReactElement<{
  onClick?: React.MouseEventHandler;
}>;
function BottomSheetTrigger({ children }: { children: ClickableElement }) {
  const { setOpen } = useBottomSheet();

  return cloneElement(children, { onClick: () => setOpen(true) });
}

function BottomSheetClose({ children }: { children: ClickableElement }) {
  const { setOpen } = useBottomSheet();

  return cloneElement(children, {
    onClick: () => setOpen(false),
  });
}

function BottomSheetOverlay({ children }: IProps) {
  const { open, setOpen } = useBottomSheet();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;

    const root = document.getElementById("__next") || document.body;

    Array.from(root.children).forEach((child) => {
      if (!sheetRef.current?.contains(child)) {
        child.setAttribute("inert", "");
        child.setAttribute("aria-hidden", "true");
      }
    });

    return () => {
      Array.from(root.children).forEach((child) => {
        child.removeAttribute("inert");
        child.removeAttribute("aria-hidden");
      });
    };
  }, [open]);

  return (
    <div
      ref={sheetRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className="absolute inset-0 bg-gray-950/50"
        onClick={() => setOpen(false)}
      />
      {children}
    </div>
  );
}

function BottomSheetContent({ children }: IProps) {
  const { open } = useBottomSheet();

  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <BottomSheetOverlay>
      <div
        className={cn(
          "p-4 absolute bottom-0 w-full h-[62dvh] bg-background rounded-t-2xl transition-transform duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "translate-y-full opacity-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="w-12 h-1 rounded-md bg-gray-300 block m-auto mt-2"></span>
        {children}
      </div>
    </BottomSheetOverlay>,
    document.body
  );
}

export {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetClose,
};

// TODO: Improve BottomSheet
// - Esc key
// - Scroll lock
// - Accessibility
// - Drag to close
