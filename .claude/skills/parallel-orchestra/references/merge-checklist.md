# Merge Checklist

- 모든 lane이 자신의 `Owned files` 범위만 수정했는가
- 인터페이스 계약이 먼저 합의되었는가
- 서로 충돌하는 결정이 있으면 merge owner가 하나로 정리했는가
- 테스트 또는 검증 lane이 실제 리스크를 적었는가
- 요약에 changed files, risks, handoff 여부가 포함되었는가
- 남은 작업이 phase 실행 수준이면 `auto-orchestrate`로 넘길지 판단했는가

## Final Response Shape

최종 응답은 아래 순서를 권장합니다.

1. 무엇을 병렬화했는지
2. 각 lane의 결론 한 줄씩
3. 충돌 해결 또는 미해결 리스크
4. 다음 행동
