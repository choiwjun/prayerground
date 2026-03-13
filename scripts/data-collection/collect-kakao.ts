/**
 * 카카오맵 키워드 검색 기반 기도터 데이터 수집 스크립트
 *
 * 사용법:
 *   1. .env 파일에 KAKAO_REST_API_KEY 설정
 *   2. npx tsx scripts/data-collection/collect-kakao.ts
 *
 * 출력: scripts/data-collection/output/kakao-raw.json
 */

import fs from "fs";
import path from "path";

// ─── 설정 ───────────────────────────────────────────────

const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
if (!KAKAO_REST_API_KEY) {
  console.error("❌ KAKAO_REST_API_KEY 환경변수를 설정해주세요.");
  console.error("   export KAKAO_REST_API_KEY=your_key_here");
  process.exit(1);
}

const API_BASE = "https://dapi.kakao.com/v2/local/search/keyword.json";
const RATE_LIMIT_MS = 200; // 카카오 API 초당 10건 제한 → 200ms 간격

// ─── 키워드 + 유형 매핑 ─────────────────────────────────

interface KeywordConfig {
  keyword: string;
  type: string; // prayer_sites.type에 매핑
}

const KEYWORDS: KeywordConfig[] = [
  // 사찰
  { keyword: "사찰", type: "사찰" },
  { keyword: "절 사찰", type: "사찰" },
  { keyword: "암자", type: "사찰" },
  // 굿당
  { keyword: "굿당", type: "굿당" },
  { keyword: "신당", type: "굿당" },
  { keyword: "점집", type: "굿당" },
  { keyword: "무속인", type: "굿당" },
  { keyword: "철학관", type: "굿당" },
  // 서낭당
  { keyword: "서낭당", type: "서낭당" },
  { keyword: "성황당", type: "서낭당" },
  // 산신당
  { keyword: "산신당", type: "산신당" },
  { keyword: "산신각", type: "산신당" },
  { keyword: "기도원", type: "산신당" },
  // 당산목
  { keyword: "당산나무", type: "당산목" },
  { keyword: "당산목", type: "당산목" },
  { keyword: "신목", type: "당산목" },
  { keyword: "장승", type: "당산목" },
  { keyword: "솟대", type: "당산목" },
];

// 전국 17개 시도
const REGIONS = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

// ─── 타입 ───────────────────────────────────────────────

interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // lng
  y: string; // lat
  phone: string;
  category_name: string;
  place_url: string;
}

interface KakaoResponse {
  meta: { total_count: number; pageable_count: number; is_end: boolean };
  documents: KakaoPlace[];
}

interface PrayerSite {
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  contact: string | null;
  description: string | null;
  source_keyword: string;
  source_region: string;
  kakao_id: string;
  kakao_category: string;
  kakao_url: string;
}

// ─── API 호출 ───────────────────────────────────────────

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchKakao(
  query: string,
  page: number = 1,
  size: number = 15
): Promise<KakaoResponse> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    size: String(size),
  });

  const res = await fetch(`${API_BASE}?${params}`, {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`카카오 API 에러 (${res.status}): ${text}`);
  }

  return res.json();
}

// 키워드 + 지역 조합으로 전체 페이지 순회
async function searchAll(
  keyword: string,
  region: string
): Promise<KakaoPlace[]> {
  const results: KakaoPlace[] = [];
  let page = 1;

  while (true) {
    await sleep(RATE_LIMIT_MS);

    try {
      const data = await searchKakao(`${region} ${keyword}`, page, 15);
      results.push(...data.documents);

      if (data.meta.is_end || page >= 3) break; // 카카오 최대 45건(3페이지)
      page++;
    } catch (err) {
      console.warn(`  ⚠️ ${region} ${keyword} p${page} 실패:`, (err as Error).message);
      break;
    }
  }

  return results;
}

// ─── 변환 ───────────────────────────────────────────────

function toSite(
  place: KakaoPlace,
  config: KeywordConfig,
  region: string
): PrayerSite {
  return {
    name: place.place_name,
    address: place.road_address_name || place.address_name,
    lat: parseFloat(place.y),
    lng: parseFloat(place.x),
    type: config.type,
    contact: place.phone || null,
    description: null,
    source_keyword: config.keyword,
    source_region: region,
    kakao_id: place.id,
    kakao_category: place.category_name,
    kakao_url: place.place_url,
  };
}

// ─── 중복 제거 ──────────────────────────────────────────

function deduplicate(sites: PrayerSite[]): PrayerSite[] {
  const seen = new Map<string, PrayerSite>();

  for (const site of sites) {
    // 1차: 카카오 ID 기준
    if (seen.has(site.kakao_id)) continue;

    // 2차: 이름 + 좌표 근접(50m 이내) 기준
    const key = site.name;
    const existing = seen.get(key);
    if (existing) {
      const dist = haversine(existing.lat, existing.lng, site.lat, site.lng);
      if (dist < 0.05) continue; // 50m 이내 중복
    }

    seen.set(site.kakao_id, site);
  }

  return Array.from(seen.values());
}

function haversine(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── 노이즈 필터링 ─────────────────────────────────────

const NOISE_PATTERNS = [
  /카페/,
  /커피/,
  /맛집/,
  /식당/,
  /음식/,
  /치킨/,
  /피자/,
  /편의점/,
  /약국/,
  /병원/,
  /학원/,
  /부동산/,
  /세탁/,
  /미용/,
  /네일/,
  /PC방/,
  /노래방/,
  /주유소/,
  /주차장/,
  /마트/,
  /슈퍼/,
];

function isNoise(place: KakaoPlace): boolean {
  const category = place.category_name.toLowerCase();
  const name = place.place_name;

  // 카테고리 기반 필터: 음식점, 카페 등 제외
  if (
    category.includes("음식점") ||
    category.includes("카페") ||
    category.includes("의료")
  ) {
    return true;
  }

  // 이름 기반 필터
  return NOISE_PATTERNS.some((p) => p.test(name));
}

// ─── 메인 ───────────────────────────────────────────────

async function main() {
  console.log("🔍 카카오맵 기도터 데이터 수집 시작\n");
  console.log(`   키워드: ${KEYWORDS.length}개`);
  console.log(`   지역: ${REGIONS.length}개`);
  console.log(`   총 조합: ${KEYWORDS.length * REGIONS.length}건\n`);

  const allSites: PrayerSite[] = [];
  let totalApi = 0;

  for (const config of KEYWORDS) {
    console.log(`\n📌 [${config.type}] "${config.keyword}" 검색 중...`);

    for (const region of REGIONS) {
      const places = await searchAll(config.keyword, region);
      totalApi++;

      // 노이즈 필터링
      const filtered = places.filter((p) => !isNoise(p));
      const sites = filtered.map((p) => toSite(p, config, region));

      if (sites.length > 0) {
        process.stdout.write(`  ${region}: ${sites.length}건  `);
      }

      allSites.push(...sites);
    }
  }

  console.log(`\n\n📊 수집 완료:`);
  console.log(`   API 호출: ${totalApi}건`);
  console.log(`   수집 원본: ${allSites.length}건`);

  // 중복 제거
  const unique = deduplicate(allSites);
  console.log(`   중복 제거 후: ${unique.length}건`);

  // 유형별 통계
  const stats = new Map<string, number>();
  for (const site of unique) {
    stats.set(site.type, (stats.get(site.type) || 0) + 1);
  }
  console.log("\n📈 유형별 통계:");
  for (const [type, count] of stats.entries()) {
    console.log(`   ${type}: ${count}건`);
  }

  // 저장
  const outputDir = path.join(__dirname, "output");
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, "kakao-raw.json");
  fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2), "utf-8");
  console.log(`\n✅ 저장: ${outputPath}`);

  // 300건 달성 여부
  if (unique.length >= 300) {
    console.log(`\n🎉 목표 300건 달성! (${unique.length}건)`);
  } else {
    console.log(`\n⚠️ 목표 300건 미달 (${unique.length}건) — 키워드 추가 또는 수작업 보완 필요`);
  }
}

main().catch(console.error);
