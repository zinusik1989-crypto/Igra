import { useEffect, useRef, useState } from "react";
import { Wheel } from "./Wheel";
import { ResultCard } from "./ResultCard";
import { Confetti } from "./Confetti";
import { SparklesBackground } from "./SparklesBackground";
import { NeuroBokeh } from "./NeuroBokeh";
import { SceneEffects } from "./SceneEffects";
import { WinFlash } from "./WinFlash";
import { useWheelSpin } from "./useWheelSpin";
import { useSound } from "./useSound";

type WheelOfFortuneProps = {
  onCtaClick?: (prizeId: string, promoCode: string) => void;
  className?: string;
};

const SPIN_DURATION_MS = 4500;

export function WheelOfFortune({ onCtaClick, className = "" }: WheelOfFortuneProps) {
  const { muted, toggleMute, startSpinSound, stopSpinSound, playWin } = useSound();
  const spinCountRef = useRef(0);
  const [showFlash, setShowFlash] = useState(false);
  const [spinProgress, setSpinProgress] = useState(0);

  const { rotation, isSpinning, result, winningIndex, promoCode, spin, reset } =
    useWheelSpin({
      onStart: () => {
        spinCountRef.current += 1;
        setShowFlash(false);
        setSpinProgress(0);
        startSpinSound(SPIN_DURATION_MS);
      },
      onFinish: () => {
        stopSpinSound();
        playWin();
        setShowFlash(true);
        setSpinProgress(100);
        document.body.classList.add("wow-shake");
        window.setTimeout(() => document.body.classList.remove("wow-shake"), 500);
        if (navigator.vibrate) navigator.vibrate([80, 40, 120]);
      },
    });

  useEffect(() => {
    if (!isSpinning) return;
    const start = performance.now();
    const tick = () => {
      const p = Math.min((performance.now() - start) / SPIN_DURATION_MS, 1);
      setSpinProgress(p * 100);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isSpinning]);

  useEffect(() => {
    if (!showFlash) return;
    const t = window.setTimeout(() => setShowFlash(false), 700);
    return () => clearTimeout(t);
  }, [showFlash]);

  const handleCta = () => {
    if (result) onCtaClick?.(result.id, promoCode);
  };

  return (
    <section
      className={`relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:py-20 ${className}`}
      aria-label="Колесо удачи"
    >
      <NeuroBokeh />
      <SparklesBackground />
      <SceneEffects />
      <WinFlash active={showFlash} accentColor={result?.color} />

      {result && !isSpinning && (
        <Confetti seed={spinCountRef.current} accentColor={result.color} />
      )}

      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[120px]"
        aria-hidden
      />

      <button
        type="button"
        onClick={toggleMute}
        className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white/80 backdrop-blur transition hover:bg-white/10 sm:right-6 sm:top-6"
        aria-label={muted ? "Включить звук" : "Выключить звук"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="relative z-[2] mx-auto max-w-4xl">
        <header className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-pink-300/90">
            Нейрофотосессия
          </p>
          <h1 className="animate-title-shimmer mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            Колесо удачи
          </h1>
          <p className="mx-auto max-w-xl text-base text-white/60 sm:text-lg">
            Крутите колесо и получите подарок, скидку или бонус к вашей
            AI-фотосессии.
          </p>
          <p className="mx-auto mt-3 flex max-w-sm items-center justify-center gap-2 text-sm text-white/45">
            <span aria-hidden>📸</span>
            AI-образы для личного бренда за 24 часа
          </p>
        </header>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
          <div className="w-full shrink-0 lg:max-w-[420px]">
            <Wheel
              rotation={rotation}
              isSpinning={isSpinning}
              onSpin={spin}
              disabled={isSpinning || !!result}
              winningIndex={winningIndex}
            />

            {!result && (
              <div className="relative mt-8">
                {isSpinning && (
                  <div
                    className="absolute -top-1 left-0 h-1 rounded-full bg-gradient-to-r from-[#f472b6] to-[#a855f7] transition-all duration-100"
                    style={{ width: `${spinProgress}%` }}
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  onClick={spin}
                  disabled={isSpinning}
                  className="glass-spin-btn relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-[0_8px_32px_rgba(168,85,247,0.25)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {isSpinning ? "Колесо крутится…" : "Крутить колесо"}
                  </span>
                  {!isSpinning && (
                    <span
                      className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      aria-hidden
                    />
                  )}
                </button>
              </div>
            )}
          </div>

          {result && (
            <div className="result-sheet fixed inset-x-0 bottom-0 z-30 max-h-[85vh] overflow-y-auto lg:static lg:max-h-none lg:w-full lg:max-w-md">
              <ResultCard
                prize={result}
                promoCode={promoCode}
                onCta={handleCta}
                onSpinAgain={reset}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
