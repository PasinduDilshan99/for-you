"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RunawayButton } from "./RunawayButton";

type Stage = "wish" | "explain" | "question" | "accepted";

export function Day1Birthday({ onAccept }: { onAccept?: () => void }) {
  const [stage, setStage] = useState<Stage>("wish");
  const questionContainerRef = useRef<HTMLDivElement>(null!);
  const [dodgeCount, setDodgeCount] = useState(0);

  return (
    <div className="max-w-xl w-full mx-auto text-center px-6">
      <AnimatePresence mode="wait">
        {stage === "wish" && (
          <motion.div
            key="wish"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-rose-200/70 mb-4">
              A Special Day For A Special Person
            </p>
            <h1 className="text-4xl font-serif text-rose-50 mb-6 leading-tight">
              Happy Birthday
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-rose-100/90 leading-relaxed text-lg"
            >
              Today is a day to celebrate someone who brings happiness to the
              people around her. I hope your day is filled with smiles,
              laughter, and beautiful moments.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              onClick={() => setStage("explain")}
              className="mt-10 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {stage === "explain" && (
          <motion.div
            key="explain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-rose-100/90 text-lg leading-relaxed mb-3">
              This is not just a birthday message.
            </p>
            <p className="text-rose-100/70 leading-relaxed">
              This is the beginning of a small journey. Every day after 8:00 PM,
              a new page will appear.
            </p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={() => setStage("question")}
              className="mt-10 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-2xl font-serif text-rose-50 mb-2">
              Can I meet you today?
            </p>
            {dodgeCount > 2 && (
              <p className="text-rose-200/60 text-sm mb-4 italic">
                it seems no isn&apos;t an option today
              </p>
            )}
            <div
              ref={questionContainerRef}
              className="relative w-full h-40 mt-6"
            >
              <button
                onClick={() => setStage("accepted")}
                className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-full bg-rose-400/80 hover:bg-rose-400 text-white transition"
              >
                ❤️ Yes
              </button>
              <RunawayButton
                label="😢 No"
                containerRef={questionContainerRef}
                onEscape={() => setDodgeCount((c) => c + 1)}
              />
            </div>
          </motion.div>
        )}

        {stage === "accepted" && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl text-rose-50 mb-6 leading-relaxed">
              Thank you for saying yes. Some moments become special because of
              the people we share them with.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="italic text-rose-200/70 text-lg mb-10"
            >
              The stars are beautiful tonight.
            </motion.p>
            <button
              onClick={onAccept}
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition"
            >
              Continue →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
