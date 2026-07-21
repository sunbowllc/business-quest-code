export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        <p>Business Quest code（オンライン講師の能力診断）</p>
        <p className="mt-1">© {new Date().getFullYear()} Business Quest code</p>
      </div>
    </footer>
  );
}
