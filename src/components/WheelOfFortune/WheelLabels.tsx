import { PRIZES, SECTOR_ANGLE } from "./prizes";

const CX = 100;
const CY = 100;
const ICON_RADIUS = 48;
const LABEL_RADIUS = 68;

function splitLabel(label: string): string[] {
  const map: Record<string, string[]> = {
    "Бонусный образ": ["Бонусный", "образ"],
    "Спецпредложение": ["Спец-", "предложение"],
    "Полезный материал": ["Полезный", "материал"],
    "Идея образа": ["Идея", "образа"],
  };
  if (map[label]) return map[label];
  if (label.length <= 14) return [label];
  const parts = label.split(" ");
  return parts.length > 1 ? parts : [label];
}

export function WheelLabels() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      viewBox="0 0 200 200"
      aria-hidden
    >
      {PRIZES.map((prize, index) => {
        const midDeg = index * SECTOR_ANGLE + SECTOR_ANGLE / 2 - 90;
        const rad = (midDeg * Math.PI) / 180;
        const iconX = CX + ICON_RADIUS * Math.cos(rad);
        const iconY = CY + ICON_RADIUS * Math.sin(rad);
        const labelX = CX + LABEL_RADIUS * Math.cos(rad);
        const labelY = CY + LABEL_RADIUS * Math.sin(rad);
        const textRotate = midDeg + 90;
        const lines = splitLabel(prize.label);

        return (
          <g key={prize.id}>
            <text
              x={iconX}
              y={iconY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
            >
              {prize.icon}
            </text>
            <text
              x={labelX}
              y={labelY}
              fill={prize.textColor}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textRotate} ${labelX} ${labelY})`}
              fontSize={9}
              fontWeight={700}
              style={{
                paintOrder: "stroke fill",
                stroke: "rgba(0,0,0,0.45)",
                strokeWidth: 0.6,
              }}
            >
              {lines.length === 1 ? (
                lines[0]
              ) : (
                lines.map((line, i) => (
                  <tspan key={line} x={labelX} dy={i === 0 ? "-0.4em" : "1em"}>
                    {line}
                  </tspan>
                ))
              )}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
