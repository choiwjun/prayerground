/**
 * 수집된 원본 데이터를 Supabase seed SQL로 변환
 *
 * 사용법:
 *   npx tsx scripts/data-collection/transform-to-seed.ts
 *
 * 입력: scripts/data-collection/output/kakao-raw.json
 * 출력: scripts/data-collection/output/seed.sql
 */

import fs from "fs";
import path from "path";

interface PrayerSite {
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  contact: string | null;
  description: string | null;
  kakao_id: string;
  kakao_category: string;
  kakao_url: string;
}

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''");
}

function main() {
  const inputPath = path.join(__dirname, "output", "kakao-raw.json");

  if (!fs.existsSync(inputPath)) {
    console.error("❌ kakao-raw.json이 없습니다. collect-kakao.ts를 먼저 실행하세요.");
    process.exit(1);
  }

  const sites: PrayerSite[] = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  console.log(`📄 ${sites.length}건 로드\n`);

  // SQL 생성
  const lines: string[] = [
    "-- 자동 생성된 기도터 초기 데이터",
    `-- 생성일: ${new Date().toISOString().split("T")[0]}`,
    `-- 총 ${sites.length}건`,
    "",
    "INSERT INTO prayer_sites (name, address, lat, lng, type, description, images, contact, is_visible)",
    "VALUES",
  ];

  const values = sites.map((site, i) => {
    const name = escapeSQL(site.name);
    const address = escapeSQL(site.address);
    const desc = site.description ? `'${escapeSQL(site.description)}'` : "NULL";
    const contact = site.contact ? `'${escapeSQL(site.contact)}'` : "NULL";
    const comma = i < sites.length - 1 ? "," : ";";

    return `  ('${name}', '${address}', ${site.lat}, ${site.lng}, '${site.type}', ${desc}, '{}', ${contact}, true)${comma}`;
  });

  lines.push(...values);

  // 저장
  const outputPath = path.join(__dirname, "output", "seed.sql");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");
  console.log(`✅ SQL 생성: ${outputPath}`);
  console.log(`   ${sites.length}건 INSERT 문`);
}

main();
