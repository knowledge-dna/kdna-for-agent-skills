# KDNA for Agent Skills

A KDNA-native rethinking of agent skills.

Popular agent-skill projects prove the demand: developers want reusable ways to guide AI agents. KDNA provides the next layer: structured, testable, composable domain cognition.

**Skills tell agents what to do. KDNA tells agents how to judge.**

---

## What is this?

This project extracts high-frequency agent-skill workflows into standard KDNA cognition domains, then composes them into a loadable, verifiable, evolvable **Agent cognition cluster**.

v0.1 includes **7 KDNA domains** covering the full coding agent workflow — from requirement alignment through bug diagnosis, TDD, architecture reasoning, to agent handoff.

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

7 domains with full 6-file KDNA structure, validated against SPEC.

| Domain | Origin Skill | What It Judges |
|--------|-------------|----------------|
| `requirement_alignment` | /grill-me, /grill-with-docs, /to-prd | When to ask vs. when to implement |
| `bug_diagnosis` | /diagnose | When a fix is a guess vs. a diagnosis |
| `test_driven_development` | /tdd | What makes a test behavioral vs. brittle |
| `shared_language` | /grill-with-docs, CONTEXT.md, ADR | What terms to keep, avoid, or formalize |
| `architecture_reasoning` | /zoom-out, /improve-codebase-architecture | When to zoom out vs. push forward |
| `issue_decomposition` | /to-issues, /triage | What makes an issue independently deliverable |
| `handoff_context` | /handoff | What information must survive between agents |

## Quick Start

### Install the KDNA CLI

```bash
npm i -g @aikdna/kdna
```

This gives you `kdna`, `kdna-validate`, and `kdna-lint` commands. See [@aikdna/kdna on npm](https://www.npmjs.com/package/@aikdna/kdna).

### One-command install for your agent

```bash
# Interactive — auto-detects Claude Code, Codex, OpenCode
curl -fsSL https://raw.githubusercontent.com/knowledge-dna/kdna-skills/main/install.sh | bash

# Or target a specific agent
curl -fsSL https://raw.githubusercontent.com/knowledge-dna/kdna-skills/main/install.sh | bash -s -- --claude
```

Installs `kdna-loader` and `kdna-create` skills into your agent's skill directory.

### Use programmatically

```bash
# Pure logic kernel (zero dependencies)
npm i @aikdna/kdna-core

# TypeScript Agent SDK
npm i @aikdna/agent
```

### VS Code

Search "KDNA" in the VS Code Extensions Marketplace.

### Work with this cluster directly

```bash
git clone https://github.com/knowledge-dna/kdna-for-agent-skills.git
cd kdna-for-agent-skills

# Validate the cluster against KDNA SPEC
node scripts/validate-cluster.mjs

# Select relevant domains for a task
node scripts/select-domains.mjs "fix this failing test"
```

## KDNA Ecosystem

This cluster is one part of the KDNA ecosystem:

| Component | Repository | Description |
|-----------|-----------|-------------|
| KDNA Core | [knowledge-dna/KDNA](https://github.com/knowledge-dna/KDNA) | Spec, schema, CLI, validators, examples |
| KDNA Skills | [knowledge-dna/kdna-skills](https://github.com/knowledge-dna/kdna-skills) | Agent install scripts and loader skills |
| KDNA Registry | [knowledge-dna/kdna-registry](https://github.com/knowledge-dna/kdna-registry) | Domain registry |
| Agent Safety | [knowledge-dna/kdna-agent_safety](https://github.com/knowledge-dna/kdna-agent_safety) | Halt before irreversible actions |
| Authoring | [knowledge-dna/kdna-authoring](https://github.com/knowledge-dna/kdna-authoring) | Turn expertise into KDNA domains |
| Content Strategy | [knowledge-dna/kdna-content_strategy](https://github.com/knowledge-dna/kdna-content_strategy) | Evaluate whether a topic is worth writing |
| Knowledge Management | [knowledge-dna/kdna-knowledge_management](https://github.com/knowledge-dna/kdna-knowledge_management) | Distinguish knowledge assets from raw material |
| Open Source Project | [knowledge-dna/kdna-open_source_project](https://github.com/knowledge-dna/kdna-open_source_project) | Diagnose adoption problems |
| Prompt Diagnosis | [knowledge-dna/kdna-prompt_diagnosis](https://github.com/knowledge-dna/kdna-prompt_diagnosis) | Identify why a prompt failed |
| Writing | [knowledge-dna/kdna-writing](https://github.com/knowledge-dna/kdna-writing) | Diagnose whether content has a real argument |

The main KDNA repository also includes integration examples for LangChain, LangGraph, CrewAI, and MCP, plus a Python SDK.

## Project Structure

```
kdna-for-agent-skills/
  clusters/
    coding_agent/
      cluster.json              # Cluster index
      requirement_alignment/    # KDNA domain (6-file structure)
      bug_diagnosis/
      test_driven_development/
      shared_language/
      architecture_reasoning/
      issue_decomposition/
      handoff_context/
  adapters/                     # Agent-specific loaders
  examples/                     # Before/after comparison scenarios
  evals/                        # Evaluation rubrics
  scripts/                      # Validation and utility scripts
  docs/                         # Documentation
```

## Before / After Demo

**Input:** "This test is failing. Can you fix it?"

**Without KDNA** — the agent jumps to the most obvious fix and writes `if (!email.includes('@')) throw new Error(...)`. No reproduction. No hypothesis. No regression test. This fix would have broken another service.

**With KDNA** — `bug_diagnosis` + `test_driven_development` domains load. The agent reproduces the failure, generates 4 hypotheses, eliminates them one by one, discovers a hidden constraint (adminService depends on current behavior), and surfaces the decision to the user before applying any fix.

Full walkthrough with judgment-difference analysis: [docs/demo-failing-test.md](docs/demo-failing-test.md)

## Attribution

This project is inspired by the broader agent-skills ecosystem. See [docs/attribution.md](docs/attribution.md) for details.

## License

MIT
