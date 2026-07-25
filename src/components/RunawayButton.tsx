"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface RunawayButtonProps {
  label: string;
  onEscape?: () => void;
  containerRef: React.RefObject<HTMLElement | null>;
}

const THRESHOLD = 90;
const BUTTON_W = 120;
const BUTTON_H = 48;
const COOLDOWN_MS = 350; // prevents re-triggering mid-flight, keeps motion smooth

export function RunawayButton({
  label,
  onEscape,
  containerRef,
}: RunawayButtonProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastDodge = useRef(0);

  const dodge = useCallback(() => {
    const now = Date.now();
    if (now - lastDodge.current < COOLDOWN_MS) return;
    lastDodge.current = now;

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const maxX = Math.max(rect.width - BUTTON_W, 0);
    const maxY = Math.max(rect.height - BUTTON_H, 0);

    setPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    onEscape?.();
  }, [containerRef, onEscape]);

  // Place it sensibly on mount instead of letting it flash at (0,0)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setPos({
      x: Math.max(rect.width - BUTTON_W - 24, 0), // starts near the right side
      y: Math.max(rect.height / 2 - BUTTON_H / 2, 0),
    });
  }, [containerRef]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return; // touch is handled by onPointerDown below
      const container = containerRef.current;
      const btn = btnRef.current;
      if (!container || !btn) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

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
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-full"
      style={{ touchAction: "none" }}
    >
      <motion.button
        ref={btnRef}
        aria-label="No (this one likes to run away)"
        animate={pos ? { x: pos.x, y: pos.y, opacity: 1 } : { opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
        onPointerDown={(e) => {
          // Touch devices: dodge on tap instead of relying on hover proximity
          if (e.pointerType === "touch") {
            e.preventDefault();
            dodge();
          }
        }}
        style={{ position: "absolute", width: BUTTON_W, height: BUTTON_H }}
        className="rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 backdrop-blur-sm cursor-pointer select-none"
      >
        {label}
      </motion.button>
    </div>
  );
}
