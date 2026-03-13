# Prompt Templates

## Orchestrator Frame

```markdown
Goal: {one-line goal}
Done when: {definition of done}
Max parallel lanes: {2-4}
Merge owner: orchestrator

Shared context:
- {repo facts}
- {constraints}
- {must-preserve behavior}
```

## Specialist Lane Template

```markdown
Lane: {lane name}
Specialist: {agent id}

Mission:
- {what this lane must achieve}

Inputs:
- {files, specs, prior decisions}

Owned files:
- {explicit file list or directory scope}

Do not touch:
- {files owned by other lanes}

Dependencies:
- {none | lane names or artifacts}

Return format:
- Summary: 3 bullets max
- Changed files: exact paths
- Risks: explicit
- Handoff needed: yes/no
```

## Handoff Template

`a2a` 스킬 형식과 맞추려면 아래처럼 짧게 넘깁니다.

```markdown
Handoff from: {lane A}
To: {lane B}
Artifact: {API contract / schema / test plan}
Needed action: {what lane B should update}
Blocking?: {yes/no}
```

## Merge Prompt

```markdown
Merge these lane outputs in this order:
1. Contract decisions
2. Code changes
3. Tests
4. Docs

Reject any output that:
- edits files outside ownership
- contradicts another lane contract
- omits risks or changed files
```
