import { SECTOR_ANGLE, SECTOR_COUNT } from "./prizes";

export function WheelDividers() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 200 200"
      aria-hidden
    >
      {Array.from({ length: SECTOR_COUNT }, (_, i) => {
        const deg = i * SECTOR_ANGLE - 90;
        const rad = (deg * Math.PI) / 180;
        const x2 = 100 + 99 * Math.cos(rad);
        const y2 = 100 + 99 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={100}
            y1={100}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.5}
          />
        );
      })}
      <circle
        cx={100}
        cy={100}
        r={99}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />
    </svg>
  );
}
