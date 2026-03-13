"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "홈", icon: Home },
  { href: "/map", label: "지도", icon: Compass },
  { href: "#", label: "마이", icon: UserRound, disabled: true }
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto grid max-w-screen-md grid-cols-3 px-4 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs transition",
                isActive ? "text-primary" : "text-muted",
                item.disabled ? "cursor-not-allowed opacity-50" : "hover:bg-primary/5"
              )}
              href={item.disabled ? "#" : item.href}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
