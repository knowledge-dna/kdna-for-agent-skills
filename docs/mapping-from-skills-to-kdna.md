# Mapping from Skills to KDNA

This document explains how each KDNA domain in the coding_agent cluster maps to agent-skill workflows, and what judgment layer each domain adds.

## Mapping Table

| KDNA Domain | Skill Origin | Skill Says (Workflow) | KDNA Says (Judgment) |
|-------------|-------------|----------------------|----------------------|
| `requirement_alignment` | /grill-me, /grill-with-docs, /to-prd | "Ask questions before implementing" | When is a requirement aligned? What signals indicate hidden constraints? When can you proceed vs. must you ask? |
| `shared_language` | /grill-with-docs, CONTEXT.md, ADR | "Build a shared vocabulary" | What makes a term domain-specific vs. generic? When to formalize in CONTEXT vs. when to leave informal? |
| `bug_diagnosis` | /diagnose | "Reproduce → minimize → hypothesize → instrument → fix" | When is a fix a guess? What counts as valid reproduction? When should you refuse to fix? |
| `test_driven_development` | /tdd | "Write failing test → implement → refactor" | What makes a test behavioral vs. brittle? When is TDD appropriate? What is a vertical slice? |
| `architecture_reasoning` | /zoom-out, /improve-codebase-architecture | "Zoom out and consider the bigger picture" | When to zoom out? What is local optimum vs. systemic decay? When to refactor boundaries? |
| `issue_decomposition` | /to-issues, /triage | "Break plan into vertical-slice issues" | What makes an issue independently deliverable? When is an issue too large? What's a vertical slice vs. a horizontal layer? |
| `handoff_context` | /handoff | "Compact conversation into handoff document" | What must survive? What is noise? What counts as a decision vs. an observation? |

## The Transformation Pattern

Every skill-to-KDNA transformation follows the same pattern:

1. **Identify the failure mode** the skill addresses
2. **Extract the judgment forks** — the points where the agent must decide, not just execute
3. **Encode as axioms** — the principles that govern those decisions
4. **Define terminology boundaries** — what terms mean and don't mean in this domain
5. **List misunderstandings** — what people (and agents) commonly get wrong
6. **Write self-checks** — questions the agent can ask itself to verify judgment

The result is not a "better skill." It's a cognition layer that operates alongside skills.
