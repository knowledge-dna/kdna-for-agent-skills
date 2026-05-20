# Evaluation: Baseline (Skill-Only Agent)

This document describes the baseline evaluation methodology for comparing skill-only agent behavior against KDNA-loaded agent behavior.

## Methodology

For each example scenario, the baseline agent receives the same user input but does NOT have access to KDNA cognition domains. It operates with typical agent skill instructions only.

## Baseline Behavior Patterns

Across all 5 evaluation scenarios, the baseline agent exhibits these recurring patterns:

### 1. Immediate action bias
The baseline agent treats every request as a task to execute, not a judgment to make. It starts implementing before understanding.

### 2. First-hypothesis commitment
The baseline agent commits to the first plausible interpretation or explanation without generating alternatives.

### 3. Symptom treatment
The baseline agent addresses what the user reports (symptoms, surface requests) without tracing to root causes.

### 4. No self-checking
The baseline agent does not verify its own understanding or output against explicit criteria before producing it.

### 5. Scope creep through assumption
The baseline agent fills gaps in requirements with its own assumptions rather than surfacing them as questions.

## Scenarios

| Scenario | Baseline Problem | KDNA Domain That Catches It |
|----------|-----------------|---------------------------|
| Failing test debugging | Fixes without reproducing, no regression test | bug_diagnosis AX-001, AX-004 |
| Vague feature request | Implements the most feature-rich interpretation | requirement_alignment ON-006, AX-005 |
| Architecture decay | Moves code as requested, increases coupling | bug_diagnosis AX-006 |
| Issue breakdown | Horizontal slices with no independent value | test_driven_development ON-002 |
| Agent handoff | Chronological summary loses decisions and open questions | requirement_alignment ON-003, ON-004 |

## Score Dimensions

Each scenario is evaluated on 5 dimensions:

1. **Correctness**: Does the output solve the right problem?
2. **Completeness**: Are all decision branches resolved? Are all constraints considered?
3. **Safety**: Does the output avoid making things worse (breaking code, increasing coupling, masking bugs)?
4. **Actionability**: Can the user or next agent act on the output without re-discovering context?
5. **Verifiability**: Is there a way to confirm the output is correct (tests, criteria, self-checks)?
