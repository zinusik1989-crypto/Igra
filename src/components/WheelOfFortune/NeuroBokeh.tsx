import { useMemo } from "react";

export function NeuroBokeh() {
  const blobs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        size: 80 + Math.random() * 160,
        hue: (i * 47) % 360,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {blobs.map((b) => (
        <div
          key={b.id}
          className="absolute animate-neuro-float rounded-full opacity-30 blur-3xl"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, hsla(${b.hue}, 80%, 65%, 0.35) 0%, transparent 70%)`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
