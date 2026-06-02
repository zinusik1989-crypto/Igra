import { useCallback, useRef, useState } from "react";
import { PRIZES, SECTOR_ANGLE, generatePromoCode, type Prize } from "./prizes";

const SPIN_DURATION_MS = 4500;
const MIN_FULL_ROTATIONS = 5;
const MAX_FULL_ROTATIONS = 8;

/** Указатель сверху: сектор i центрируется при rotation = 360 - (i * SECTOR_ANGLE + SECTOR_ANGLE/2) */
function rotationForSector(index: number): number {
  const sectorCenter = index * SECTOR_ANGLE + SECTOR_ANGLE / 2;
  return 360 - sectorCenter;
}

function pickRandomIndex(): number {
  return Math.floor(Math.random() * PRIZES.length);
}

type SpinCallbacks = {
  onStart?: () => void;
  onFinish?: (prize: Prize) => void;
};

export function useWheelSpin(callbacks: SpinCallbacks = {}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotationRef = useRef(0);
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  const clearSpinTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const spin = useCallback(() => {
    if (isSpinning) return;

    clearSpinTimeout();
    setResult(null);
    setWinningIndex(null);
    setIsSpinning(true);
    callbacksRef.current.onStart?.();

    const index = pickRandomIndex();
    const prize = PRIZES[index];
    const targetAngle = rotationForSector(index);
    const current = rotationRef.current % 360;
    const extraTurns =
      (MIN_FULL_ROTATIONS +
        Math.floor(Math.random() * (MAX_FULL_ROTATIONS - MIN_FULL_ROTATIONS + 1))) *
      360;

    let delta = targetAngle - current;
    if (delta <= 0) delta += 360;

    const nextRotation = rotationRef.current + extraTurns + delta;
    rotationRef.current = nextRotation;
    setRotation(nextRotation);

    timeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      setResult(prize);
      setWinningIndex(index);
      setPromoCode(generatePromoCode(prize.codePrefix));
      callbacksRef.current.onFinish?.(prize);
      timeoutRef.current = null;
    }, SPIN_DURATION_MS);
  }, [isSpinning, clearSpinTimeout]);

  const reset = useCallback(() => {
    clearSpinTimeout();
    setResult(null);
    setWinningIndex(null);
    setPromoCode("");
    setIsSpinning(false);
  }, [clearSpinTimeout]);

  return {
    rotation,
    isSpinning,
    result,
    winningIndex,
    promoCode,
    spin,
    reset,
    spinDurationMs: SPIN_DURATION_MS,
  };
}
