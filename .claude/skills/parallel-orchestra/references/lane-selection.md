# Lane Selection

## Basic Test

아래 네 질문에 모두 `yes`면 병렬화 후보입니다.

1. 각 lane의 산출물이 분리되는가
2. 같은 파일을 동시에 수정하지 않는가
3. 선행 결과 없이도 각 lane이 첫 작업을 시작할 수 있는가
4. 마지막에 merge owner가 충돌을 해소할 수 있는가

하나라도 `no`면 순차 처리하거나 lane을 다시 자릅니다.

## Default Parallelism

- 기본: `2`
- 일반 상한: `3`
- 하드 상한: `4`

병렬 수를 늘리기보다 lane 경계를 선명하게 만드는 쪽이 먼저입니다.

## Role Matrix

| Goal | Recommended lanes |
|------|-------------------|
| 요구사항 정리 + 설계 옵션 비교 | `requirements-analyst`, `architecture-analyst`, `system-designer` |
| API 설계 + DB 영향 + 보안 검토 | `api-designer`, `database-specialist`, `security-specialist` |
| 백엔드 구현 + 프론트 mock + 테스트 설계 | `backend-specialist`, `frontend-specialist`, `test-specialist` |
| 문서화 + 변경 영향 분석 + 검증 | `docs-specialist`, `impact-analyzer`, `test-specialist` |

## Anti-Patterns

- 같은 컴포넌트를 둘 이상 lane이 동시에 수정
- API 계약이 없는데 구현 lane부터 병렬 시작
- reviewer lane이 실제 변경까지 맡음
- merge owner 없이 각 lane이 독립 결론만 반환

## Escalation Rule

아래 중 하나면 이 스킬보다 `auto-orchestrate` 계열이 더 적합합니다.

- `TASKS.md` 기준으로 phase 실행이 필요함
- worktree 분리가 필요함
- 4개 초과 task를 계속 이어서 실행해야 함
- 자동 resume, checkpoint, merge 루프가 필요함
