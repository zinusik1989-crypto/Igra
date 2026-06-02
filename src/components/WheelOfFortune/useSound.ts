import { useCallback, useEffect, useRef, useState } from "react";

type AudioCtor = typeof AudioContext;

function getAudioContextCtor(): AudioCtor | null {
  if (typeof window === "undefined") return null;
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext ??
    null
  );
}

/**
 * Звуки колеса на Web Audio API (без внешних файлов):
 * - тики во время вращения с замедлением;
 * - короткая «фанфара» на выигрыше.
 */
export function useSound() {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const tickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const ensureCtx = useCallback((): AudioContext | null => {
    if (ctxRef.current) return ctxRef.current;
    const Ctor = getAudioContextCtor();
    if (!Ctor) return null;
    ctxRef.current = new Ctor();
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (
      freq: number,
      duration: number,
      type: OscillatorType = "sine",
      gain = 0.2,
      startOffset = 0,
    ) => {
      const ctx = ensureCtx();
      if (!ctx || mutedRef.current) return;
      const now = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      env.gain.setValueAtTime(0.0001, now);
      env.gain.exponentialRampToValueAtTime(gain, now + 0.01);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(env).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    },
    [ensureCtx],
  );

  const stopSpinSound = useCallback(() => {
    if (tickTimerRef.current) {
      clearTimeout(tickTimerRef.current);
      tickTimerRef.current = null;
    }
  }, []);

  /** Тики с нарастающим интервалом (эффект замедления) в течение durationMs */
  const startSpinSound = useCallback(
    (durationMs: number) => {
      const ctx = ensureCtx();
      if (ctx && ctx.state === "suspended") void ctx.resume();
      stopSpinSound();

      const start = performance.now();
      const minInterval = 45;
      const maxInterval = 260;

      const scheduleNext = () => {
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / durationMs, 1);
        if (progress >= 1) {
          stopSpinSound();
          return;
        }
        playTone(1100, 0.04, "square", 0.08);
        const interval =
          minInterval + (maxInterval - minInterval) * Math.pow(progress, 2);
        tickTimerRef.current = setTimeout(scheduleNext, interval);
      };
      scheduleNext();
    },
    [ensureCtx, playTone, stopSpinSound],
  );

  /** Восходящее арпеджио — «фанфара» выигрыша */
  const playWin = useCallback(() => {
    const ctx = ensureCtx();
    if (ctx && ctx.state === "suspended") void ctx.resume();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      playTone(freq, 0.35, "triangle", 0.22, i * 0.09);
    });
  }, [ensureCtx, playTone]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (next) stopSpinSound();
      return next;
    });
  }, [stopSpinSound]);

  useEffect(() => {
    return () => {
      stopSpinSound();
      void ctxRef.current?.close();
    };
  }, [stopSpinSound]);

  return { muted, toggleMute, startSpinSound, stopSpinSound, playWin };
}
