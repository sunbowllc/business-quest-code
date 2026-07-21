"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircleHeart,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CategoryRadarChart } from "@/components/diagnosis/category-radar-chart";
import { StarRating } from "@/components/diagnosis/star-rating";
import { CATEGORY_MAP } from "@/lib/diagnosis/categories";
import { CATEGORY_ICONS } from "@/lib/diagnosis/icons";
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

  const topCategoryScore = [...result.categoryScores].sort(
    (a, b) => b.normalizedScore - a.normalizedScore,
  )[0];
  const topCategory = CATEGORY_MAP[topCategoryScore.categoryId];
  const TopCategoryIcon = CATEGORY_ICONS[topCategoryScore.categoryId];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">事業の現在地</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
          強み・弱み・優先的に見直すべき改善ポイントを整理しました。
        </p>
      </div>

      <Card className="mt-8 overflow-hidden border-primary/30 bg-gradient-to-b from-primary/10 to-transparent">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center sm:p-8">
          <Badge className="gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            診断結果タイプ
          </Badge>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <TopCategoryIcon className="h-7 w-7" />
          </span>
          <p className="text-2xl font-bold sm:text-3xl">{result.resultType.name}</p>
          <p className="max-w-lg text-sm text-muted-foreground sm:text-base">
            {result.resultType.description}
          </p>
          <p className="mt-1 max-w-lg text-sm font-medium text-primary">
            特に「{topCategory.shortName}」を伸ばすことが、次の成果に最も直結します。
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
          <div className="shrink-0 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              総合スコア
              <br />
              （事業成長チャンススコア）
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-primary">
              {result.overallScore}
              <span className="text-lg font-medium text-muted-foreground"> / 100</span>
            </p>
            <p className="mt-2 max-w-[12rem] text-xs text-muted-foreground">
              スコアが高い部分ほど、改善のした際の伸びしろが大きい
            </p>
          </div>
          <div className="w-full min-w-0 flex-1">
            <CategoryRadarChart categoryScores={result.categoryScores} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="flex items-center gap-1.5 text-sm font-bold">
          <Target className="h-4 w-4 text-pink-600 dark:text-pink-400" />
          優先改善ポイント
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          ★の数が多いほど優先度が高い項目です。まずはここから。
        </p>
        <div className="mt-4 space-y-3">
          {result.priorityActions.map((action, index) => {
            const category = CATEGORY_MAP[action.categoryId];
            const Icon = CATEGORY_ICONS[action.categoryId];
            return (
              <Card
                key={index}
                className="border-pink-300 bg-pink-50/60 dark:border-pink-500/30 dark:bg-pink-500/10"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-600 text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-bold">{category.shortName}</p>
                    </div>
                    <StarRating level={action.priorityLevel} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foreground">
                    {action.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-base font-bold">
          6領域別スコア
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            （数値が高いほど、改善すると効果的です）
          </span>
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {result.categoryScores.map((score) => {
            const category = CATEGORY_MAP[score.categoryId];
            const Icon = CATEGORY_ICONS[score.categoryId];
            const isTop = score.categoryId === topCategoryScore.categoryId;
            return (
              <Card
                key={score.categoryId}
                className={isTop ? "border-primary/40 bg-primary/5" : undefined}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm font-semibold">{category.shortName}</p>
                      {isTop && (
                        <Badge variant="secondary" className="text-[10px]">
                          重点分野
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-bold text-primary">
                      {score.normalizedScore}
                    </p>
                  </div>
                  <Progress value={score.normalizedScore} className="mt-3" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              自分の強み
            </h3>
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
            <h3 className="flex items-center gap-1.5 text-sm font-bold">
              <TrendingUp className="h-4 w-4" />
              自分の弱み
            </h3>
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

      <Card className="mt-8 border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center sm:p-8">
          <h3 className="flex items-center gap-1.5 text-sm font-bold">
            <MessageCircleHeart className="h-4 w-4" />
            現状を相談したい（無料相談 希望）
          </h3>
          <p className="max-w-lg text-sm leading-7 text-muted-foreground">
            自分の商品・集客・セールスのどこを整理すべきか知りたい方は、下記ボタンからご連絡どうぞ。
          </p>
          <Button
            size="lg"
            className="h-12 w-full max-w-xs bg-amber-500 px-8 text-base text-white hover:bg-amber-600"
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
