---
name: parallel-orchestra
description: 독립 가능한 하위 문제를 여러 전문가 에이전트 lane으로 분해해 병렬 실행하고 결과를 통합하는 스킬. "병렬 에이전트", "오케스트라", "planner/researcher/coder/reviewer 동시 진행", "동시에 조사하고 구현하고 리뷰" 같은 요청이나 하나의 작업을 2-4개 독립 스트림으로 나눌 때 사용.
---

# Parallel Orchestra

> Claude Orchestra 스타일의 병렬 에이전트 운영 프로토콜입니다. 기존 `.claude/agents/` 전문가를 lane 단위로 배치하고, 계약을 먼저 고정한 뒤 병렬 실행하고 마지막에 통합합니다.

## Use When

- 구현 전에 전략, 설계, 리스크를 병렬로 조사해야 할 때
- 백엔드, 프론트엔드, 테스트, 문서처럼 파일 소유권을 분리할 수 있을 때
- 한 명이 순차로 하기엔 컨텍스트가 큰데 `2-4`개 독립 스트림으로 쪼갤 수 있을 때
- 사용자가 "병렬 에이전트", "오케스트라", "여러 역할 동시에", "planner + coder + reviewer"를 요청할 때

## Do Not Use

- 같은 파일을 여러 lane이 동시에 수정해야 할 때
- 의존 관계가 강해서 순차 처리 이득이 더 클 때
- 이미 `TASKS.md` 기반 자동 개발 단계라서 `auto-orchestrate` 또는 `ultra-thin-orchestrate`가 더 적합할 때

## Workflow

### 1. Frame The Mission

아래 네 줄을 먼저 고정합니다.

```markdown
Goal: 한 줄 목표
Done when: 완료 정의
Max parallel lanes: 2-4
Merge owner: orchestrator
```

### 2. Split Into Lanes

- `references/lane-selection.md`를 읽고 lane을 고릅니다.
- 각 lane은 서로 다른 파일 집합이나 산출물을 소유해야 합니다.
- 겹치는 파일 비율이 높으면 먼저 경계를 다시 자릅니다.

### 3. Freeze Contracts

각 lane 프롬프트에 반드시 넣습니다.

- 목표
- 입력 컨텍스트
- 소유 파일
- 건드리면 안 되는 파일
- 선행 의존성
- 반환 형식

템플릿은 `references/prompt-templates.md`를 사용합니다.

### 4. Launch In Parallel

- 의존성이 없는 lane만 동시에 시작합니다.
- 기본 병렬도는 `2-3`, 최대 `4`를 넘기지 않습니다.
- lane 사이 전달이 필요하면 `.claude/skills/a2a/SKILL.md`의 handoff 형식을 따릅니다.

### 5. Merge In Order

통합 순서는 고정합니다.

1. 계약과 인터페이스
2. 코드 변경
3. 테스트와 검증
4. 문서와 최종 보고

### 6. Final Verification

- 최소 한 개 lane은 검증 역할이어야 합니다.
- 통합 전 `references/merge-checklist.md`를 다시 확인합니다.
- 작업이 커져 phase, worktree, TASKS 추적이 필요해지면 `auto-orchestrate`로 넘깁니다.

## Recommended Lane Packs

- Discovery Pack: `requirements-analyst`, `architecture-analyst`, `impact-analyzer`
- Delivery Pack: `backend-specialist`, `frontend-specialist`, `test-specialist`
- Hardening Pack: `security-specialist`, `database-specialist`, `docs-specialist`
- Review Pack: `impact-analyzer`, `test-specialist`, `docs-specialist`

## Hard Rules

- 한 lane은 하나의 명확한 artifact set만 소유합니다.
- 같은 mutable file set에 두 lane을 동시에 넣지 않습니다.
- 겹침이 `30%`를 넘으면 병렬화보다 재분해가 우선입니다.
- specialist는 자기 lane만 해결하고 충돌 조정은 orchestrator가 맡습니다.
- 병렬화 목적이 구현 자동화가 아니라 사고 분산인지 먼저 확인합니다.
- 결과를 합칠 사람이 없으면 병렬화하지 않습니다.

## Quick Start

```markdown
Use $parallel-orchestra to split this work into three lanes.

Goal: 로그인 개편의 설계, 구현, 검증을 병렬 진행
Done when: API 계약, UI 반영, 회귀 테스트 계획이 합의됨
Max parallel lanes: 3
Merge owner: orchestrator

Lane A: requirements-analyst
Lane B: backend-specialist
Lane C: test-specialist
```

## Reference Routing

| Topic | Reference | Load when |
|-------|-----------|-----------|
| lane 분해 기준 | `references/lane-selection.md` | 어떤 specialist를 병렬 배치할지 정할 때 |
| lane 프롬프트 | `references/prompt-templates.md` | 각 specialist 호출 프롬프트를 만들 때 |
| 병합 검증 | `references/merge-checklist.md` | 결과를 합치기 직전과 최종 응답 직전 |

## Example Requests

- "이 기능을 planner, coder, reviewer 세 lane으로 병렬 처리해."
- "API 설계, DB 영향 분석, 프론트 mock UI를 동시에 돌리고 마지막에 합쳐."
- "이 변경을 구현, 테스트, 문서 lane으로 나눠서 진행해."
