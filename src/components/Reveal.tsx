"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "fade-up" | "fade-down";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const baseClasses =
    "transition-all duration-700 ease-out will-change-transform";
  const hiddenClasses =
    variant === "fade"
      ? "opacity-0"
      : variant === "fade-down"
      ? "opacity-0 -translate-y-4"
      : "opacity-0 translate-y-4"; // fade-up default
  const shownClasses = "opacity-100 translate-y-0";

  const style = delay ? ({ transitionDelay: `${delay}ms` } as const) : undefined;

  return (
    <div
      ref={containerRef}
      style={style}
      className={`${baseClasses} ${isVisible ? shownClasses : hiddenClasses} ${className}`}
    >
      {children}
    </div>
  );
}


