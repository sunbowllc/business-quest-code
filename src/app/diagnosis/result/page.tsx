"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_MAP } from "@/lib/diagnosis/categories";
import { createDefaultAnswers, buildDiagnosisResult } from "@/lib/diagnosis/scoring";
import { clearAnswers, getStorageVersion, loadAnswers } from "@/lib/diagnosis/storage";
import type { Answers } from "@/lib/diagnosis/types";

const CONSULTATION_LINE_URL = "https://line.me/ti/p/WhGDzqxF2T";

function subscribeNoop() {
  return () => {};
}

// useSyncExternalStore requires a stable (Object.is-equal) snapshot until the
// underlying storage actually changes, so the read is cached by version.
let snapshotCache: { version: number; answers: Answers } | null = null;

function getAnswersSnapshot(): Answers {
  const version = getStorageVersion();
  if (!snapshotCache || snapshotCache.version !== version) {
    snapshotCache = { version, answers: loadAnswers() ?? createDefaultAnswers() };
  }
  return snapshotCache.answers;
}

function getServerAnswersSnapshot(): Answers | null {
  return null;
}

export default function DiagnosisResultPage() {
  const answers = useSyncExternalStore(
    subscribeNoop,
    getAnswersSnapshot,
    getServerAnswersSnapshot,
  );

  const result = useMemo(() => (answers ? buildDiagnosisResult(answers) : null), [answers]);

  if (!result) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-20">
        <p className="text-sm text-muted-foreground">診断結果を読み込んでいます…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">診断お疲れさまでした。</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          この診断では、あなたの事業運営の現在地をもとに、強み・弱み・優先的に見直すべき改善ポイントを整理しています。
        </p>
      </div>

      <Card className="mt-8 border-primary/30 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <Badge className="gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            診断結果タイプ
          </Badge>
          <p className="text-xl font-bold sm:text-2xl">{result.resultType.name}</p>
          <p className="max-w-md text-sm text-muted-foreground">
            {result.resultType.description}
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            総合スコア（事業成長チャンススコア）
          </p>
          <p className="mt-2 text-5xl font-bold tracking-tight text-primary">
            {result.overallScore}
            <span className="text-lg font-medium text-muted-foreground"> / 100</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            スコアが高いほど、改善の伸びしろが大きいことを示します
          </p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-base font-bold">6領域別スコア</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {result.categoryScores.map((score) => {
            const category = CATEGORY_MAP[score.categoryId];
            return (
              <Card key={score.categoryId}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{category.shortName}</p>
                    <p className="text-sm font-bold text-primary">
                      {score.normalizedScore}
                    </p>
                  </div>
                  <Progress value={score.normalizedScore} className="mt-2" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-primary">自分の強み</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {result.strengths.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">・</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-bold">自分の弱み</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {result.weaknesses.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span>・</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold">優先改善ポイント</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {result.priorityActions.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">{index + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold">自分で改善する場合のヒント</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {result.selfImprovementHints.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-primary">・</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-8 border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
          <p className="text-sm leading-7 text-muted-foreground">
            診断結果を見て、自分で改善を進められそうな方は、ぜひ実践してみてください。
            <br />
            一方で、何から始めればいいかわからない、自分の商品・集客・セールスのどこを整理すべきか壁打ちしたい、
            事業運営の仕組み化を進めたい、伴走サポートを検討したい方は、無料相談をご活用ください。
          </p>
          <Button
            size="lg"
            className="h-12 bg-amber-500 px-8 text-base text-white hover:bg-amber-600"
            render={
              <a href={CONSULTATION_LINE_URL} target="_blank" rel="noopener noreferrer">
                無料で相談する
                <ArrowRight className="h-4 w-4" />
              </a>
            }
          />
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => clearAnswers()}
          render={
            <Link href="/diagnosis">
              <RotateCcw className="h-3.5 w-3.5" />
              もう一度診断する
            </Link>
          }
        />
      </div>
    </div>
  );
}
