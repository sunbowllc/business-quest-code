import Link from "next/link";
import { ArrowRight, Clock, ListChecks, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/diagnosis/categories";

export default function DiagnosisStartPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Compass className="h-3.5 w-3.5" />
          事業運営能力診断
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          18問で、あなたの事業運営レベルを診断します
        </h1>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            この診断では、以下の6つの領域から、あなたの事業運営の現在地を確認します。
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((category) => (
              <li
                key={category.id}
                className="rounded-md bg-muted px-3 py-2 text-center text-sm font-medium"
              >
                {category.shortName}
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            正解・不正解を判定するものではありません。
            現在の状態を整理し、強み・弱み・改善ポイントを見える化するための診断です。
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ListChecks className="h-4 w-4" />
              全18問（6領域 × 3問）
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              所要時間は約4分
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        size="lg"
        className="mt-8 h-12 self-center px-8 text-base"
        render={
          <Link href="/diagnosis/questions">
            診断を開始する
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
    </div>
  );
}
