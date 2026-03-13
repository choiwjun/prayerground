import Link from "next/link";

const navItems = [
  { href: "/admin/sites", label: "기도터 관리" },
  { href: "/admin/curations", label: "큐레이션 관리" },
  { href: "/admin/banners", label: "배너 관리" }
];

export function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-border bg-surface px-4 py-6 md:border-b-0 md:border-r">
        <Link className="text-lg font-semibold text-primary" href="/">
          당골래 Admin
        </Link>
        <nav className="mt-6 flex gap-2 overflow-x-auto md:flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-xl border border-border px-4 py-3 text-sm text-foreground transition hover:border-primary hover:text-primary"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="border-b border-border bg-surface px-6 py-4">
          <p className="text-sm text-muted">관리자 인증 가드는 Supabase 세션 연동 후 활성화합니다.</p>
        </header>
        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
