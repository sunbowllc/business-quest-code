export type CategoryId =
  | "product"
  | "marketing"
  | "sales"
  | "support"
  | "branding"
  | "operations";

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
}

export interface Question {
  id: string;
  categoryId: CategoryId;
  order: number;
  text: string;
}

export type AnswerValue = 1 | 2 | 3 | 4;

export interface AnswerOption {
  value: AnswerValue;
  label: string;
}

/** questionId -> selected value */
export type Answers = Record<string, AnswerValue>;

export interface CategoryScore {
  categoryId: CategoryId;
  /** sum of raw answer values for this category */
  rawScore: number;
  /** maximum possible raw score for this category */
  maxScore: number;
  /** 0-100 scale, higher = more improvement potential (伸びしろ) */
  normalizedScore: number;
}

/** Provisional: result type id is 1:1 with the category that has the largest improvement potential */
export type ResultTypeId = CategoryId;

export interface ResultTypeMeta {
  id: ResultTypeId;
  name: string;
  description: string;
}

export interface PriorityAction {
  categoryId: CategoryId;
  /** 1-5, higher = more urgent to address first */
  priorityLevel: number;
  text: string;
}

export interface DiagnosisResult {
  answers: Answers;
  overallScore: number;
  categoryScores: CategoryScore[];
  resultType: ResultTypeMeta;
  strengths: string[];
  weaknesses: string[];
  priorityActions: PriorityAction[];
}
