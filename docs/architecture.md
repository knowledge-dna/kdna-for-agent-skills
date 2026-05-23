# Architecture

How KDNA for Agent Skills transforms agent skill workflows into structured cognition.

```
  Agent Skill Workflows
  (mattpocock/skills etc.)
          │
          │  extract judgment patterns
          ▼
  ┌─────────────────────┐
  │   KDNA Domains       │
  │                      │
  │  Core     — axioms,  │
  │             ontology, │
  │             stances   │
  │                      │
  │  Patterns — terms,   │
  │             misreads, │
  │             checks    │
  │                      │
  │  + Scenarios, Cases, │
  │    Reasoning,        │
  │    Evolution         │
  └──────────┬──────────┘
             │
             │  compose by task context
             ▼
  ┌─────────────────────────────┐
  │  Cognition Cluster           │
  │  coding_agent                │
  │                              │
  │  7 domains:                  │
  │   requirement_alignment      │
  │   bug_diagnosis              │
  │   test_driven_development    │
  │   shared_language            │
  │   architecture_reasoning     │
  │   issue_decomposition        │
  │   handoff_context            │
  └──────────────┬──────────────┘
                 │
                 │  load via KDNA ecosystem
                 ▼
  ┌─────────────────────────────────────┐
  │  KDNA Ecosystem                      │
  │                                      │
  │  @aikdna/kdna-core  — pure logic     │
  │  @aikdna/kdna-cli       — CLI toolkit    │
  │  @aikdna/agent      — TypeScript SDK │
  │  VS Code extension                   │
  │  kdna-skills      — install scripts  │
  │  kdna-registry    — domain registry  │
  └──────────────┬──────────────────────┘
                 │
                 │  deliver to
                 ▼
  ┌─────────────────────────┐
  │  Agent                   │
  │                          │
  │  Claude Code  ·  Codex   │
  │  OpenCode     ·  Cursor  │
  │  Copilot      ·  More    │
  └─────────────────────────┘
```

## Flow

1. **Skill workflows** identify what agents repeatedly do and where they fail
2. **KDNA extraction** re-encodes those workflows as judgment patterns, not step lists
3. **Cluster composition** groups domains by task context with load conditions
4. **Ecosystem delivery** — npm packages, CLI, install scripts, VS Code — loads the right domains to the right agent at the right time

## Loading Strategy

```
User input: "fix this failing test"
          │
          ▼
  select-domains.mjs
          │
          ├─ bug_diagnosis       ← "test failure" signal
          └─ test_driven_development ← "bug fix with expected behavior" signal
          │
          ▼
  Load: Core + Patterns (always)
        Scenarios (if concrete context)
        Cases     (if examples needed)
        Reasoning (if why matters)
        Evolution (if coaching)
```

## What This Is Not

- Not a fork or copy of any skills project
- Not a prompt library or template collection
- Not a replacement for skills — skills and KDNA are complementary

Skills execute. KDNA judges.
