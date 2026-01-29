"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type BadgeColor = "indigo" | "emerald" | "amber" | "sky" | "slate";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

const colorStyles: Record<BadgeColor, string> = {
  indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  sky: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  slate: "bg-white/[.06] text-slate-400 border-white/10",
};

export function Badge({
  color = "slate",
  children,
  className,
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border",
          colorStyles[color],
          pulse && "animate-pulse",
          className
        )
      )}
    >
      {children}
    </span>
  );
}
