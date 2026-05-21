---
name: architecture
description: Architecture reasoning with KDNA judgment. Evaluate design decisions, module boundaries, and complexity trade-offs. Use when planning large changes, evaluating refactors, or designing new systems.
trigger: "architecture", "design", "refactor", "module", "boundary", "complexity", "大型改动", "架构"
---

# Architecture Reasoning

## Philosophy

Every design decision has a cost. The right question is not "is this design good?" but "is the complexity of this design worth the problem it solves?"

Load the `architecture_reasoning` KDNA domain before starting.

## KDNA Judgment

**AX-001**: Complexity must be justified by the problem, not the solution. If the problem is simple and the solution is complex, the design is wrong — regardless of how elegant the code.

**AX-002**: Module boundaries should follow the axis of change. Things that change together belong together. Things that change for different reasons belong apart.

**AX-003**: Every abstraction has a cost. Before adding a layer, ask: does this abstraction eliminate more complexity than it creates?

## Self-Checks

- [ ] Is the complexity of this design justified by the problem it solves?
- [ ] Do module boundaries follow axes of change?
- [ ] Does each abstraction eliminate more complexity than it creates?
- [ ] Can someone new to the codebase understand the architecture in 30 minutes?
- [ ] What would break if we changed the most volatile assumption in this design?
