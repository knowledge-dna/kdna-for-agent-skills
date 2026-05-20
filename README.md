# KDNA for Agent Skills

A KDNA-native rethinking of agent skills.

Popular agent-skill projects prove the demand: developers want reusable ways to guide AI agents. KDNA provides the next layer: structured, testable, composable domain cognition.

**Skills tell agents what to do. KDNA tells agents how to judge.**

---

## What is this?

This project extracts high-frequency agent-skill workflows into standard KDNA cognition domains, then composes them into a loadable, verifiable, evolvable **Agent cognition cluster**.

v0.1 includes **3 active experimental KDNA domains**, with 4 planned domains kept as draft directions.

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

### Active Domains (v0.1.0)

3 domains with full 6-file KDNA structure, validated against SPEC.

| Domain | Origin Skill | What It Judges |
|--------|-------------|----------------|
| `requirement_alignment` | /grill-me, /grill-with-docs, /to-prd | When to ask vs. when to implement |
| `bug_diagnosis` | /diagnose | When a fix is a guess vs. a diagnosis |
| `test_driven_development` | /tdd | What makes a test behavioral vs. brittle |

### Planned Domains

| Domain | Origin Skill | What It Judges |
|--------|-------------|----------------|
| `shared_language` | /grill-with-docs, CONTEXT.md, ADR | What terms to keep, avoid, or formalize |
| `architecture_reasoning` | /zoom-out, /improve-codebase-architecture | When to zoom out vs. push forward |
| `issue_decomposition` | /to-issues, /triage | What makes an issue independently deliverable |
| `handoff_context` | /handoff | What information must survive between agents |

## Quick Start

```bash
git clone https://github.com/knowledge-dna/kdna-for-agent-skills.git
cd kdna-for-agent-skills

# Validate the cluster against KDNA SPEC
node scripts/validate-cluster.mjs

# Select relevant domains for a task
node scripts/select-domains.mjs "fix this failing test"

# Generate adapter for your agent
node scripts/generate-loader-skill.mjs claude_code
```

### Install for Claude Code

```bash
# Generate the loader skill
node scripts/generate-loader-skill.mjs claude_code

# Copy to your project's .claude/ directory
cp adapters/claude_code/SKILL.md .claude/skills/kdna-loader/SKILL.md
```

### Install for Codex

```bash
node scripts/generate-loader-skill.mjs codex
cp adapters/codex/AGENTS.md AGENTS.md
```

## Project Structure

```
kdna-for-agent-skills/
  clusters/
    coding_agent/
      cluster.json              # Cluster index
      requirement_alignment/    # Active KDNA domain
        kdna.json
        KDNA_Core.json
        KDNA_Patterns.json
        KDNA_Scenarios.json
        KDNA_Cases.json
        KDNA_Reasoning.json
        KDNA_Evolution.json
      bug_diagnosis/            # Active KDNA domain
      test_driven_development/  # Active KDNA domain
      shared_language/          # Planned (draft)
      architecture_reasoning/   # Planned (draft)
      issue_decomposition/      # Planned (draft)
      handoff_context/          # Planned (draft)
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

## Before / After Demo

**Input:** "This test is failing. Can you fix it?"

**Without KDNA** — the agent jumps to the most obvious fix:
```
Looking at the failing test, the issue is missing email validation.
I'll add it now.

+ if (!email.includes('@')) throw new Error('Invalid email format');
```
No reproduction. No hypothesis. No regression test. This fix would have broken another service.

**With KDNA** — `bug_diagnosis` + `test_driven_development` domains load:
```
1. Reproduce: run the test locally → confirmed
2. Hypotheses (4):
   H1: validation not called → CHECK: it IS called → eliminated
   H2: validation returns instead of throwing → CONFIRMED
   H3: validation throws but caught upstream → eliminated
   H4: test targets wrong method → eliminated
3. Hidden constraint found: adminService depends on return-based behavior
4. Decision surfaced to user before fixing
5. Regression test written before fix applied
```
The KDNA-loaded agent discovered the root cause (inconsistent error handling pattern) instead of writing a fix that would break existing code.

See [examples/failing_test_debugging/](examples/failing_test_debugging/) for the full comparison.

## Attribution

This project is inspired by the broader agent-skills ecosystem. See [docs/attribution.md](docs/attribution.md) for details.

## License

MIT
