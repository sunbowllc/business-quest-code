import type { CategoryId } from "./types";

/**
 * カテゴリ別の暫定コンテンツ（仮文言）。
 * 正式な強み・弱み・改善ヒント文章はIssue 3で実装する。
 */
export interface CategoryContent {
  strength: string;
  weakness: string;
  hint: string;
}

export const CATEGORY_CONTENT: Record<CategoryId, CategoryContent> = {
  product: {
    strength: "商品設計は比較的整理されており、土台ができています。",
    weakness: "講座内容やラインナップの整理に伸びしろがあります。",
    hint: "ターゲットに合わせて講座内容を言語化し、入門〜上位までの流れを整理してみましょう。",
  },
  marketing: {
    strength: "集客・発信の土台はある程度できています。",
    weakness: "発信の継続性と集客の仕組み化に伸びしろがあります。",
    hint: "発信のテーマと頻度を決め、紹介以外の見込み客の流れを1つ作ってみましょう。",
  },
  sales: {
    strength: "セールスの型は一定できています。",
    weakness: "成約の型づくりと価格提示への自信に伸びしろがあります。",
    hint: "個別相談の流れをテンプレート化し、価格提示のトークを決めておきましょう。",
  },
  support: {
    strength: "顧客対応・フォロー体制は比較的整っています。",
    weakness: "フォロー体制とリピート設計に伸びしろがあります。",
    hint: "受講後のフォロー方法とリピート案内のタイミングを仕組み化してみましょう。",
  },
  branding: {
    strength: "ブランディング・差別化はある程度言語化できています。",
    weakness: "自分ならではの強みの言語化に伸びしろがあります。",
    hint: "同業他者と比べた自分の強みを、3つのキーワードで書き出してみましょう。",
  },
  operations: {
    strength: "事業運営基盤は比較的整っています。",
    weakness: "数字管理と業務の仕組み化に伸びしろがあります。",
    hint: "売上・経費・稼働時間を月1回振り返る時間を決めてみましょう。",
  },
};
