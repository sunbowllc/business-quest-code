import type { AnswerOption, Question } from "./types";

/**
 * 表示順は「できている」→「できていない」。
 * value自体は変えず（4=最も良い状態, 1=最も改善余地が大きい）、
 * scoring.tsの反転ロジックとの整合性を保つ。
 */
export const ANSWER_OPTIONS: AnswerOption[] = [
  { value: 4, label: "できている" },
  { value: 3, label: "どちらかといえば できている" },
  { value: 2, label: "どちらかといえば できていない" },
  { value: 1, label: "できていない" },
];

/**
 * 6カテゴリ × 3問 = 18問。
 * 「できている」を前提としたポジティブな自己診断形式。
 * 当てはまるほど状態が良い＝改善余地（伸びしろ）は小さいという設計のため、
 * スコア計算側（computeCategoryScores）で値を反転して伸びしろスコアを出す。
 */
export const QUESTIONS: Question[] = [
  {
    id: "product-1",
    categoryId: "product",
    order: 1,
    text: "講座やサービスの内容を、ターゲットに合わせてわかりやすく伝えられている",
  },
  {
    id: "product-2",
    categoryId: "product",
    order: 2,
    text: "カリキュラムや教材が体系的に整理されている",
  },
  {
    id: "product-3",
    categoryId: "product",
    order: 3,
    text: "商品ラインナップ（入門・本講座・上位講座など）が整理され、次に何を提供すべきか明確になっている",
  },
  {
    id: "marketing-1",
    categoryId: "marketing",
    order: 4,
    text: "SNSやブログでの発信を、継続的に行えている",
  },
  {
    id: "marketing-2",
    categoryId: "marketing",
    order: 5,
    text: "発信内容から、講座・サービスの魅力がしっかり伝わっている",
  },
  {
    id: "marketing-3",
    categoryId: "marketing",
    order: 6,
    text: "紹介以外にも、安定した見込み客の流れができている",
  },
  {
    id: "sales-1",
    categoryId: "sales",
    order: 7,
    text: "個別相談や体験会からの成約に、一定の型ができている",
  },
  {
    id: "sales-2",
    categoryId: "sales",
    order: 8,
    text: "自分の価格設定に、自信を持って提示できている",
  },
  {
    id: "sales-3",
    categoryId: "sales",
    order: 9,
    text: "断られた時や「安くしてほしい」と言われた時も、落ち着いて対応できている",
  },
  {
    id: "support-1",
    categoryId: "support",
    order: 10,
    text: "受講生・クライアントの成果やフォローを、しっかり確認できている",
  },
  {
    id: "support-2",
    categoryId: "support",
    order: 11,
    text: "受講後のリピートや上位講座の案内が、仕組み化されている",
  },
  {
    id: "support-3",
    categoryId: "support",
    order: 12,
    text: "受講生からの質問対応やサポートに、無理のない範囲で対応できている",
  },
  {
    id: "branding-1",
    categoryId: "branding",
    order: 13,
    text: "同業の講師と比べた自分の強みや専門性を、うまく言葉にできている",
  },
  {
    id: "branding-2",
    categoryId: "branding",
    order: 14,
    text: "「この人から学びたい」と思われるプロフィールや世界観をつくれている",
  },
  {
    id: "branding-3",
    categoryId: "branding",
    order: 15,
    text: "お客様からどう見られたいか（ポジショニング）が、明確になっている",
  },
  {
    id: "operations-1",
    categoryId: "operations",
    order: 16,
    text: "売上・経費・稼働時間などの数字を、きちんと把握できている",
  },
  {
    id: "operations-2",
    categoryId: "operations",
    order: 17,
    text: "契約書・請求・スケジュール管理などの事務作業に、無理のない範囲で対応できている",
  },
  {
    id: "operations-3",
    categoryId: "operations",
    order: 18,
    text: "自分が動かなくても進む仕組み化・外注が、ある程度進んでいる",
  },
];
