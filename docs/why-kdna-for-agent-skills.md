# Why KDNA for Agent Skills?

## The Problem

Popular agent-skill projects have proven that developers want reusable ways to guide AI agents. They identify real failure modes:

1. **The agent didn't do what I want** — misalignment between user intent and agent output
2. **The agent is way too verbose** — no shared vocabulary, wasting tokens on descriptions
3. **The code doesn't work** — no feedback loops, agent flies blind
4. **We built a ball of mud** — agents accelerate coding and accelerate entropy

These projects offer skills as the solution: structured instructions that tell the agent what to do.

## The Gap

Skills encode **workflows**: "do X, then Y, then Z." But the real challenge in agent guidance is not what to do — it's **when and why to judge**.

- A skill says "reproduce the bug first." But when should the agent refuse to fix without reproduction?
- A skill says "ask questions before implementing." But what signals indicate that requirements are truly aligned?
- A skill says "write tests first." But what distinguishes a behavioral test from a brittle one?

These are **judgment calls**, not workflow steps. And skills cannot encode judgment.

## The KDNA Answer

KDNA (Knowledge DNA) is an open format for encoding **domain cognition** — the judgment layer that skills cannot reach.

Where skills say "do this," KDNA says:
- **When** this applies (axioms)
- **What terms mean and don't mean** (terminology + banned terms)
- **What people get wrong** (misunderstandings)
- **How to check yourself** (self_check)
- **What scenarios trigger which judgment** (scenarios)
- **What good and bad look like** (cases)
- **Why this judgment holds** (reasoning chains)
- **How to grow** (evolution stages)

## The Experiment

This project takes the high-frequency workflows identified by popular agent-skill projects and re-encodes them as KDNA cognition domains.

The hypothesis: a KDNA cognition cluster will produce better agent judgment than flat skill instructions, because:

1. **Structure beats flat text.** Axioms, terminology boundaries, and self-checks are more testable than free-form instructions.
2. **Composition beats monoliths.** Domains with load conditions let agents load only what's needed.
3. **Judgment beats workflow.** Knowing when to stop and think is more valuable than knowing the next step.

## What This Project Is Not

- Not a fork of mattpocock/skills
- Not a copy of skill text
- Not a replacement for skills — skills and KDNA are complementary
- Not affiliated with or endorsed by any agent-skill project
