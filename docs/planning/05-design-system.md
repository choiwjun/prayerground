# 당골래 (Dangolrae) 디자인 시스템

## 1. 디자인 방향

| 항목 | 방향 |
|------|------|
| 전체 무드 | 전통적이면서 현대적, 신뢰감 있는 |
| 색상 톤 | 따뜻한 자연색 + 전통 컬러 |
| UI 스타일 | 모바일 퍼스트, 깔끔하고 직관적 |
| 타겟 감정 | 경건함, 편안함, 신뢰 |

## 2. 색상 팔레트

### Primary
| 이름 | Hex | 용도 |
|------|-----|------|
| Primary | #8B4513 | CTA 버튼, 주요 액션 (갈색 계열 - 전통/자연) |
| Primary Light | #A0522D | 호버 상태 |
| Primary Dark | #654321 | 활성 상태 |

### Secondary
| 이름 | Hex | 용도 |
|------|-----|------|
| Secondary | #2E7D32 | 보조 액션, 아이콘 (녹색 - 자연/산) |
| Secondary Light | #4CAF50 | 태그, 배지 |
| Secondary Dark | #1B5E20 | 강조 |

### Neutral
| 이름 | Hex | 용도 |
|------|-----|------|
| Background | #FAFAF5 | 페이지 배경 (따뜻한 화이트) |
| Surface | #FFFFFF | 카드, 모달 배경 |
| Text Primary | #1A1A1A | 본문 텍스트 |
| Text Secondary | #666666 | 보조 텍스트 |
| Border | #E0E0E0 | 구분선, 테두리 |
| Disabled | #BDBDBD | 비활성 상태 |

### Status
| 이름 | Hex | 용도 |
|------|-----|------|
| Error | #D32F2F | 에러 상태 |
| Warning | #F57C00 | 경고 |
| Success | #388E3C | 성공 |
| Info | #1976D2 | 정보 |

### 기도터 유형별 마커 색상
| 유형 | 색상 | Hex |
|------|------|-----|
| 사찰 | 주황 | #FF8F00 |
| 굿당 | 보라 | #7B1FA2 |
| 서낭당 | 초록 | #2E7D32 |
| 산신당 | 파랑 | #1565C0 |
| 당산목 | 갈색 | #5D4037 |
| 기타 | 회색 | #757575 |

## 3. 타이포그래피

| 요소 | 폰트 | 사이즈 | 무게 |
|------|------|--------|------|
| H1 | Pretendard | 28px | Bold (700) |
| H2 | Pretendard | 24px | Bold (700) |
| H3 | Pretendard | 20px | SemiBold (600) |
| H4 | Pretendard | 18px | SemiBold (600) |
| Body Large | Pretendard | 16px | Regular (400) |
| Body | Pretendard | 14px | Regular (400) |
| Caption | Pretendard | 12px | Regular (400) |
| Label | Pretendard | 12px | Medium (500) |

## 4. 간격 시스템

| 토큰 | 값 | 용도 |
|------|-----|------|
| spacing-xs | 4px | 인라인 요소 간격 |
| spacing-sm | 8px | 작은 요소 간격 |
| spacing-md | 16px | 기본 간격 |
| spacing-lg | 24px | 섹션 간격 |
| spacing-xl | 32px | 큰 섹션 간격 |
| spacing-2xl | 48px | 페이지 섹션 간격 |

## 5. 컴포넌트 스타일

### Button
```
Primary:  bg-primary text-white rounded-lg px-6 py-3 font-semibold
Secondary: bg-transparent border-primary text-primary rounded-lg px-6 py-3
Ghost:    bg-transparent text-text-secondary px-4 py-2
```

### Card (기도터 카드)
```
bg-white rounded-xl shadow-sm border border-border p-4
이미지: rounded-lg aspect-[4/3] object-cover
제목: text-lg font-semibold
주소: text-sm text-text-secondary
유형 태그: bg-secondary-light/10 text-secondary rounded-full px-3 py-1 text-xs
```

### 바톰시트 (Vaul)
```
bg-white rounded-t-2xl shadow-lg
핸들바: bg-border rounded-full w-12 h-1.5 mx-auto mt-3
```

### 검색바
```
bg-white rounded-full border border-border px-4 py-3 shadow-sm
아이콘: text-text-secondary
플레이스홀더: text-text-secondary
```

### 필터 칩
```
Default: bg-white border border-border rounded-full px-4 py-2 text-sm
Active:  bg-primary text-white rounded-full px-4 py-2 text-sm
```

## 6. 아이콘

| 아이콘셋 | 용도 |
|---------|------|
| Lucide React | UI 아이콘 (shadcn/ui 기본) |
| 커스텀 마커 아이콘 | 기도터 유형별 지도 마커 |

## 7. 반응형 브레이크포인트

| 이름 | 범위 | 레이아웃 |
|------|------|----------|
| Mobile | < 768px | 1컬럼, 하단 탭바, 풀 너비 카드 |
| Tablet | 768px ~ 1024px | 2컬럼 그리드 |
| Desktop | > 1024px | 3컬럼 그리드, 사이드바 가능 |

### 모바일 퍼스트
- 기본 디자인은 모바일 (375px) 기준
- Tailwind 반응형 프리픽스: sm → md → lg → xl
- 하단 탭바: 모바일만 표시 (데스크톱은 상단 네비게이션)

## 8. 그림자 & 라운드

| 토큰 | 값 |
|------|-----|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) |
| shadow-md | 0 4px 6px rgba(0,0,0,0.07) |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) |
| rounded-sm | 4px |
| rounded-md | 8px |
| rounded-lg | 12px |
| rounded-xl | 16px |
| rounded-full | 9999px |
