"use client";
import { useEffect, useState, useRef } from "react";
import { useChapterUnlock } from "@/lib/useChapterUnlock";
import { CountdownTimer } from "@/components/CountdownTimer";
import { JourneyAnimation } from "@/components/JourneyAnimation";
import { StarsBackground } from "../components/StarsBackground";
import { Day1Birthday } from "../components/Day1Birthday";
import { Day9Confession } from "../components/Day9Confession";
import { StoryBook } from "@/components/StoryBook";

const TOTAL_DAYS = 9;

export default function Home() {
  const { unlocked, msUntilNext, nextChapter } = useChapterUnlock();
  const [viewIndex, setViewIndex] = useState(0);
  const prevUnlockedLength = useRef(0);

  useEffect(() => {
    // Only update if new chapters were added
    if (unlocked.length > prevUnlockedLength.current && unlocked.length > 0) {
      setViewIndex(unlocked.length - 1);
    }
    prevUnlockedLength.current = unlocked.length;
  }, [unlocked.length]);

  const current = unlocked[viewIndex] ?? null;
  const isSpecialDay = current?.day === 1 || current?.day === 9;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#1a0f2e] via-[#2d1b4e] to-[#1a0f2e] flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      <StarsBackground />

      {current ? (
        <>
          {current.day === 1 && (
            <Day1Birthday onAccept={() => setViewIndex(0)} />
          )}
          {current.day === 9 && <Day9Confession totalDays={TOTAL_DAYS} />}
          {!isSpecialDay && <StoryBook chapter={current} />}

          {current.day !== 9 && (
            <div className="mt-8">
              <JourneyAnimation day={current.day} totalDays={TOTAL_DAYS} />
            </div>
          )}

          {unlocked.length > 1 && (
            <div className="flex items-center gap-6 mt-6 text-rose-200/80 z-10">
              <button
                disabled={viewIndex === 0}
                onClick={() => setViewIndex(Math.max(0, viewIndex - 1))}
                className="disabled:opacity-20 hover:text-white transition"
              >
                ← Previous
              </button>
              <span className="text-xs tracking-widest">
                Day {current.day} · {viewIndex + 1} / {unlocked.length}
              </span>
              <button
                disabled={viewIndex === unlocked.length - 1}
                onClick={() =>
                  setViewIndex(Math.min(unlocked.length - 1, viewIndex + 1))
                }
                className="disabled:opacity-20 hover:text-white transition"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-rose-100">Your story hasn&apos;t begun yet...</p>
      )}

      {nextChapter && msUntilNext && msUntilNext > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3 z-10">
          <p className="text-rose-200/70 text-sm">Next chapter unlocks in</p>
          <CountdownTimer ms={msUntilNext} />
        </div>
      )}
    </main>
  );
}
