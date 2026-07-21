import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Compass,
  ListChecks,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryRadarChart } from "@/components/diagnosis/category-radar-chart";
import { CATEGORIES } from "@/lib/diagnosis/categories";
import { CATEGORY_ICONS } from "@/lib/diagnosis/icons";
import type { CategoryScore } from "@/lib/diagnosis/types";

const SAMPLE_CATEGORY_SCORES: CategoryScore[] = [
  { categoryId: "product", rawScore: 5, maxScore: 12, normalizedScore: 42 },
  { categoryId: "marketing", rawScore: 9, maxScore: 12, normalizedScore: 75 },
  { categoryId: "sales", rawScore: 7, maxScore: 12, normalizedScore: 58 },
  { categoryId: "support", rawScore: 4, maxScore: 12, normalizedScore: 33 },
  { categoryId: "branding", rawScore: 10, maxScore: 12, normalizedScore: 83 },
  { categoryId: "operations", rawScore: 6, maxScore: 12, normalizedScore: 50 },
];

const TRUST_ITEMS = [
  { icon: ListChecks, label: "全18問" },
  { icon: Clock, label: "約4分" },
  { icon: ShieldCheck, label: "登録不要・完全無料" },
];

const STEPS = [
  {
    icon: ListChecks,
    title: "18問に回答する",
    description: "商品設計・集客・セールスなど6領域の質問に、4択でテンポよく回答します。",
  },
  {
    icon: BarChart3,
    title: "結果を確認する",
    description: "総合スコア・領域別スコア・診断結果タイプ・強み弱みをレーダーチャートで見える化します。",
  },
  {
    icon: Rocket,
    title: "改善する・相談する",
    description: "自分で改善できる方はそのまま実践、サポートが必要な方は無料相談へ進めます。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
        />
        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Compass className="h-3.5 w-3.5" />
              オンライン講師の能力診断
            </span>
            <h1 className="max-w-md text-3xl font-bold tracking-tight sm:text-4xl lg:max-w-lg lg:text-4xl">
              オンライン講師としての事業の現在地がわかる
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              18問の診断で、あなたの強み・弱み・優先改善ポイントを見える化します。
            </p>
            <Button
              size="lg"
              className="mt-2 h-12 px-8 text-base"
              render={
                <Link href="/diagnosis">
                  無料診断をはじめる
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <div className="flex flex-wrap items-center justify-center gap-4 gap-y-2 lg:justify-start">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl border bg-card p-5 shadow-lg sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  診断結果イメージ
                </Badge>
                <span className="text-[11px] text-muted-foreground">※サンプルです</span>
              </div>
              <CategoryRadarChart categoryScores={SAMPLE_CATEGORY_SCORES} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold sm:text-2xl">
            Business Quest codeとは
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Business Quest codeは、オンライン講師として活動する個人事業主向けの無料能力診断です。
            商品設計、集客・発信、セールス、顧客対応・継続、ブランディング・差別化、事業運営基盤の6領域から、あなたの事業運営の現在地を診断します。
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            診断後は、総合スコア、領域別スコア、自分の強み・弱み、優先的に見直すべき改善ポイントを確認できます。
            自分で改善できる方は、そのまま事業改善にご活用ください。サポートが必要な方は、無料相談をご利用いただけます。
          </p>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-xl font-bold sm:text-2xl">
            3ステップで完了
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-5.5 w-5.5" />
                </span>
                <span className="mt-3 text-xs font-semibold text-primary">
                  STEP {index + 1}
                </span>
                <p className="mt-1 font-semibold">{step.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-xl font-bold sm:text-2xl">
          診断でわかる6つの領域
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <Card
                key={category.id}
                className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-2 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-b from-primary/10 to-transparent">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:p-12">
              <h2 className="text-xl font-bold sm:text-2xl">
                診断後は、無料相談も可能です
              </h2>
              <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                自分で改善を進められそうな方は、診断結果をもとにぜひ実践してみてください。
                何から始めればいいかわからない方には、無料相談への案内もご用意しています。
              </p>
              <Button
                size="lg"
                className="mt-2 h-12 px-8 text-base"
                render={
                  <Link href="/diagnosis">
                    無料診断をはじめる
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                }
              />
              <div className="flex flex-wrap items-center justify-center gap-4 gap-y-2">
                {TRUST_ITEMS.map((item) => (
                  <span
                    key={item.label}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                    {item.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
