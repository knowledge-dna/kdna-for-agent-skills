# KDNA for Cursor

## Overview

KDNA cognition domains provide structured judgment patterns for coding tasks. Configure Cursor to load relevant domains based on the task context.

## Setup

Add the following to your Cursor rules or .cursorrules file:

```
When working on coding tasks, reference the KDNA cognition domains in clusters/coding_agent/.
Load Core + Patterns for any activated domain.
Apply axioms, terminology, and self-checks to your reasoning.
```

## Available Domains

- **requirement_alignment**: user request is vague; task has hidden constraints; agent is about to implement without enough context; user provides a wish without scope or criteria
- **bug_diagnosis**: bug report; test failure; performance regression; runtime error
- **test_driven_development**: new feature implementation; bug fix with expected behavior; regression prevention; agent is about to write implementation without a failing test

## Domain Files

Each domain is located at `clusters/coding_agent/<domain_name>/` and contains:

- `kdna.json` — Domain manifest
- `KDNA_Core.json` — Axioms, ontology, frameworks, stances
- `KDNA_Patterns.json` — Terminology, misunderstandings, self-checks
- `KDNA_Scenarios.json` — Scenario triggers (optional)
- `KDNA_Cases.json` — Example cases (optional)
- `KDNA_Reasoning.json` — Reasoning chains (optional)
- `KDNA_Evolution.json` — Capability stages (optional)
