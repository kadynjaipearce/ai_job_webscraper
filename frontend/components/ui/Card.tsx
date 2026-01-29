"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  children,
  className,
  variant = "dark",
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          variant === "dark" ? "glass-strong" : "glass-light",
          hover && "hover:-translate-y-0.5 hover:shadow-xl",
          "transition-all duration-300",
          glow && "glow-indigo",
          className
        )
      )}
    >
      {children}
    </div>
  );
}
