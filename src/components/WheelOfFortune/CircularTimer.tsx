type CircularTimerProps = {
  secondsLeft: number;
  totalSeconds: number;
  color: string;
  expired: boolean;
};

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CircularTimer({
  secondsLeft,
  totalSeconds,
  color,
  expired,
}: CircularTimerProps) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const progress = Math.max(0, secondsLeft / totalSeconds);
  const offset = circumference * (1 - progress);

  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="relative shrink-0">
        <svg width={72} height={72} className="-rotate-90">
          <circle
            cx={36}
            cy={36}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={4}
          />
          <circle
            cx={36}
            cy={36}
            r={r}
            fill="none"
            stroke={expired ? "#ef4444" : color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono text-sm font-bold tabular-nums ${
            expired ? "text-red-200" : "text-white"
          }`}
        >
          {formatTime(secondsLeft)}
        </span>
      </div>
      <p
        className={`text-sm font-medium leading-snug ${
          expired ? "text-red-200" : "text-amber-100/90"
        }`}
      >
        {expired
          ? "Время вышло — крутите ещё раз, чтобы получить новый приз."
          : "Приз сгорит — успейте забрать до истечения таймера"}
      </p>
    </div>
  );
}
