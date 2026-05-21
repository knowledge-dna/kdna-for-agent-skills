---
name: requirements
description: Requirements analysis with KDNA judgment. Uncover hidden constraints, clarify vague requests, and prevent premature implementation. Use when user requests are unclear, scope is undefined, or you're about to build without full context.
trigger: "feature", "build", "implement", "new", "request", "requirement", "需求", "功能"
---

# Requirements Alignment

## Philosophy

The most expensive bugs are not code bugs. They are requirement bugs — building the wrong thing, missing a critical constraint, or solving a problem the user doesn't actually have.

Load the `requirement_alignment` KDNA domain before implementing any new feature.

## KDNA Judgment

**AX-001**: A request is not a requirement. Users describe solutions; requirements describe problems. Always trace back from "what they asked for" to "what they need."

**AX-002**: Every requirement has a hidden constraint. Before implementing, ask: what are the constraints on time, budget, compatibility, security, scale, and existing user behavior?

**AX-003**: Vagueness is a signal, not an obstacle. "Make it better" means the user can't articulate the problem. Ask diagnostic questions until the requirement becomes specific and testable.

## Self-Checks

- [ ] Have I traced the user's request back to the underlying problem?
- [ ] Have I identified hidden constraints (time, compatibility, security, scale)?
- [ ] Is the requirement specific enough that two people would agree on whether it's met?
- [ ] Did I confirm the requirement with the user before implementing?
- [ ] What is the simplest thing that could satisfy this requirement?
