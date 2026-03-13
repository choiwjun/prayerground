# 기도터 데이터 수집 스크립트

카카오맵 키워드 검색 API 기반 기도터 데이터 수집

## 사전 준비

1. **카카오 REST API Key 발급**
   - https://developers.kakao.com 접속
   - 애플리케이션 추가 → REST API 키 복사

2. **환경변수 설정**
   ```bash
   export KAKAO_REST_API_KEY=your_key_here
   ```

## 실행

```bash
# 1. 카카오맵에서 데이터 수집
npx tsx scripts/data-collection/collect-kakao.ts

# 2. Supabase seed SQL로 변환
npx tsx scripts/data-collection/transform-to-seed.ts
```

## 출력 파일

```
output/
├── kakao-raw.json   # 수집 원본 (중복 제거 완료)
└── seed.sql         # Supabase INSERT 문
```

## 검색 키워드 (18개)

| 유형 | 키워드 |
|------|--------|
| 사찰 | 사찰, 절 사찰, 암자 |
| 굿당 | 굿당, 신당, 점집, 무속인, 철학관 |
| 서낭당 | 서낭당, 성황당 |
| 산신당 | 산신당, 산신각, 기도원 |
| 당산목 | 당산나무, 당산목, 신목, 장승, 솟대 |

전국 17개 시도 x 18개 키워드 = 306회 검색
