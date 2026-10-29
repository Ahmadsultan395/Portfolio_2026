"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Maximum pointer-driven offset in pixels. */
  strength?: number;
  className?: string;
}

/**
 * Gentle pointer + scroll parallax using a single transform per frame.
 * Does nothing when the visitor prefers reduced motion.
 */
export function Parallax({ children, strength = 14, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;
    let x = 0;
    let y = 0;
    let scrollY = 0;

    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${(y + scrollY).toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onPointer = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * -strength;
      y = (event.clientY / window.innerHeight - 0.5) * -strength;
      schedule();
    };
    const onScroll = () => {
      scrollY = Math.min(window.scrollY, 900) * 0.07;
      schedule();
    };

    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
