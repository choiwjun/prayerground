"use client";

import { Drawer } from "vaul";

import { cn } from "@/lib/utils";

export const BottomSheet = Drawer.Root;
export const BottomSheetTrigger = Drawer.Trigger;
export const BottomSheetPortal = Drawer.Portal;
export const BottomSheetClose = Drawer.Close;

export function BottomSheetContent({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Drawer.Content>) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Content
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-surface px-4 pb-8 pt-4 shadow-lg",
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
}
