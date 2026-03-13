import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "카카오맵 기반 탐색",
    description: "유형별 마커, 영역 필터, 내 주변 탐색을 준비합니다.",
    href: "/map",
    cta: "지도 보기"
  },
  {
    title: "기도터 큐레이션",
    description: "관리자가 편성한 추천 기도터 그룹을 이 홈 화면에서 노출합니다.",
    href: "/search",
    cta: "검색 보기"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-primary px-6 py-8 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/75">Dangolrae</p>
        <h1 className="mt-3 text-3xl font-bold">전국 기도터를 한눈에 탐색하는 지도형 디렉터리</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">
          Phase 0 기준의 초기 프로젝트 골격입니다. 홈, 지도, 검색, 관리자 영역의 기본 라우트와
          공통 레이아웃을 먼저 준비했습니다.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/map">지도 열기</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/login">관리자 로그인</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={section.href}>{section.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
