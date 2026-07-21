"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QUESTIONS, ANSWER_OPTIONS } from "@/lib/diagnosis/questions";
import { CATEGORY_MAP } from "@/lib/diagnosis/categories";
import { saveAnswers } from "@/lib/diagnosis/storage";
import type { AnswerValue, Answers } from "@/lib/diagnosis/types";

export default function DiagnosisQuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = QUESTIONS[currentIndex];
  const category = CATEGORY_MAP[currentQuestion.categoryId];
  const selectedValue = answers[currentQuestion.id];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const progressPercent = useMemo(
    () => Math.round(((currentIndex + 1) / QUESTIONS.length) * 100),
    [currentIndex],
  );

  function handleSelect(value: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: Number(value) as AnswerValue,
    }));
  }

  function handleBack() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function handleNext() {
    if (selectedValue === undefined) return;

    if (isLastQuestion) {
      saveAnswers(answers);
      router.push("/diagnosis/result");
      return;
    }

    setCurrentIndex((index) => Math.min(QUESTIONS.length - 1, index + 1));
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          質問 {currentIndex + 1} / {QUESTIONS.length}
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {category.shortName}
        </span>
      </div>
      <Progress value={progressPercent} className="mt-3" />

      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="text-lg font-semibold leading-8 sm:text-xl">
            {currentQuestion.text}
          </p>

          <RadioGroup
            className="mt-8 gap-3"
            value={selectedValue !== undefined ? String(selectedValue) : undefined}
            onValueChange={handleSelect}
          >
            {ANSWER_OPTIONS.map((option) => {
              const optionId = `${currentQuestion.id}-${option.value}`;
              const isChecked = selectedValue === option.value;
              return (
                <Label
                  key={option.value}
                  htmlFor={optionId}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                    isChecked
                      ? "border-primary bg-primary/5"
                      : "border-input hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem
                    id={optionId}
                    value={String(option.value)}
                  />
                  <span className="text-sm font-medium sm:text-base">
                    {option.label}
                  </span>
                </Label>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={selectedValue === undefined}
        >
          {isLastQuestion ? "結果を見る" : "次へ"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
