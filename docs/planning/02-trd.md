# 당골래 (Dangolrae) TRD

## 1. 기술 스택

### 프론트엔드
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14+ | App Router, SSR/SSG |
| React | 18+ | UI 라이브러리 |
| TypeScript | 5+ | 타입 안전성 |
| Tailwind CSS | 3+ | 유틸리티 CSS |
| shadcn/ui | latest | UI 컴포넌트 (Radix UI 기반) |

### 백엔드 / 데이터베이스
| 기술 | 용도 |
|------|------|
| Supabase | BaaS (PostgreSQL + Auth + Storage + Realtime) |
| PostgreSQL | 메인 데이터베이스 (Supabase 내장) |
| Supabase Auth | 관리자 인증 (MVP), 사용자 인증 (v2) |
| Supabase Storage | 기도터 이미지 저장 |

### 지도
| 기술 | 용도 |
|------|------|
| Kakao Maps JavaScript SDK | 지도 렌더링, 마커, 오버레이 |
| react-kakao-maps-sdk | 카카오맵 React 래퍼 |
| supercluster | 마커 클러스터링 알고리즘 |
| Kakao Local API / services | 주소 ↔ 좌표 변환, 장소 검색 (관리자 입력 시) |

### 인프라
| 기술 | 용도 |
|------|------|
| Vercel | 프론트엔드 배포 + CDN + Analytics |
| Supabase Cloud | 데이터베이스/스토리지 호스팅 |

### 오픈소스 라이브러리
| 라이브러리 | 용도 | 우선순위 |
|-----------|------|---------|
| react-kakao-maps-sdk + supercluster | 지도 + 클러스터링 | 필수 |
| shadcn/ui | UI 컴포넌트 전반 | 필수 |
| react-hook-form + zod | 관리자 폼 + 유효성 검사 | 필수 |
| Vaul | 모바일 바톰시트 | 권장 |
| react-dropzone | 관리자 이미지 업로드 | 권장 |
| fuse.js | 클라이언트 퍼지 검색 | 선택 |
| Tanstack Table | 관리자 데이터 테이블 | 선택 |

## 2. 아키텍처

### 전체 구조
```
[Client - Next.js on Vercel]
    ↓ (SSR/CSR)
[Supabase Client SDK]
    ↓
[Supabase Cloud]
├── PostgreSQL (데이터)
├── Auth (관리자 인증)
├── Storage (이미지)
└── Edge Functions (필요 시)

[Kakao Maps JavaScript SDK]
    ↑ (브라우저 직접 호출, JavaScript 키)
[Client Browser]

[Next.js Server / Route Handler]
    ↓ (서버 측 호출, REST API 키)
[Kakao Local API]
```

### Next.js App Router 구조
```
app/
├── (public)/           # 사용자 화면 (비인증)
│   ├── page.tsx        # 홈 (/)
│   ├── map/
│   │   └── page.tsx    # 지도 (/map)
│   ├── sites/
│   │   └── [id]/
│   │       └── page.tsx # 기도터 상세 (/sites/:id)
│   └── search/
│       └── page.tsx    # 검색결과 (/search)
├── admin/              # 관리자 화면 (인증 필요)
│   ├── layout.tsx      # 관리자 레이아웃 + 인증 가드
│   ├── sites/
│   │   └── page.tsx    # 기도터 관리 (/admin/sites)
│   ├── curations/
│   │   └── page.tsx    # 큐레이션 관리 (/admin/curations)
│   └── banners/
│       └── page.tsx    # 배너 관리 (/admin/banners)
└── layout.tsx          # 루트 레이아웃
```

### 패턴
- **데이터 페칭**: Server Components + Supabase SSR Client
- **상태 관리**: React Server Components (서버) + URL State (클라이언트 필터)
- **인증**: Supabase Auth (관리자만, middleware로 보호)
- **이미지**: Supabase Storage + Next.js Image Optimization

## 3. 보안 요구사항

| 항목 | 요구사항 |
|------|----------|
| 관리자 인증 | Supabase Auth (이메일/비밀번호 or 소셜) |
| RLS (Row Level Security) | 읽기: public, 쓰기: authenticated (관리자만) |
| API 키 보호 | 카카오 JavaScript 키는 도메인 제한, REST API 키는 브라우저 노출 금지 |
| 환경 변수 | Supabase URL/Key는 .env.local에서 관리 |
| CORS | Supabase 기본 설정 활용 |

## 4. 성능 요구사항

| 항목 | 목표 |
|------|------|
| 초기 로딩 (LCP) | 2.5초 이내 |
| 지도 로딩 | 2초 이내 |
| 마커 렌더링 (300개) | 1초 이내 (클러스터링 적용) |
| 검색 응답 | 500ms 이내 |
| Lighthouse Score | Performance 80+ |

### 최적화 전략
- Next.js SSR로 초기 데이터 프리페치
- 지도 컴포넌트 dynamic import (코드 스플리팅)
- 이미지: Next.js Image + WebP + lazy loading
- 클러스터링으로 대량 마커 성능 확보
- Supabase 쿼리 인덱싱

## 5. 개발 환경

| 항목 | 버전/설정 |
|------|----------|
| Node.js | 20 LTS |
| 패키지 매니저 | pnpm |
| TypeScript | strict mode |
| ESLint | Next.js 기본 + custom rules |
| Prettier | 기본 설정 |
| Git | Conventional Commits |

## 6. 배포 전략

| 환경 | 설명 |
|------|------|
| Development | localhost:3000 |
| Preview | Vercel Preview (PR별 자동 배포) |
| Production | Vercel Production (main 브랜치) |

### CI/CD
- GitHub → Vercel 자동 배포
- PR 생성 시 Preview 환경 자동 배포
- main 머지 시 Production 자동 배포
