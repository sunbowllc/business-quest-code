import type { CategoryId, ResultTypeMeta } from "./types";

/**
 * 6タイプ（仮マッピング）
 * 各タイプは、6領域のうち改善余地（伸びしろ）が最大の領域に対応する。
 * 正式な判定ロジックの精緻化はIssue 3で行う。
 */
export const RESULT_TYPES: Record<CategoryId, ResultTypeMeta> = {
  product: {
    id: "product",
    name: "商品磨き込み型",
    description:
      "商品設計の伸びしろが大きいタイプ。講座内容やラインナップを整理すると成果につながりやすい状態です。",
  },
  marketing: {
    id: "marketing",
    name: "発信・集客強化型",
    description:
      "集客・発信の伸びしろが大きいタイプ。発信の継続と集客の仕組み化が今後のカギになります。",
  },
  sales: {
    id: "sales",
    name: "セールス自信構築型",
    description:
      "セールスの伸びしろが大きいタイプ。成約の型づくりと価格提示への自信が今後のテーマです。",
  },
  support: {
    id: "support",
    name: "顧客伴走・リピート設計型",
    description:
      "顧客対応・継続の伸びしろが大きいタイプ。フォロー体制とリピートの仕組み化が今後のテーマです。",
  },
  branding: {
    id: "branding",
    name: "ブランド言語化型",
    description:
      "ブランディング・差別化の伸びしろが大きいタイプ。自分ならではの強みの言語化が今後のテーマです。",
  },
  operations: {
    id: "operations",
    name: "事業基盤仕組み化型",
    description:
      "事業運営基盤の伸びしろが大きいタイプ。数字管理と業務の仕組み化が今後のテーマです。",
  },
};
