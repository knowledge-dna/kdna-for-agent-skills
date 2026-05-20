# Coding Agent Cognition Cluster

This cluster maps common agent-skill workflows into KDNA cognition domains.

## Active Domains (v0.1.0)

3 domains with full 6-file KDNA structure, validated against SPEC.

| Domain | Status | Origin |
|--------|--------|--------|
| `requirement_alignment` | experimental | /grill-me, /grill-with-docs, /to-prd |
| `bug_diagnosis` | experimental | /diagnose |
| `test_driven_development` | experimental | /tdd |

## Planned Domains

4 domains with draft content, not yet validated for v0.1.

| Domain | Origin |
|--------|--------|
| `shared_language` | /grill-with-docs, CONTEXT.md, ADR |
| `architecture_reasoning` | /zoom-out, /improve-codebase-architecture |
| `issue_decomposition` | /to-issues, /triage |
| `handoff_context` | /handoff |

## Loading Strategy

Core + Patterns are always loaded when a domain is activated. Optional files (Scenarios, Cases, Reasoning, Evolution) are loaded based on the task context:

- **Scenarios**: Load when a concrete situation is detected
- **Cases**: Load when examples are needed
- **Reasoning**: Load when tradeoffs or rationale are requested
- **Evolution**: Load when coaching or improvement is requested
