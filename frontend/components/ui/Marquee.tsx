"use client";

import React from "react";
import { clsx } from "clsx";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  speed?: number;
}

export function Marquee({
  children,
  className = "",
  pauseOnHover = false,
  speed = 25,
}: MarqueeProps) {
  return (
    <div
      className={clsx("marquee overflow-hidden", className)}
      style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={clsx(
          "marquee-track flex items-center gap-4",
          pauseOnHover && "marquee-pause"
        )}
      >
        <div className="flex items-center gap-4 shrink-0">{children}</div>
        <div className="flex items-center gap-4 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
