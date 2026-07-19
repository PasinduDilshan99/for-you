"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

// Generate stars outside the component - runs once when module loads
function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));
}

export function StarsBackground({ count = 80 }: { count?: number }) {
  // This will be stable across renders since generateStars runs once
  const stars = useMemo(() => generateStars(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-rose-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: "0 0 6px rgba(255, 228, 235, 0.8)",
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Petals with stable positions */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-2 h-2 rounded-full bg-pink-300/40 blur-[1px]"
          style={{ left: `${(i * 17) % 100}%`, top: "-5%" }}
          animate={{ y: ["0vh", "110vh"], x: [0, i % 2 === 0 ? 30 : -30] }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
