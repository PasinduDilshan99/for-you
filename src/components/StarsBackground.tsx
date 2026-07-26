"use client";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Petal {
  x: number;
  y: number;
  duration: number;
  delay: number;
  xOffset: number;
}

// Deterministic seed-based random generator
function createSeededRandom(seed: number) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Generate stars with a fixed seed for consistency
function generateStars(count: number): Star[] {
  const rng = createSeededRandom(12345);
  return Array.from({ length: count }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    size: rng() * 2 + 1,
    delay: rng() * 4,
    duration: rng() * 3 + 2,
  }));
}

// Generate petals with a different seed
function generatePetals(count: number): Petal[] {
  const rng = createSeededRandom(67890);
  return Array.from({ length: count }, (_, i) => ({
    x: rng() * 100,
    y: -5 - rng() * 10,
    duration: 18 + rng() * 8,
    delay: i * 2 + rng() * 0.5,
    xOffset: (i % 2 === 0 ? 1 : -1) * (20 + rng() * 30),
  }));
}

export function StarsBackground({ count = 80, petalCount = 6 }: { count?: number; petalCount?: number }) {
  // Generate stable data once using useMemo
  const stars = useMemo(() => generateStars(count), [count]);
  const petals = useMemo(() => generatePetals(petalCount), [petalCount]);

  // Option 1: Use a ref to track client-side mounting (recommended)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Use setTimeout to defer the state update
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    // Return a placeholder with the same dimensions during SSR
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-rose-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
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
      {petals.map((petal, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-2 h-2 rounded-full bg-pink-300/40 blur-[1px]"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.xOffset],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}