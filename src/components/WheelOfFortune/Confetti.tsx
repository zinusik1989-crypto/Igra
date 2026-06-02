import { useMemo } from "react";

type ConfettiProps = {
  seed: number;
  accentColor?: string;
};

const DEFAULT_COLORS = ["#f472b6", "#a855f7", "#22d3ee", "#facc15", "#34d399", "#818cf8"];

function mixColors(accent: string): string[] {
  return [accent, accent, ...DEFAULT_COLORS];
}

export function Confetti({ seed, accentColor }: ConfettiProps) {
  const colors = accentColor ? mixColors(accentColor) : DEFAULT_COLORS;

  const { fall, burst } = useMemo(() => {
    const fallPieces = Array.from({ length: 140 }, (_, i) => ({
      id: `f-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 2,
      size: 5 + Math.random() * 9,
      color: colors[i % colors.length],
      drift: (Math.random() - 0.5) * 220,
      rotate: Math.random() * 720,
      round: Math.random() > 0.45,
    }));

    const burstPieces = Array.from({ length: 60 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 260;
      return {
        id: `b-${i}`,
        left: 50,
        top: 42,
        bx: Math.cos(angle) * dist + "px",
        by: Math.sin(angle) * dist + "px",
        delay: Math.random() * 0.15,
        size: 4 + Math.random() * 10,
        color: colors[i % colors.length],
        rotate: Math.random() * 540,
        round: Math.random() > 0.35,
      };
    });

    return { fall: fallPieces, burst: burstPieces };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, accentColor]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {fall.map((p) => (
        <span
          key={p.id}
          className={`absolute top-0 block ${p.round ? "rounded-full" : "rounded-[2px]"}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.4,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
            ["--drift" as string]: `${p.drift}px`,
            ["--rotate" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
      {burst.map((p) => (
        <span
          key={p.id}
          className={`absolute block ${p.round ? "rounded-full" : "rounded-[2px]"}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.4,
            backgroundColor: p.color,
            animation: `confetti-burst 1.8s ease-out ${p.delay}s forwards`,
            ["--bx" as string]: p.bx,
            ["--by" as string]: p.by,
            ["--rotate" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
