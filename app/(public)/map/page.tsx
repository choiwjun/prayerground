import { KakaoMap } from "@/components/map/kakao-map";

export default function MapPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">지도 탐색</h1>
        <p className="mt-2 text-sm text-muted">
          카카오맵 SDK와 커스텀 마커를 사용하는 지도 화면의 초기 골격입니다.
        </p>
      </div>
      <KakaoMap />
    </div>
  );
}
