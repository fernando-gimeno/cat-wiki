interface Props {
  title: string;
  level: 0 | 1 | 2 | 3 | 4 | 5;
  index?: number;
}

const LEVEL_LABELS = [
  "—",
  "Minimal",
  "Low",
  "Moderate",
  "High",
  "Very high",
] as const;

export default function Hability({ title, level, index = 0 }: Props) {
  const pct = `${(level / 5) * 100}%`;

  return (
    <div className="py-3.5">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm font-medium text-espresso">
          {title}
        </span>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-bark/70">
          {LEVEL_LABELS[level]}
        </span>
      </div>

      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-bark/12"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={level}
        aria-label={title}
      >
        <div
          className="trait-fill absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-bark via-amber to-amber-soft"
          style={{ width: pct, animationDelay: `${300 + index * 60}ms` }}
        />
      </div>
    </div>
  );
}
