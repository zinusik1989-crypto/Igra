import { Wheel } from "./Wheel";
import { ResultCard } from "./ResultCard";
import { useWheelSpin } from "./useWheelSpin";

type WheelOfFortuneProps = {
  onCtaClick?: (prizeId: string) => void;
  className?: string;
};

export function WheelOfFortune({ onCtaClick, className = "" }: WheelOfFortuneProps) {
  const { rotation, isSpinning, result, spin, reset } = useWheelSpin();

  const handleCta = () => {
    if (result) {
      onCtaClick?.(result.id);
    }
  };

  return (
    <section
      className={`relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:py-20 ${className}`}
      aria-label="Колесо удачи"
    >
      {/* Декоративное свечение */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/15 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Заголовок */}
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-pink-300/90">
            Нейрофотосессия
          </p>
          <h1 className="mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            Колесо удачи
          </h1>
          <p className="mx-auto max-w-xl text-base text-white/60 sm:text-lg">
            Крутите колесо и получите подарок, скидку или бонус к вашей
            AI-фотосессии. Один клик — и ваш персональный приз уже ждёт.
          </p>
        </header>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
          {/* Колесо */}
          <div className="w-full max-w-[380px] shrink-0 lg:max-w-[420px]">
            <Wheel
              rotation={rotation}
              isSpinning={isSpinning}
              onSpin={spin}
              disabled={isSpinning || !!result}
            />

            {!result && (
              <button
                type="button"
                onClick={spin}
                disabled={isSpinning}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#f472b6] to-[#a855f7] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_32px_rgba(168,85,247,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSpinning ? "Колесо крутится…" : "Крутить колесо"}
              </button>
            )}
          </div>

          {/* Результат */}
          {result && (
            <div className="flex w-full max-w-md flex-col items-center lg:items-stretch lg:pt-8">
              <ResultCard
                prize={result}
                onCta={handleCta}
                onSpinAgain={reset}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
