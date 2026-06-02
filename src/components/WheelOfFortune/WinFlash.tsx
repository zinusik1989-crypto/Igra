type WinFlashProps = {
  active: boolean;
  accentColor?: string;
};

export function WinFlash({ active, accentColor = "#a855f7" }: WinFlashProps) {
  if (!active) return null;

  const hex = accentColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] animate-win-flash"
      style={{
        background: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.55) 0%, rgba(${r},${g},${b},0.35) 35%, transparent 70%)`,
      }}
      aria-hidden
    />
  );
}
