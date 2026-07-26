"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface RunawayButtonProps {
  label: string;
  onEscape?: () => void;
  containerRef: React.RefObject<HTMLElement | null>;
}

const THRESHOLD = 90;
const BUTTON_W = 128;
const BUTTON_H = 52;
const COOLDOWN_MS = 350;

export function RunawayButton({
  label,
  onEscape,
  containerRef,
}: RunawayButtonProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dodgeTick, setDodgeTick] = useState(0);
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
    setDodgeTick((t) => t + 1);
    onEscape?.();
  }, [containerRef, onEscape]);

  // Initial placement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setPos({
      x: Math.max(rect.width - BUTTON_W - 24, 0),
      y: Math.max(rect.height / 2 - BUTTON_H / 2, 0),
    });
  }, [containerRef]);

  // Attach pointer tracking directly to the container — NO overlay div,
  // so nothing sits on top of the Yes button and blocks clicks.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const btn = btnRef.current;
      if (!btn) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      const btnCenterX = btnRect.left + btnRect.width / 2 - containerRect.left;
      const btnCenterY = btnRect.top + btnRect.height / 2 - containerRect.top;
      const pointerX = e.clientX - containerRect.left;
      const pointerY = e.clientY - containerRect.top;

      const dist = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);
      if (dist < THRESHOLD) dodge();
    };

    container.addEventListener("pointermove", handleMove);
    return () => container.removeEventListener("pointermove", handleMove);
  }, [containerRef, dodge]);

  const rotation = ((dodgeTick * 37) % 17) - 8;

  return (
    <motion.button
      ref={btnRef}
      aria-label="No (this one likes to run away)"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        pos
          ? { x: pos.x, y: pos.y, opacity: 1, scale: 1, rotate: rotation }
          : { opacity: 0, scale: 0.6 }
      }
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{
        x: { type: "spring", stiffness: 260, damping: 22, mass: 0.8 },
        y: { type: "spring", stiffness: 260, damping: 22, mass: 0.8 },
        rotate: { type: "spring", stiffness: 200, damping: 14 },
        opacity: { duration: 0.4 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") {
          e.preventDefault();
          dodge();
        }
      }}
      style={{
        position: "absolute",
        width: BUTTON_W,
        height: BUTTON_H,
        touchAction: "none",
      }}
      className="
        group flex items-center justify-center gap-1.5
        rounded-full font-medium text-[15px] tracking-wide
        text-rose-100/90 select-none cursor-default
        bg-white/[0.07] backdrop-blur-md
        border border-white/[0.14]
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)]
        hover:bg-white/[0.12] hover:border-white/25
        hover:shadow-[0_6px_24px_-4px_rgba(244,184,201,0.25)]
        active:bg-white/[0.16]
        transition-colors duration-300
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-rose-300 focus-visible:outline-offset-2
      "
    >
      <span aria-hidden>{label}</span>
    </motion.button>
  );
}