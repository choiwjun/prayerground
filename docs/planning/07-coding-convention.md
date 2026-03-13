# 당골래 (Dangolrae) 코딩 컨벤션

## 1. 프로젝트 구조

```
prayerground/
├── app/
│   ├── (public)/                # 사용자 화면 그룹
│   │   ├── page.tsx             # 홈
│   │   ├── map/page.tsx         # 지도
│   │   ├── sites/[id]/page.tsx  # 기도터 상세
│   │   └── search/page.tsx      # 검색결과
│   ├── admin/                   # 관리자 화면 그룹
│   │   ├── layout.tsx           # 관리자 레이아웃 + 인증 가드
│   │   ├── sites/page.tsx       # 기도터 관리
│   │   ├── curations/page.tsx   # 큐레이션 관리
│   │   └── banners/page.tsx     # 배너 관리
│   ├── layout.tsx               # 루트 레이아웃
│   └── globals.css              # 전역 스타일
├── components/
│   ├── ui/                      # shadcn/ui 컴포넌트
│   ├── map/                     # 지도 관련 컴포넌트
│   │   ├── kakao-map.tsx
│   │   ├── site-marker.tsx
│   │   ├── marker-cluster.tsx
│   │   └── site-bottom-sheet.tsx
│   ├── site/                    # 기도터 관련 컴포넌트
│   │   ├── site-card.tsx
│   │   ├── site-info.tsx
│   │   └── image-gallery.tsx
│   ├── home/                    # 홈 화면 컴포넌트
│   │   ├── banner-carousel.tsx
│   │   ├── search-bar.tsx
│   │   ├── map-preview.tsx
│   │   ├── curation-section.tsx
│   │   └── nearby-site-list.tsx
│   ├── admin/                   # 관리자 컴포넌트
│   │   ├── admin-layout.tsx
│   │   ├── site-form.tsx
│   │   ├── curation-form.tsx
│   │   └── data-table.tsx
│   └── layout/                  # 레이아웃 컴포넌트
│       └── bottom-tab-bar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # 브라우저 클라이언트
│   │   ├── server.ts            # 서버 클라이언트
│   │   └── middleware.ts        # 인증 미들웨어
│   ├── types/
│   │   └── database.ts          # Supabase 자동 생성 타입
│   └── utils/
│       ├── geo.ts               # 지리 관련 유틸
│       └── format.ts            # 포맷팅 유틸
├── public/
│   └── markers/                 # 커스텀 마커 아이콘
├── supabase/
│   └── migrations/              # DB 마이그레이션 파일
├── .env.local                   # 환경 변수 (gitignore)
├── middleware.ts                # Next.js 미들웨어
└── tailwind.config.ts           # Tailwind 설정
```

## 2. 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 파일 (컴포넌트) | kebab-case | `site-card.tsx` |
| 파일 (유틸) | kebab-case | `geo.ts` |
| 컴포넌트 | PascalCase | `SiteCard` |
| 함수 | camelCase | `getSiteById` |
| 변수 | camelCase | `siteData` |
| 상수 | UPPER_SNAKE_CASE | `MAX_SEARCH_RESULTS` |
| 타입/인터페이스 | PascalCase | `PrayerSite` |
| CSS 클래스 | Tailwind 유틸리티 | `bg-primary text-white` |
| DB 테이블 | snake_case | `prayer_sites` |
| DB 컬럼 | snake_case | `is_visible` |

## 3. TypeScript 규칙

```typescript
// 타입 정의는 lib/types/에 집중
// Supabase CLI로 자동 생성된 타입 사용
import type { Database } from '@/lib/types/database';

type PrayerSite = Database['public']['Tables']['prayer_sites']['Row'];
type PrayerSiteInsert = Database['public']['Tables']['prayer_sites']['Insert'];

// Props 타입은 컴포넌트 파일 내에서 정의
interface SiteCardProps {
  site: PrayerSite;
  onClick?: () => void;
}

// strict mode 활성화 (tsconfig.json)
// any 사용 금지 — unknown 사용
// non-null assertion (!) 최소화
```

## 4. 컴포넌트 규칙

```typescript
// Server Component (기본) — 데이터 페칭이 필요한 경우
export default async function SitePage({ params }: { params: { id: string } }) {
  const site = await getSiteById(params.id);
  return <SiteInfo site={site} />;
}

// Client Component — 상호작용이 필요한 경우
'use client';
export function SearchBar() {
  const [query, setQuery] = useState('');
  // ...
}

// 규칙:
// - Server Component 우선 사용
// - 'use client'는 필요한 컴포넌트에만
// - 지도, 검색, 필터 등 인터랙티브 UI만 Client Component
```

## 5. Supabase 규칙

```typescript
// 서버 사이드 (Server Component, Server Action)
import { createServerClient } from '@/lib/supabase/server';

// 클라이언트 사이드 (Client Component)
import { createBrowserClient } from '@/lib/supabase/client';

// 데이터 쿼리 패턴
const { data, error } = await supabase
  .from('prayer_sites')
  .select('*')
  .eq('is_visible', true)
  .order('created_at', { ascending: false });

// 에러 핸들링 필수
if (error) throw error;
```

## 6. Lint & Formatter

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## 7. Git 커밋 메시지

Conventional Commits 사용:

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 등 기타 변경
```

예시:
```
feat: 기도터 지도 마커 클러스터링 추가
fix: 내 주변 탐색 시 GPS 권한 에러 처리
chore: shadcn/ui 컴포넌트 초기 설정
```

## 8. 환경 변수

```bash
# .env.example 참고 후 .env.local 생성 (gitignore 대상)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=
KAKAO_REST_API_KEY=
```

- `NEXT_PUBLIC_` 접두사: 클라이언트에서 접근 가능
- `SUPABASE_SERVICE_ROLE_KEY`: 서버에서만 사용 (관리자 작업)

## 9. 성능 가이드라인

- 이미지: `next/image` + WebP + lazy loading
- 지도 컴포넌트: `dynamic(() => import(), { ssr: false })`
- 무거운 라이브러리: dynamic import로 코드 스플리팅
- Supabase 쿼리: 필요한 컬럼만 select
- 목록: 가상화 또는 페이지네이션 (데이터 많을 시)
