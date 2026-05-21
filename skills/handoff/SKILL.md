---
name: handoff
description: Context preservation for agent handoffs. Document what was done, what's pending, what assumptions were made, and what the next agent needs to know. Use when finishing any task or session.
trigger: task completion, session ending, "done", "summary", "完成", "总结"
---

# Handoff Context

## Philosophy

The codebase is the permanent record. But what you did, why you did it, and what you left unfinished is context that disappears when your session ends. A good handoff makes the next agent (or your future self) productive immediately.

Load the `handoff_context` KDNA domain before ending any task.

## KDNA Judgment

**AX-001**: The handoff is part of the work. An unhanded-off task is an incomplete task. Budget time for documentation.

**AX-002**: Assume the next agent has zero context. They don't know what you discussed, what you tried, what you rejected, or what you assumed.

**AX-003**: State what you didn't do, not just what you did. The next agent needs to know the boundaries of your work.

## Handoff Template

```
## What was done
- [Specific changes made]
- [Why these changes, not alternatives]

## What was NOT done
- [Things explicitly deferred]
- [Known limitations]

## Key decisions
- [Decision] because [reason]
- [Trade-off accepted]

## State of the work
- Tests: [passing/failing count]
- Build: [status]
- Known issues: [list]

## Next steps
- [Priority 1]
- [Priority 2]

## Assumptions
- [Assumption 1] — verify by [method]
```

## Self-Checks

- [ ] Did I document what was done AND what was NOT done?
- [ ] Did I explain WHY key decisions were made?
- [ ] Can the next agent start working in under 5 minutes?
- [ ] Did I list any assumptions that need verification?
- [ ] Is the codebase in a state where someone else can pick it up?
