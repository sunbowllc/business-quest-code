import type { AnswerOption, Question } from "./types";

export const ANSWER_OPTIONS: AnswerOption[] = [
  { value: 1, label: "当てはまらない" },
  { value: 2, label: "少し当てはまる" },
  { value: 3, label: "当てはまる" },
  { value: 4, label: "かなり当てはまる" },
];

/**
 * 6カテゴリ × 3問 = 18問。
 * 当てはまるほど「改善余地（伸びしろ）」が大きいと判定する設計。
 */
export const QUESTIONS: Question[] = [
  {
    id: "product-1",
    categoryId: "product",
    order: 1,
    text: "講座やサービスの内容を、ターゲットに合わせて明確に言語化できていないと感じますか？",
  },
  {
    id: "product-2",
    categoryId: "product",
    order: 2,
    text: "カリキュラムや教材の内容が体系立っておらず、その都度その場で作っている部分がありますか？",
  },
  {
    id: "product-3",
    categoryId: "product",
    order: 3,
    text: "商品ラインナップ（入門・本講座・上位講座など）が整理されておらず、次に何を提供すべきか迷うことがありますか？",
  },
  {
    id: "marketing-1",
    categoryId: "marketing",
    order: 4,
    text: "SNSやブログでの発信が不定期で、認知を広げる仕組みができていないと感じますか？",
  },
  {
    id: "marketing-2",
    categoryId: "marketing",
    order: 5,
    text: "自分の講座・サービスの魅力が、発信内容から十分に伝わっていないと感じますか？",
  },
  {
    id: "marketing-3",
    categoryId: "marketing",
    order: 6,
    text: "集客の多くを紹介や単発の施策に頼っており、安定した見込み客の流れができていませんか？",
  },
  {
    id: "sales-1",
    categoryId: "sales",
    order: 7,
    text: "個別相談や体験会からの成約率にばらつきがあり、成約の型が定まっていないと感じますか？",
  },
  {
    id: "sales-2",
    categoryId: "sales",
    order: 8,
    text: "価格設定について、自信を持って提示できていない、または相場観に迷いがありますか？",
  },
  {
    id: "sales-3",
    categoryId: "sales",
    order: 9,
    text: "「安くしてほしい」と言われた時の対応や、断られた時のフォローが場当たり的になっていますか？",
  },
  {
    id: "support-1",
    categoryId: "support",
    order: 10,
    text: "受講生・クライアントが成果を出せているかのフォローや進捗確認が、手薄になっていますか？",
  },
  {
    id: "support-2",
    categoryId: "support",
    order: 11,
    text: "受講後のリピートや上位講座への案内が、仕組み化されていないと感じますか？",
  },
  {
    id: "support-3",
    categoryId: "support",
    order: 12,
    text: "受講生からの質問対応やサポート業務に、想定以上の時間を取られていますか？",
  },
  {
    id: "branding-1",
    categoryId: "branding",
    order: 13,
    text: "同業の他の講師と比べて、自分ならではの強みや専門性をうまく言葉にできていないと感じますか？",
  },
  {
    id: "branding-2",
    categoryId: "branding",
    order: 14,
    text: "「この人から学びたい」と思われるような世界観・プロフィールが整っていないと感じますか？",
  },
  {
    id: "branding-3",
    categoryId: "branding",
    order: 15,
    text: "お客様からどう見られたいか（ポジショニング）が、明確に定まっていないと感じますか？",
  },
  {
    id: "operations-1",
    categoryId: "operations",
    order: 16,
    text: "売上・経費・稼働時間などの数字を、きちんと把握できていないと感じますか？",
  },
  {
    id: "operations-2",
    categoryId: "operations",
    order: 17,
    text: "契約書・請求・スケジュール管理などの事務作業に、想定以上の時間や負担を感じますか？",
  },
  {
    id: "operations-3",
    categoryId: "operations",
    order: 18,
    text: "自分が動かなければ止まってしまう業務が多く、仕組み化・外注が進んでいないと感じますか？",
  },
];
