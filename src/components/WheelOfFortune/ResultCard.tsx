import { useEffect, useRef, useState } from "react";
import type { Prize } from "./prizes";
import { sharePrize, type ShareResult } from "./share";
import { CircularTimer } from "./CircularTimer";

type ResultCardProps = {
  prize: Prize;
  promoCode: string;
  onCta: () => void;
  onSpinAgain: () => void;
  sharePageUrl?: string;
  deadlineSeconds?: number;
};

const SHARE_LABELS: Record<ShareResult, string> = {
  shared: "Отправлено!",
  copied: "Текст скопирован!",
  cancelled: "Поделиться",
  failed: "Не удалось",
};

export function ResultCard({
  prize,
  promoCode,
  onCta,
  onSpinAgain,
  sharePageUrl,
  deadlineSeconds = 15 * 60,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareResult | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(deadlineSeconds);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    };
  }, []);

  const handleShare = async () => {
    const result = await sharePrize(prize.title, promoCode, sharePageUrl);
    if (result === "cancelled") return;
    setShareStatus(result);
    if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    shareTimerRef.current = setTimeout(() => setShareStatus(null), 2000);
  };

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
      className="animate-wow-pop w-full max-w-md rounded-t-3xl border-2 bg-gradient-to-br from-white/12 to-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:rounded-3xl"
      style={{
        borderColor: `${prize.color}99`,
        boxShadow: `0 0 50px ${prize.color}40, 0 24px 80px rgba(0,0,0,0.4)`,
      }}
      role="dialog"
      aria-labelledby="result-title"
      aria-describedby="result-desc"
    >
      <div
        className="animate-badge-pop mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
        style={{ backgroundColor: prize.color }}
      >
        <span className="text-base" aria-hidden>
          {prize.icon}
        </span>
        Ваш приз
      </div>

      <h2
        id="result-title"
        className="mb-3 flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl"
      >
        <span aria-hidden>{prize.icon}</span>
        {prize.title}
      </h2>

      <p id="result-desc" className="mb-5 text-base leading-relaxed text-white/75">
        {prize.description}
      </p>

      <div className="mb-4">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
          Ваш промокод
        </span>
        <div className="promo-ticket relative flex items-stretch gap-2 rounded-xl p-1">
          <div
            className="ticket-notch-left pointer-events-none absolute left-0 top-1/2 z-10 h-4 w-2 -translate-y-1/2 rounded-r-full bg-[#0f0a1a]"
            aria-hidden
          />
          <div
            className="ticket-notch-right pointer-events-none absolute right-0 top-1/2 z-10 h-4 w-2 -translate-y-1/2 rounded-l-full bg-[#0f0a1a]"
            aria-hidden
          />
          <div
            className="flex flex-1 items-center justify-center rounded-lg px-4 py-3.5 font-mono text-lg font-bold tracking-[0.15em] text-white"
            style={{
              background: `linear-gradient(135deg, ${prize.color}33, rgba(0,0,0,0.35))`,
              border: `2px dashed ${prize.color}88`,
            }}
          >
            {promoCode}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20"
            aria-label="Скопировать промокод"
          >
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>
      </div>

      <CircularTimer
        secondsLeft={secondsLeft}
        totalSeconds={deadlineSeconds}
        color={prize.color}
        expired={expired}
      />

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onCta}
          disabled={expired}
          className="w-full rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(90deg, ${prize.color}, #a855f7)`,
            boxShadow: `0 8px 28px ${prize.color}55`,
          }}
        >
          {prize.cta}
        </button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            aria-label="Поделиться результатом"
          >
            <span aria-hidden>↗</span>
            {shareStatus ? SHARE_LABELS[shareStatus] : "Поделиться"}
          </button>
          <button
            type="button"
            onClick={onSpinAgain}
            className="flex-1 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Крутить ещё раз
          </button>
        </div>
      </div>
    </div>
  );
}
