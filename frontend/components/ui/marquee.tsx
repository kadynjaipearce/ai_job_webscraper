"use client";

import React from "react";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  speed?: number; // seconds for full loop
};

export default function Marquee({
  children,
  className = "",
  pauseOnHover = false,
  speed = 18,
}: MarqueeProps) {
  const duration = `${speed}s`;

  return (
    <div
      className={`marquee overflow-hidden ${className}`}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <div
        className={`marquee-track flex items-center gap-3 ${
          pauseOnHover ? "marquee-pause" : ""
        }`}
      >
        <div className="flex items-center gap-3">{children}</div>
        <div className="flex items-center gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
