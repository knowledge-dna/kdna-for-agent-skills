# ⚠️ ARCHIVED — This repository is no longer maintained.

This repository has been superseded by [aikdna/kdna-skills](https://github.com/aikdna/kdna-skills).
Please use the official kdna-loader skill for AI agent integration.

The content below is preserved for reference only.

# KDNA for Agent Skills

**Skills tell agents what to do. KDNA tells agents how to judge.**

This project provides a complete coding agent stack: 7 KDNA judgment domains + 7 detailed operational skills + 1 master composer. It builds on the proven patterns of agent skills (inspired by [mattpocock/skills](https://github.com/mattpocock/skills)) and enhances them with KDNA's structured, validatable, composable judgment framework.

Unlike standard skills that only provide workflows, KDNA adds a judgment layer: axioms that constrain behavior, banned terms with explicit replacements, misunderstanding detection, and self-checks that verify quality before output is finalized.

---

## Quick Install

```bash
# One-time setup
npx @aikdna/kdna-cli setup

# Install the full coding agent cluster
kdna install cluster:github:aikdna/kdna-for-agent-skills
```

This installs:
- 7 KDNA domains with judgment principles
- 7 detailed SKILL.md files with operational workflows
- 1 master coding-agent skill that routes tasks to domain skills
- Cluster manifest with signal-driven composition

---

## What's Included

### Skills (Markdown — operational workflows)

| Skill | When to Use | Key Value |
|-------|------------|-----------|
| `coding-agent` | Starting any coding task | Master router: classifies task, loads relevant domains |
| `tdd` | Writing tests, implementing features | Red-green-refactor with KDNA judgment constraints |
| `bug-diagnosis` | Debugging, investigating failures | 6-phase loop: reproduce → minimise → hypothesise → instrument → fix → test |
| `code-review` | Reviewing PRs, checking work | Finding vs preference classification, anti-rubber-stamp |
| `architecture` | Large changes, design decisions | Complexity justification, module boundaries |
| `requirements` | Vague requests, planning | Uncover hidden constraints before implementing |
| `shared-language` | Any communication | Terminology precision, banned vague terms |
| `handoff` | Finishing work | Context preservation for next session |

### KDNA Domains (JSON — judgment structure)

Each skill has a companion KDNA domain with:
- **Axioms** — inviolable principles (e.g., "A fix without reproduction is a guess")
- **Banned terms** — with explicit replacements (e.g., "LGTM" → documented verification)
- **Misunderstandings** — common errors and correct interpretations
- **Self-checks** — yes/no questions the agent must answer before finalizing output

---

## How It Works

```
User request: "Fix the login timeout bug"
    │
    ▼
coding-agent SKILL.md loads
    │
    ├── Classifies task: bug → loads bug-diagnosis + tdd KDNA
    ├── Loads bug-diagnosis SKILL.md for workflow
    ├── Applies KDNA judgment:
    │     ✓ AX-001: Must reproduce before fixing
    │     ✓ AX-004: Must add regression test
    │     ✗ Banned: "I think the issue might be..." (speculation)
    └── Runs self-checks before finalizing
```

### Why Better Than Skills Alone

| | Skills Only (mattpocock) | Skills + KDNA |
|---|------------------------|---------------|
| **Workflow** | ✅ Detailed steps | ✅ Same detailed steps |
| **Judgment** | Implicit in prose | Explicit, structured, validated |
| **Banned terms** | Not enforced | Explicit list with replacements |
| **Self-checks** | Not structured | Yes/no questions from domain |
| **Verifiability** | Manual review only | kdna dev validate + eval |
| **Composability** | Skills are independent | Cluster composes multiple domains |

---

## Structure

```
kdna-for-agent-skills/
├── clusters/coding_agent/       # KDNA domains (JSON)
│   ├── cluster.json             # Signal-driven composition manifest
│   ├── test_driven_development/
│   ├── bug_diagnosis/
│   ├── code_review/
│   ├── architecture_reasoning/
│   ├── requirement_alignment/
│   ├── shared_language/
│   └── handoff_context/
├── skills/                      # Operational skills (Markdown)
│   ├── coding-agent/SKILL.md    # Master router
│   ├── tdd/SKILL.md
│   ├── bug-diagnosis/SKILL.md
│   ├── code-review/SKILL.md
│   ├── architecture/SKILL.md
│   ├── requirements/SKILL.md
│   ├── shared-language/SKILL.md
│   └── handoff/SKILL.md
└── README.md
```

---

## License

Apache 2.0
