import type { Prize } from "./prizes";

type ResultCardProps = {
  prize: Prize;
  onCta: () => void;
  onSpinAgain: () => void;
};

export function ResultCard({ prize, onCta, onSpinAgain }: ResultCardProps) {
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

      <p id="result-desc" className="mb-6 text-base leading-relaxed text-white/75">
        {prize.description}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onCta}
          className="flex-1 rounded-2xl bg-gradient-to-r from-[#f472b6] to-[#a855f7] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
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
