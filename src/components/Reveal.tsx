"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "fade-up" | "fade-down";
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  once = true,
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
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -25% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const baseClasses =
    "transition-all duration-500 ease-out will-change-transform transform-gpu motion-reduce:transition-none";
  const hiddenClasses =
    variant === "fade"
      ? "opacity-0 motion-reduce:opacity-100"
      : variant === "fade-down"
      ? "opacity-0 -translate-y-2 motion-reduce:opacity-100 motion-reduce:transform-none"
      : "opacity-0 translate-y-2 motion-reduce:opacity-100 motion-reduce:transform-none"; // fade-up default
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


