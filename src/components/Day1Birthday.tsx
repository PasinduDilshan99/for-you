"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { RunawayButton } from "./RunawayButton";

type Stage = "wish" | "explain" | "question" | "accepted";

// ---------- Shared styles ----------
const GHOST_BUTTON_CLASS =
  "px-7 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition-all duration-300";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

// ---------- Shared animation variants ----------

// Whole-stage slide (used for stage transitions) - SLOWER
const slideVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

// Container that staggers its children — SLOWER stagger
const readContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.85, // Increased from 0.55
      delayChildren: 0.5, // Increased from 0.3
    },
  },
};

// Each paragraph/line rises + un-blurs - SLOWER
const readItem: Variants = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: SOFT_EASE }, // Increased from 0.7
  },
};

// A button/element that appears after everything above - SLOWER reveal
const revealAfter = (delaySeconds: number): Variants => ({
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: delaySeconds + 0.4, duration: 0.8, ease: SOFT_EASE }, // Added extra delay
  },
});

// ---------- Copy, split into individual paragraphs for staggered reveal ----------
const WISH_LINES = [
  "Today is all about celebrating someone truly wonderful.",
  "I hope this new year of your life brings countless reasons to smile, beautiful memories to treasure, and the courage to chase every dream you hold close to your heart.",
  "May every sunrise bring you hope, every sunset leave you with peace, and every day remind you how special you are to the people around you.",
  "Most importantly, I hope today is filled with laughter, unforgettable moments, delicious cake, and everything that makes birthdays magical.",
];

const EXPLAIN_LINES = [
  "I wanted to give you something a little different this year.",
];

export function Day1Birthday({ onAccept }: { onAccept?: () => void }) {
  const [stage, setStage] = useState<Stage>("wish");
  const questionContainerRef = useRef<HTMLDivElement>(null!);
  const [dodgeCount, setDodgeCount] = useState(0);

  return (
    <div className="max-w-2xl w-full mx-auto text-center px-6">
      <AnimatePresence mode="wait">
        {stage === "wish" && (
          <motion.div
            key="wish"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.0 }} // Increased from 0.8
          >
            <motion.p
              variants={readItem}
              initial="initial"
              animate="animate"
              className="text-sm uppercase tracking-[0.35em] text-rose-200/70 mb-4"
            >
              Chapter One • Happy Birthday
            </motion.p>

            <motion.h1
              variants={readItem}
              initial="initial"
              animate="animate"
              transition={{ ...readItem.animate, delay: 0.3 } as never} // Increased delay
              className="text-5xl font-serif text-rose-50 mb-8 leading-tight"
            >
              Happy Birthday! 🎂
            </motion.h1>

            {/* Paragraphs reveal one at a time, reading-mode style */}
            <motion.div
              variants={readContainer}
              initial="initial"
              animate="animate"
              className="text-lg text-rose-100/90 leading-9 space-y-6"
            >
              {WISH_LINES.map((line, i) => (
                <motion.p key={i} variants={readItem}>
                  {line}
                </motion.p>
              ))}
            </motion.div>

            <motion.button
              variants={revealAfter(0.5 + WISH_LINES.length * 0.85 + 1.0)}
              initial="initial"
              animate="animate"
              onClick={() => setStage("explain")}
              className={`mt-12 ${GHOST_BUTTON_CLASS}`}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {stage === "explain" && (
          <motion.div
            key="explain"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.0 }}
          >
            <motion.h2
              variants={readItem}
              initial="initial"
              animate="animate"
              className="text-3xl font-serif text-rose-50 mb-8"
            >
              A Small Journey
            </motion.h2>

            <motion.div
              variants={readContainer}
              initial="initial"
              animate="animate"
              className="text-left sm:text-center space-y-6"
            >
              <motion.p
                variants={readItem}
                className="text-lg text-rose-100/90 leading-9"
              >
                {EXPLAIN_LINES[0]}
              </motion.p>

              <motion.p
                variants={readItem}
                className="text-rose-100/75 leading-8"
              >
                Instead of a single birthday message, I created a little journey
                just for you. Think of it as a storybook where a new page
                appears every evening after{" "}
                <span className="text-rose-200 font-semibold">8:00 PM</span>.
              </motion.p>

              <motion.p
                variants={readItem}
                className="text-rose-100/75 leading-8"
              >
                Every chapter has something different waiting for you. Some
                pages may make you smile, some may make you laugh, and some may
                simply become beautiful memories.
              </motion.p>

              <motion.p
                variants={readItem}
                className="text-rose-100/75 leading-8"
              >
                I hope you&apos;ll enjoy every page of this little story.
              </motion.p>
            </motion.div>

            <motion.button
              variants={revealAfter(0.5 + 4 * 0.85 + 1.0)}
              initial="initial"
              animate="animate"
              onClick={() => setStage("question")}
              className={`mt-12 ${GHOST_BUTTON_CLASS}`}
            >
              One More Thing →
            </motion.button>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div
            key="question"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.h2
              variants={readItem}
              initial="initial"
              animate="animate"
              className="text-4xl font-serif text-rose-50 mb-4"
            >
              Would you like to meet me today?
            </motion.h2>

            <motion.p
              variants={readItem}
              initial="initial"
              animate="animate"
              transition={{ ...readItem.animate, delay: 0.5 } as never}
              className="text-rose-100/70 mb-8"
            >
              I have something small for you. 😊
            </motion.p>

            {dodgeCount >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: SOFT_EASE }}
                className="text-sm italic text-rose-200/60 mb-6"
              >
                Looks like the No button is feeling a little shy today. 🤭
              </motion.p>
            )}

            <div
              ref={questionContainerRef}
              className="relative w-full h-44 mt-4"
            >
              <button
                onClick={() => setStage("accepted")}
                className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 px-7 py-3 rounded-full bg-rose-500 hover:bg-rose-600 transition text-white shadow-lg"
              >
                ❤️ Yes
              </button>

              <RunawayButton
                label="😢 No"
                containerRef={questionContainerRef}
                onEscape={() => setDodgeCount((count) => count + 1)}
              />
            </div>
          </motion.div>
        )}

        {stage === "accepted" && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: SOFT_EASE }} // Increased from 0.8
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 80,
                damping: 15,
              }} // Slower spring
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>

            <motion.h2
              variants={readItem}
              initial="initial"
              animate="animate"
              transition={{ ...readItem.animate, delay: 0.6 } as never}
              className="text-3xl font-serif text-rose-50 mb-6"
            >
              Thank You 😊
            </motion.h2>

            <motion.div
              variants={readContainer}
              initial="initial"
              animate="animate"
              transition={{ delayChildren: 0.8, staggerChildren: 0.85 }}
              className="text-lg text-rose-100/90 leading-9 mb-8 space-y-4"
            >
              <motion.p variants={readItem}>
                I was secretly hoping you&apos;d say{" "}
                <span className="font-semibold">Yes.</span>
              </motion.p>
              <motion.p variants={readItem}>
                I hope today becomes another beautiful memory, and I truly hope
                you have one of the happiest birthdays ever.
              </motion.p>
              <motion.p variants={readItem}>
                Thank you for taking the first step into this little journey.
              </motion.p>
            </motion.div>

            <motion.div
              variants={revealAfter(0.8 + 3 * 0.85 + 0.5)}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <p className="italic text-2xl text-rose-200">
                The world seems brighter today.
              </p>
              <p className="mt-3 text-xs text-rose-200/30 italic tracking-wide">
                Some words reveal their true meaning only with time.
              </p>
            </motion.div>

            <motion.p
              variants={revealAfter(0.8 + 3 * 0.85 + 1.2)}
              initial="initial"
              animate="animate"
              className="text-sm text-rose-200/60 mb-10"
            >
              📖 Chapter 1 of 9
            </motion.p>

            <motion.div
              variants={revealAfter(0.8 + 3 * 0.85 + 1.8)}
              initial="initial"
              animate="animate"
            >
              <button onClick={onAccept} className={GHOST_BUTTON_CLASS}>
                See You Tomorrow →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
