"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CATEGORY_MAP } from "@/lib/diagnosis/categories";
import type { CategoryScore } from "@/lib/diagnosis/types";

const CHART_COLOR = "#4f46e5";

export function CategoryRadarChart({
  categoryScores,
}: {
  categoryScores: CategoryScore[];
}) {
  const data = categoryScores.map((score) => ({
    category: CATEGORY_MAP[score.categoryId].shortName,
    score: score.normalizedScore,
  }));

  return (
    <div className="h-[320px] w-full sm:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 12, right: 24, bottom: 12, left: 24 }}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="伸びしろスコア"
            dataKey="score"
            stroke={CHART_COLOR}
            fill={CHART_COLOR}
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value) => [`${value} / 100`, "伸びしろスコア"] as [string, string]}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              color: "var(--popover-foreground)",
              fontSize: 12,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
