"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Chapter } from "@/lib/chapters";

export function StoryBook({ chapter }: { chapter: Chapter }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.day}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -80, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-xl mx-auto p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-rose-200/70 mb-2">
          {chapter.theme}
        </p>
        <h1 className="text-3xl font-serif text-rose-50 mb-6">{chapter.title}</h1>

        <div className="space-y-4 text-rose-100/90 leading-relaxed">
          {chapter.content.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.4 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {chapter.cards && (
          <div className="grid grid-cols-2 gap-3 mt-6">
            {chapter.cards.map((card, i) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-rose-100/90 text-sm"
              >
                ✨ {card}
              </motion.div>
            ))}
          </div>
        )}

        {chapter.poetry && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + chapter.content.length * 0.4 }}
            className="mt-8 text-center italic text-rose-200/70 text-lg tracking-wide"
          >
            {chapter.poetry}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}