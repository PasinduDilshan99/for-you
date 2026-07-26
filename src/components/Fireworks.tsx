"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { RunawayButton } from "./RunawayButton";

type Stage = "wish" | "explain" | "question" | "accepted";

// ---------- Shared styles ----------
const GHOST_BUTTON_CLASS =
  "px-7 py-3 rounded-full bg-white/10 border border-white/20 text-rose-100 hover:bg-white/20 transition-all duration-300 cursor-pointer";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

// ---------- Celebration effect ----------
const FIREWORK_COLORS = ["#f4b8c9", "#fbe0e8", "#c084fc", "#fda4af", "#fde68a"];

function FireworkBurst({
  x,
  y,
  delay,
}: {
  x: string;
  y: string;
  delay: number;
}) {
  const particles = Array.from({ length: 14 });
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 55 + ((i * 37) % 40); // deterministic, no hydration mismatch
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const color = FIREWORK_COLORS[i % FIREWORK_COLORS.length];
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, x: dx, y: dy, scale: 1 }}
            transition={{ duration: 0.9, delay, ease: SOFT_EASE }}
            className="absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          />
        );
      })}
    </div>
  );
}

function Fireworks() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const bursts = [
    { x: "20%", y: "30%", delay: 0 },
    { x: "78%", y: "25%", delay: 0.15 },
    { x: "50%", y: "42%", delay: 0.3 },
    { x: "32%", y: "60%", delay: 0.45 },
    { x: "68%", y: "55%", delay: 0.55 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bursts.map((b, i) => (
        <FireworkBurst key={i} x={b.x} y={b.y} delay={b.delay} />
      ))}
    </div>
  );
}

function CelebrationPopup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="fixed left-1/2 top-[22%] -translate-x-1/2 z-50 px-6 py-3 rounded-2xl
        bg-white/10 border border-white/20 backdrop-blur-md
        text-rose-100 text-lg font-serif shadow-[0_8px_30px_-6px_rgba(0,0,0,0.4)]"
    >
      Yay! 🎉
    </motion.div>
  );
}

// ---------- Shared animation variants ----------
const slideVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const readContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 1.1, delayChildren: 0.5 },
  },
};

const readItem: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: SOFT_EASE },
  },
};

const revealAfter = (delaySeconds: number): Variants => ({
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: delaySeconds, duration: 0.6, ease: SOFT_EASE },
  },
});

const WISH_LINES = [
  "Today is all about celebrating someone truly wonderful.",
  "I hope this new year of your life brings countless reasons to smile, beautiful memories to treasure, and the courage to chase every dream you hold close to your heart.",
  "May every sunrise bring you hope, every sunset leave you with peace, and every day remind you how special you are to the people around you.",
  "Most importantly, I hope today is filled with laughter, unforgettable moments, delicious cake, and everything that makes birthdays magical.",
];

export function Day1Birthday({ onAccept }: { onAccept?: () => void }) {
  const [stage, setStage] = useState<Stage>("wish");
  const questionContainerRef = useRef<HTMLDivElement>(null!);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleYesClick = () => {
    setStage("accepted");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1600);
  };

  return (
    <div className="max-w-2xl w-full mx-auto text-center px-6">
      <AnimatePresence>{showPopup && <CelebrationPopup />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === "wish" && (
          <motion.div
            key="wish"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
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
              transition={{ ...readItem.animate, delay: 0.15 } as never}
              className="text-5xl font-serif text-rose-50 mb-8 leading-tight"
            >
              Happy Birthday! 🎂
            </motion.h1>

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
              variants={revealAfter(0.5 + WISH_LINES.length * 1.1 + 0.6)}
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
            transition={{ duration: 0.8 }}
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
                I wanted to give you something a little different this year.
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
              variants={revealAfter(0.5 + 4 * 1.1 + 0.6)}
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
            transition={{ duration: 0.6 }}
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
              transition={{ ...readItem.animate, delay: 0.35 } as never}
              className="text-rose-100/70 mb-8"
            >
              I have something small for you. 😊
            </motion.p>

            {dodgeCount >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: SOFT_EASE }}
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
                onClick={handleYesClick}
                className="
                  absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2
                  px-8 py-3.5 rounded-full font-medium tracking-wide cursor-pointer
                  text-white
                  bg-gradient-to-br from-rose-400 to-rose-600
                  shadow-[0_8px_30px_-6px_rgba(244,63,94,0.5)]
                  border border-white/10
                  hover:from-rose-400 hover:to-rose-500
                  hover:shadow-[0_10px_36px_-6px_rgba(244,63,94,0.65)]
                  hover:scale-[1.04]
                  active:scale-[0.97]
                  transition-all duration-300 ease-out
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-rose-200 focus-visible:outline-offset-2
                "
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
            transition={{ duration: 0.8, ease: SOFT_EASE }}
          >
            <Fireworks />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>

            <motion.h2
              variants={readItem}
              initial="initial"
              animate="animate"
              transition={{ ...readItem.animate, delay: 0.4 } as never}
              className="text-3xl font-serif text-rose-50 mb-6"
            >
              Thank You 😊
            </motion.h2>

            <motion.div
              variants={readContainer}
              initial="initial"
              animate="animate"
              transition={{ delayChildren: 0.6, staggerChildren: 1.1 }}
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
              variants={revealAfter(0.6 + 3 * 1.1 + 0.3)}
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
              variants={revealAfter(0.6 + 3 * 1.1 + 0.9)}
              initial="initial"
              animate="animate"
              className="text-sm text-rose-200/60 mb-10"
            >
              📖 Chapter 1 of 9
            </motion.p>

            <motion.div
              variants={revealAfter(0.6 + 3 * 1.1 + 1.3)}
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
