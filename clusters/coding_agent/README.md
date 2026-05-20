# Coding Agent Cognition Cluster

This cluster maps common agent-skill workflows into KDNA cognition domains.

## Active Domains (v0.1.0)

| Domain | Status | Files | Origin |
|--------|--------|-------|--------|
| `requirement_alignment` | experimental | Core + Patterns | /grill-me, /grill-with-docs, /to-prd |
| `bug_diagnosis` | experimental | Core + Patterns | /diagnose |
| `test_driven_development` | experimental | Core + Patterns | /tdd |

## Planned Domains

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
