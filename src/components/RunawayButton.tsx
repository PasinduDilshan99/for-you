"use client";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface RunawayButtonProps {
  label: string;
  onEscape?: () => void; // called each time it dodges, if you want a fun counter
  containerRef: React.RefObject<HTMLElement>;
}

const THRESHOLD = 90; // px — how close the cursor can get before it flees
const BUTTON_W = 120;
const BUTTON_H = 48;

export function RunawayButton({
  label,
  onEscape,
  containerRef,
}: RunawayButtonProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const hasPositioned = useRef(false);

  const dodge = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - BUTTON_W;
    const maxY = rect.height - BUTTON_H;

    setPos({
      x: Math.random() * Math.max(maxX, 0),
      y: Math.random() * Math.max(maxY, 0),
    });
    onEscape?.();
  }, [containerRef, onEscape]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      const btn = btnRef.current;
      if (!container || !btn) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      // place it on first real pointer movement so it doesn't start at (0,0)
      if (!hasPositioned.current) {
        dodge();
        hasPositioned.current = true;
        return;
      }

      const btnCenterX = btnRect.left + btnRect.width / 2 - containerRect.left;
      const btnCenterY = btnRect.top + btnRect.height / 2 - containerRect.top;
      const pointerX = e.clientX - containerRect.left;
      const pointerY = e.clientY - containerRect.top;

      const dist = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);
      if (dist < THRESHOLD) dodge();
    },
    [containerRef, dodge],
  );

  return (
    <div onPointerMove={handlePointerMove} className="relative w-full h-full">
      <motion.button
        ref={btnRef}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ position: "absolute", width: BUTTON_W, height: BUTTON_H }}
        className="rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 backdrop-blur-sm"
      >
        {label}
      </motion.button>
    </div>
  );
}
