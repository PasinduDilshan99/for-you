"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Figure, journeyBoyX } from "@/components/JourneyAnimation";

type Stage = "intro" | "reveal" | "closing";

export function Day9Confession({ totalDays = 9 }: { totalDays?: number }) {
  const [stage, setStage] = useState<Stage>("intro");

  const startX = journeyBoyX(totalDays - 1, totalDays); // where he stood on day 8
  const finalX = journeyBoyX(totalDays, totalDays); // right in front of her
  const hasArrived = stage !== "intro";

  return (
    <div className="max-w-xl w-full mx-auto text-center px-6">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-rose-200/70 mb-4">
              The Confession Day
            </p>
            <h1 className="text-3xl font-serif text-rose-50 mb-8 leading-tight">
              The Words I Finally Said
            </h1>
            <div className="space-y-4 text-rose-100/90 leading-relaxed text-lg">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                For a long time, there was something I wanted to tell you.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Today, I finally found the courage to say it.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
              >
                Thank you for listening to my heart.
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.4 }}
              onClick={() => setStage("reveal")}
              className="mt-10 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {stage === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <svg viewBox="0 0 640 200" className="w-full max-w-2xl mx-auto">
              <line
                x1="20"
                y1="158"
                x2="620"
                y2="158"
                stroke="rgba(255,255,255,0.15)"
              />

              <g transform="translate(560, 158)">
                <Figure variant="girl" />
              </g>

              <motion.g
                initial={{ x: startX, y: 158 }}
                animate={{ x: finalX, y: 158 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <motion.g initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                  {hasArrived && (
                    <motion.g
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      <PoseSwitcher />
                    </motion.g>
                  )}
                </motion.g>
              </motion.g>
            </svg>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="text-4xl mt-4 mb-4"
            >
              ❤️
            </motion.p>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.7 }}
              className="text-3xl font-serif text-rose-50 mb-10"
            >
              I love you.
            </motion.h2>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.6 }}
              onClick={() => setStage("closing")}
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {stage === "closing" && (
          <motion.div
            key="closing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-rose-100/90 text-lg leading-relaxed mb-8">
              No matter what happens, I am grateful for every smile, every
              conversation, and every moment we shared.
            </p>
            <p className="italic text-rose-200/70 text-lg">
              &quot;The moon is beautiful, isn&apos;t it?&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// swaps from standing to kneeling shortly after arrival, timed with the walk
function PoseSwitcher() {
  const [kneeling, setKneeling] = useState(false);

  useState(() => {
    const t = setTimeout(() => setKneeling(true), 100);
    return () => clearTimeout(t);
  });

  return (
    <Figure
      variant="boy"
      pose={kneeling ? "kneel" : "stand"}
      isWalking={!kneeling}
    />
  );
}
