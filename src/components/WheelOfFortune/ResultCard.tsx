import { useEffect, useRef, useState } from "react";
import type { Prize } from "./prizes";

type ResultCardProps = {
  prize: Prize;
  promoCode: string;
  onCta: () => void;
  onSpinAgain: () => void;
  /** Сколько секунд действует приз */
  deadlineSeconds?: number;
};

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ResultCard({
  prize,
  promoCode,
  onCta,
  onSpinAgain,
  deadlineSeconds = 15 * 60,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(deadlineSeconds);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSecondsLeft(deadlineSeconds);
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [prize.id, promoCode, deadlineSeconds]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const expired = secondsLeft <= 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="animate-fade-in w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-labelledby="result-title"
      aria-describedby="result-desc"
    >
      <div
        className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
        style={{ backgroundColor: prize.color }}
      >
        Ваш приз
      </div>

      <h2
        id="result-title"
        className="mb-3 text-2xl font-bold text-white sm:text-3xl"
      >
        {prize.title}
      </h2>

      <p id="result-desc" className="mb-5 text-base leading-relaxed text-white/75">
        {prize.description}
      </p>

      {/* Промокод */}
      <div className="mb-4">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
          Ваш промокод
        </span>
        <div className="flex items-stretch gap-2">
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/25 bg-black/20 px-4 py-3 font-mono text-lg font-bold tracking-[0.15em] text-white">
            {promoCode}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20"
            aria-label="Скопировать промокод"
          >
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>
      </div>

      {/* Таймер-дедлайн */}
      <div
        className={`mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
          expired
            ? "bg-red-500/15 text-red-200"
            : "bg-amber-400/10 text-amber-200"
        }`}
        role="status"
        aria-live="polite"
      >
        {expired ? (
          <span>Время вышло — крутите ещё раз, чтобы получить новый приз.</span>
        ) : (
          <span>
            Приз сгорит через{" "}
            <span className="font-mono font-bold tabular-nums">
              {formatTime(secondsLeft)}
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onCta}
          disabled={expired}
          className="flex-1 rounded-2xl bg-gradient-to-r from-[#f472b6] to-[#a855f7] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {prize.cta}
        </button>
        <button
          type="button"
          onClick={onSpinAgain}
          className="flex-1 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Крутить ещё раз
        </button>
      </div>
    </div>
  );
}
