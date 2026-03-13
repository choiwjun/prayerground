"use client";

import { CustomOverlayMap, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const sampleMarker = {
  id: "sample-site",
  name: "샘플 기도터",
  lat: 37.5665,
  lng: 126.978
};

export function KakaoMap() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "";

  const [, loadingError] = useKakaoLoader({
    appkey: appKey,
    libraries: ["clusterer", "services"]
  });

  if (!appKey) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
        `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`가 설정되지 않아 지도를 표시하지 않습니다.
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="rounded-3xl border border-status-error/20 bg-status-error/5 p-6 text-sm text-status-error">
        카카오맵 SDK 로드 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
      <Map center={{ lat: sampleMarker.lat, lng: sampleMarker.lng }} className="h-[460px] w-full" level={8}>
        <MapMarker position={{ lat: sampleMarker.lat, lng: sampleMarker.lng }} />
        <CustomOverlayMap position={{ lat: sampleMarker.lat, lng: sampleMarker.lng }}>
          <div className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md">
            {sampleMarker.name}
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
}
