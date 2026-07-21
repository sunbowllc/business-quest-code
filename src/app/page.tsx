import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/diagnosis/categories";
import { CATEGORY_ICONS } from "@/lib/diagnosis/icons";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b bg-gradient-to-b from-accent/40 to-background">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Compass className="h-3.5 w-3.5" />
            オンライン講師の能力診断
          </span>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            オンライン講師としての
            <br />
            事業の現在地がわかる
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            18問の診断で、あなたの強み・弱み・優先改善ポイントを見える化します。
          </p>
          <Button
            size="lg"
            className="mt-2 h-12 px-8 text-base"
            render={
              <Link href="/diagnosis">
                無料診断をはじめる
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <p className="text-xs text-muted-foreground">
            18問・約4分・登録不要ですぐに結果がわかります
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold sm:text-2xl">
            Business Quest codeとは
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Business Quest codeは、オンライン講師として活動する個人事業主向けの無料能力診断です。
            商品設計、集客・発信、セールス、顧客対応・継続、ブランディング・差別化、事業運営基盤の6領域から、あなたの事業運営の現在地を診断します。
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            診断後は、総合スコア、領域別スコア、自分の強み・弱み、優先的に見直すべき改善ポイントを確認できます。
            自分で改善できる方は、そのまま事業改善にご活用ください。サポートが必要な方は、無料相談をご利用いただけます。
          </p>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-xl font-bold sm:text-2xl">
            診断でわかる6つの領域
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.id];
              return (
                <Card key={category.id} className="h-full">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6">
        <h2 className="text-xl font-bold sm:text-2xl">
          診断後は、無料相談も可能です
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          自分で改善を進められそうな方は、診断結果をもとにぜひ実践してみてください。
          何から始めればいいかわからない方には、無料相談への案内もご用意しています。
        </p>
        <Button
          size="lg"
          className="mt-6 h-12 px-8 text-base"
          render={
            <Link href="/diagnosis">
              無料診断をはじめる
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </section>
    </div>
  );
}
