import { Star } from "lucide-react";

export function StarRating({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`優先度 ${level} / ${max}`}
    >
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={
            index < level
              ? "h-4 w-4 fill-amber-400 text-amber-400"
              : "h-4 w-4 text-muted-foreground/25"
          }
        />
      ))}
    </div>
  );
}
