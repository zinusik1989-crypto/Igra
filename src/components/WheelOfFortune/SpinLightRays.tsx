type SpinLightRaysProps = {
  active: boolean;
};

export function SpinLightRays({ active }: SpinLightRaysProps) {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
      aria-hidden
    >
      <div className="relative h-full w-full animate-[spin_3s_linear_infinite]">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-1/2 w-[3px] origin-bottom -translate-x-1/2 rounded-full bg-gradient-to-t from-transparent via-white/25 to-transparent"
            style={{
              transform: `translateX(-50%) rotate(${i * 45}deg)`,
              transformOrigin: "50% 100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
