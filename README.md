# KDNA for Agent Skills

A KDNA-native rethinking of agent skills.

Popular agent-skill projects prove the demand: developers want reusable ways to guide AI agents. KDNA provides the next layer: structured, testable, composable domain cognition.

**Skills tell agents what to do. KDNA tells agents how to judge.**

---

## What is this?

This project extracts high-frequency agent-skill workflows into standard KDNA cognition domains, then composes them into a loadable, verifiable, evolvable **Agent cognition cluster**.

It is inspired by the broader agent-skills ecosystem, including [mattpocock/skills](https://github.com/mattpocock/skills). It does not copy skill text. It does not claim affiliation. It focuses on KDNA-native cognition domains.

## Why KDNA?

| Skills | KDNA |
|--------|------|
| Encode repeatable workflows | Encode repeatable judgment patterns |
| "Do X, then Y, then Z" | "Judge whether X applies, and why" |
| Flat instructions | Structured axioms + terminology + scenarios + reasoning |
| Hard to test | Testable via before/after comparison |
| Single-skill granularity | Composable domains with load conditions |

## The Coding Agent Cluster

This project defines a `coding_agent` cluster with 7 KDNA domains:

| Domain | Origin Skill | What It Judges |
|--------|-------------|----------------|
| `requirement_alignment` | /grill-me, /grill-with-docs, /to-prd | When to ask vs. when to implement |
| `shared_language` | /grill-with-docs, CONTEXT.md, ADR | What terms to keep, avoid, or formalize |
| `bug_diagnosis` | /diagnose | When a fix is a guess vs. a diagnosis |
| `test_driven_development` | /tdd | What makes a test behavioral vs. brittle |
| `architecture_reasoning` | /zoom-out, /improve-codebase-architecture | When to zoom out vs. push forward |
| `issue_decomposition` | /to-issues, /triage | What makes an issue independently deliverable |
| `handoff_context` | /handoff | What information must survive between agents |

## Quick Start

```bash
# Validate the cluster
node scripts/validate-cluster.mjs

# Select relevant domains for a task
node scripts/select-domains.mjs "fix this failing test"
```

## Project Structure

```
kdna-for-agent-skills/
  clusters/
    coding_agent/
      cluster.json              # Cluster index
      requirement_alignment/    # KDNA domain
        kdna.json
        KDNA_Core.json
        KDNA_Patterns.json
        ...
      bug_diagnosis/
      test_driven_development/
      shared_language/
      architecture_reasoning/
      issue_decomposition/
      handoff_context/
  adapters/                     # Agent-specific loaders
    claude_code/
    codex/
    opencode/
    cursor/
  examples/                     # Before/after comparison scenarios
  evals/                        # Evaluation rubrics
  scripts/                      # Validation and utility scripts
  docs/                         # Documentation
```

## Attribution

This project is inspired by the broader agent-skills ecosystem. See [docs/attribution.md](docs/attribution.md) for details.

## License

MIT
