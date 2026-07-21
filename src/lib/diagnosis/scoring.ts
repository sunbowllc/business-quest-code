import { CATEGORIES } from "./categories";
import { CATEGORY_CONTENT } from "./content";
import { QUESTIONS } from "./questions";
import { RESULT_TYPES } from "./resultTypes";
import type { Answers, CategoryScore, DiagnosisResult } from "./types";

/** 0-100の伸びしろスコアを1-5段階の優先度（★の数）に変換する */
export function getPriorityLevel(normalizedScore: number): number {
  return Math.min(5, Math.max(1, Math.ceil(normalizedScore / 20)));
}

const MAX_ANSWER_VALUE = 4;

/** 未回答時などのフォールバック用に、全問「少し当てはまる」を入れたデフォルト回答 */
export function createDefaultAnswers(): Answers {
  return QUESTIONS.reduce((answers, question) => {
    answers[question.id] = 2;
    return answers;
  }, {} as Answers);
}

/**
 * 暫定スコアリング。当てはまるほど改善余地（伸びしろ）が大きくなる設計。
 * 正式なスコアリング設計はIssue 2で精緻化する。
 */
export function computeCategoryScores(answers: Answers): CategoryScore[] {
  return CATEGORIES.map((category) => {
    const categoryQuestions = QUESTIONS.filter(
      (question) => question.categoryId === category.id,
    );
    const rawScore = categoryQuestions.reduce(
      (sum, question) => sum + (answers[question.id] ?? 0),
      0,
    );
    const maxScore = categoryQuestions.length * MAX_ANSWER_VALUE;
    const normalizedScore = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;

    return {
      categoryId: category.id,
      rawScore,
      maxScore,
      normalizedScore,
    };
  });
}

export function computeOverallScore(categoryScores: CategoryScore[]): number {
  if (categoryScores.length === 0) return 0;
  const total = categoryScores.reduce((sum, score) => sum + score.normalizedScore, 0);
  return Math.round(total / categoryScores.length);
}

/** 6タイプ判定（仮）：伸びしろが最大のカテゴリに対応するタイプを返す */
export function determineResultType(categoryScores: CategoryScore[]) {
  const topCategory = [...categoryScores].sort(
    (a, b) => b.normalizedScore - a.normalizedScore,
  )[0];
  return RESULT_TYPES[topCategory.categoryId];
}

export function buildDiagnosisResult(answers: Answers): DiagnosisResult {
  const categoryScores = computeCategoryScores(answers);
  const overallScore = computeOverallScore(categoryScores);
  const resultType = determineResultType(categoryScores);

  const sortedByGrowthRoom = [...categoryScores].sort(
    (a, b) => b.normalizedScore - a.normalizedScore,
  );
  const weakestCategories = sortedByGrowthRoom.slice(0, 2);
  const strongestCategories = [...sortedByGrowthRoom].reverse().slice(0, 2);

  const strengths = strongestCategories.map(
    (score) => CATEGORY_CONTENT[score.categoryId].strength,
  );
  const weaknesses = weakestCategories.map(
    (score) => CATEGORY_CONTENT[score.categoryId].weakness,
  );
  const priorityActions = weakestCategories.map((score) => ({
    categoryId: score.categoryId,
    priorityLevel: getPriorityLevel(score.normalizedScore),
    text: CATEGORY_CONTENT[score.categoryId].priorityAction,
  }));
  const selfImprovementHints = sortedByGrowthRoom.map(
    (score) => CATEGORY_CONTENT[score.categoryId].hint,
  );

  return {
    answers,
    overallScore,
    categoryScores,
    resultType,
    strengths,
    weaknesses,
    priorityActions,
    selfImprovementHints,
  };
}
