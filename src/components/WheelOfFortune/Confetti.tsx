import { useMemo } from "react";

type ConfettiProps = {
  /** Меняйте ключ (например, на счётчик прокруток), чтобы перезапустить анимацию */
  seed: number;
  count?: number;
};

const COLORS = ["#f472b6", "#a855f7", "#22d3ee", "#facc15", "#34d399", "#818cf8"];

export function Confetti({ seed, count = 80 }: ConfettiProps) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.5;
      const duration = 2.4 + Math.random() * 1.8;
      const size = 6 + Math.random() * 8;
      const color = COLORS[i % COLORS.length];
      const drift = (Math.random() - 0.5) * 160;
      const rotate = Math.random() * 360;
      return { id: i, left, delay, duration, size, color, drift, rotate };
    });
    // seed форсирует пересоздание набора при новой прокрутке
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.4}px`,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
            // CSS-переменные для keyframes
            ["--drift" as string]: `${p.drift}px`,
            ["--rotate" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translate(0, -10%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--drift), 105vh) rotate(var(--rotate));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
