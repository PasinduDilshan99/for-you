"use client";

export function CountdownTimer({ ms }: { ms: number }) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex gap-4 text-2xl font-light tracking-widest text-rose-100">
      {[h, m, s].map((val, i) => (
        <span key={i} className="drop-shadow-[0_0_8px_rgba(255,200,220,0.6)]">
          {pad(val)}
        </span>
      ))}
    </div>
  );
}