"use client";
import { useEffect, useState } from "react";
import { chapters, Chapter } from "./chapters";

export function useChapterUnlock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const unlocked = chapters.filter((c) => new Date(c.unlockAt) <= now);
  const nextChapter = chapters.find((c) => new Date(c.unlockAt) > now) ?? null;
  const msUntilNext = nextChapter
    ? new Date(nextChapter.unlockAt).getTime() - now.getTime()
    : null;

  return { unlocked, nextChapter, msUntilNext };
}