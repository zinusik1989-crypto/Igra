type WheelLightsProps = {
  isSpinning: boolean;
  bulbCount?: number;
};

export function WheelLights({ isSpinning, bulbCount = 20 }: WheelLightsProps) {
  const bulbs = Array.from({ length: bulbCount }, (_, i) => {
    const angle = (360 / bulbCount) * i - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      left: 50 + 48 * Math.cos(rad),
      top: 50 + 48 * Math.sin(rad),
      hue: (i * 18) % 360,
      delay: (i / bulbCount) * 0.6,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      {bulbs.map((b) => (
        <span
          key={b.id}
          className={`absolute block h-[7px] w-[7px] rounded-full ${
            isSpinning ? "animate-bulb-chase" : "animate-bulb-idle"
          }`}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            marginLeft: -3.5,
            marginTop: -3.5,
            background: isSpinning
              ? `hsl(${b.hue}, 90%, 70%)`
              : "rgba(255,255,255,0.85)",
            boxShadow: isSpinning
              ? `0 0 10px hsl(${b.hue}, 90%, 60%)`
              : "0 0 6px rgba(255,255,255,0.6)",
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
