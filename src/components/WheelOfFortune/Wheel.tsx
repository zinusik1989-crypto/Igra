import { PRIZES, SECTOR_ANGLE } from "./prizes";
import { WheelLabels } from "./WheelLabels";
import { WheelDividers } from "./WheelDividers";
import { WheelLights } from "./WheelLights";
import { SpinLightRays } from "./SpinLightRays";

type WheelProps = {
  rotation: number;
  isSpinning: boolean;
  onSpin: () => void;
  disabled: boolean;
  winningIndex: number | null;
};

function buildConicGradient(): string {
  const stops = PRIZES.map((prize, i) => {
    const start = i * SECTOR_ANGLE;
    const end = (i + 1) * SECTOR_ANGLE;
    return `${prize.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

function buildHighlightGradient(index: number): string {
  const start = index * SECTOR_ANGLE;
  const end = (index + 1) * SECTOR_ANGLE;
  return `conic-gradient(from -90deg, transparent 0deg ${start}deg, rgba(255,255,255,0.5) ${start}deg ${end}deg, transparent ${end}deg 360deg)`;
}

function buildGoldenRing(index: number): string {
  const start = index * SECTOR_ANGLE;
  const end = (index + 1) * SECTOR_ANGLE;
  return `conic-gradient(from -90deg, transparent 0deg ${start}deg, rgba(251,191,36,0.85) ${start}deg ${end}deg, transparent ${end}deg 360deg)`;
}

export function Wheel({
  rotation,
  isSpinning,
  onSpin,
  disabled,
  winningIndex,
}: WheelProps) {
  const transitionDuration = isSpinning ? "4.5s" : "0s";
  const transitionTiming = isSpinning
    ? "cubic-bezier(0.17, 0.67, 0.12, 0.99)"
    : "ease";
  const pointerBounce = winningIndex !== null && !isSpinning;

  return (
    <div className="relative mx-auto aspect-square w-[85vw] max-w-[min(100%,420px)] sm:w-full">
      <WheelLights isSpinning={isSpinning} />
      <SpinLightRays active={isSpinning} />

      {/* Премиум-указатель */}
      <div
        className={`absolute left-1/2 top-0 z-20 -translate-x-1/2 ${
          pointerBounce ? "animate-pointer-bounce" : ""
        }`}
        aria-hidden
      >
        <svg width={32} height={36} viewBox="0 0 32 36" className="drop-shadow-[0_4px_12px_rgba(244,114,182,0.7)]">
          <defs>
            <linearGradient id="ptrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M16 2 L28 30 Q16 24 4 30 Z"
            fill="url(#ptrGrad)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={1}
          />
          <ellipse cx={16} cy={10} rx={4} ry={2} fill="rgba(255,255,255,0.45)" />
        </svg>
        <div className="mx-auto mt-0.5 h-2 w-6 rounded-full bg-black/30 blur-sm" />
      </div>

      {/* Металлический 3D-обод */}
      <div
        className={`wheel-rim-3d absolute inset-0 rounded-full p-[5px] ${
          isSpinning ? "animate-aura-pulse" : ""
        }`}
      >
        <div className="h-full w-full rounded-full bg-[#1a1030]/90 p-2 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]">
          <div
            className={`relative h-full w-full rounded-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),inset_0_-4px_12px_rgba(0,0,0,0.35)] transition-[filter] duration-300 ${
              isSpinning ? "blur-[2px] brightness-110" : ""
            }`}
            style={{
              background: buildConicGradient(),
              transform: `rotate(${rotation}deg)`,
              transition: `transform ${transitionDuration} ${transitionTiming}`,
            }}
          >
            {winningIndex !== null && !isSpinning && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 animate-[pulse_1.1s_ease-in-out_infinite] rounded-full"
                  style={{ background: buildHighlightGradient(winningIndex) }}
                />
                <div
                  className="pointer-events-none absolute inset-0 animate-[pulse_1.1s_ease-in-out_infinite] rounded-full"
                  style={{ background: buildGoldenRing(winningIndex) }}
                />
              </>
            )}

            <WheelDividers />
            <WheelLabels />
          </div>
        </div>
      </div>

      {/* Кольцо прогресса при вращении */}
      {isSpinning && (
        <svg
          className="pointer-events-none absolute inset-0 z-[25] h-full w-full -rotate-90 animate-spin-slow"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle
            cx={50}
            cy={50}
            r={46}
            fill="none"
            stroke="url(#spinGrad)"
            strokeWidth={2}
            strokeDasharray="40 240"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* GO + зарядка */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        {!disabled && !isSpinning && (
          <div className="absolute inset-0 -m-3 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-pink-400/30" />
        )}
        <button
          type="button"
          onClick={onSpin}
          disabled={disabled}
          className={`relative flex h-[22%] min-h-[56px] w-[22%] min-w-[56px] items-center justify-center rounded-full bg-gradient-to-br from-[#f472b6] to-[#a855f7] text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_4px_24px_rgba(168,85,247,0.5),inset_0_2px_4px_rgba(255,255,255,0.25)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs ${
            isSpinning ? "animate-pulse" : ""
          }`}
          aria-label="Крутить колесо"
        >
          {disabled ? "…" : "GO"}
        </button>
      </div>
    </div>
  );
}
