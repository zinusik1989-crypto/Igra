import { PRIZES, SECTOR_ANGLE } from "./prizes";

type WheelProps = {
  rotation: number;
  isSpinning: boolean;
  onSpin: () => void;
  disabled: boolean;
};

function buildConicGradient(): string {
  const stops = PRIZES.map((prize, i) => {
    const start = i * SECTOR_ANGLE;
    const end = (i + 1) * SECTOR_ANGLE;
    return `${prize.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

export function Wheel({ rotation, isSpinning, onSpin, disabled }: WheelProps) {
  const transitionDuration = isSpinning ? "4.5s" : "0s";
  const transitionTiming = isSpinning
    ? "cubic-bezier(0.17, 0.67, 0.12, 0.99)"
    : "ease";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,380px)]">
      {/* Указатель */}
      <div
        className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1"
        aria-hidden
      >
        <div className="h-0 w-0 border-x-[14px] border-b-[22px] border-x-transparent border-b-[#f472b6] drop-shadow-[0_2px_8px_rgba(244,114,182,0.6)]" />
      </div>

      {/* Внешнее кольцо */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent p-[3px] shadow-[0_0_60px_rgba(168,85,247,0.25)]">
        <div className="h-full w-full rounded-full bg-[#1a1030]/80 p-2">
          {/* Колесо */}
          <div
            className="relative h-full w-full rounded-full shadow-inner"
            style={{
              background: buildConicGradient(),
              transform: `rotate(${rotation}deg)`,
              transition: `transform ${transitionDuration} ${transitionTiming}`,
            }}
          >
            {/* Подписи секторов */}
            {PRIZES.map((prize, index) => {
              const angle = index * SECTOR_ANGLE + SECTOR_ANGLE / 2 - 90;
              return (
                <div
                  key={prize.id}
                  className="pointer-events-none absolute left-1/2 top-1/2 origin-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-38%)`,
                    width: "42%",
                    marginLeft: "-21%",
                  }}
                >
                  <span
                    className="block text-center text-[10px] font-semibold leading-tight sm:text-xs"
                    style={{
                      color: prize.textColor,
                      textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                      transform: `rotate(${-angle + 90}deg)`,
                    }}
                  >
                    {prize.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Центральная кнопка */}
      <button
        type="button"
        onClick={onSpin}
        disabled={disabled}
        className="absolute left-1/2 top-1/2 z-30 flex h-[22%] w-[22%] min-h-[56px] min-w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#f472b6] to-[#a855f7] text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_4px_24px_rgba(168,85,247,0.5)] transition hover:scale-105 hover:shadow-[0_6px_32px_rgba(168,85,247,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:text-xs"
        aria-label="Крутить колесо"
      >
        {disabled ? "…" : "GO"}
      </button>
    </div>
  );
}
