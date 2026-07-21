import type { Category, CategoryId } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "product",
    name: "商品設計",
    shortName: "商品設計",
    description: "講座・サービスの内容設計とラインナップの整理度",
  },
  {
    id: "marketing",
    name: "集客・発信",
    shortName: "集客・発信",
    description: "発信の継続性と、見込み客を集める仕組み",
  },
  {
    id: "sales",
    name: "セールス",
    shortName: "セールス",
    description: "個別相談・体験会からの成約力と価格提示の自信",
  },
  {
    id: "support",
    name: "顧客対応・継続",
    shortName: "顧客対応",
    description: "受講生フォローとリピート・アップセルの仕組み化",
  },
  {
    id: "branding",
    name: "ブランディング・差別化",
    shortName: "ブランディング",
    description: "自分ならではの強みや世界観の言語化",
  },
  {
    id: "operations",
    name: "事業運営基盤",
    shortName: "事業運営基盤",
    description: "数字管理・事務作業・仕組み化の基盤",
  },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = CATEGORIES.reduce(
  (map, category) => {
    map[category.id] = category;
    return map;
  },
  {} as Record<CategoryId, Category>,
);
