"use client";
import { useRef } from "react";

// Листание пальцем: свайп влево — следующее, вправо — предыдущее.
export function useSwipe(onStep: (step: number) => void) {
  const startX = useRef<number | null>(null);
  return {
    onPointerDown: (e: React.PointerEvent) => { startX.current = e.clientX; },
    onPointerUp: (e: React.PointerEvent) => {
      if (startX.current === null) return;
      const dx = e.clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    },
  };
}
