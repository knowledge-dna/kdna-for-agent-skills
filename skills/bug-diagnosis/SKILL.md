---
name: bug-diagnosis
description: Disciplined diagnosis loop for hard bugs. Reproduce → Minimise → Hypothesise → Instrument → Fix → Regression-test. Use when debugging, investigating test failures, or diagnosing performance regressions.
trigger: user reports bug, test failure, "broken", "not working", crash, regression, performance issue, "debug this"
---

# Bug Diagnosis

## Philosophy

A discipline for hard bugs. **Skip phases only when explicitly justified.**

The core skill is building a feedback loop: a fast, deterministic, agent-runnable pass/fail signal. If you have that, you will find the cause. If you don't, staring at code won't save you.

## KDNA Judgment — Must Follow

Loaded from the `bug-diagnosis` KDNA domain:

**AX-001**: A fix without reproduction is a guess. If you cannot reproduce the bug under controlled conditions, any fix is an unverified hypothesis. The bug recurs or manifests elsewhere.

**AX-002**: Debug by subtraction, not by addition. Remove code until the bug disappears. The last thing you removed is in the causal chain. Adding instrumentation without removing possibilities creates noise.

**AX-003**: The first symptom is rarely the root cause. A crash at line 200 might be caused by corrupted state at line 50. Trace backward from the symptom to the source.

**AX-004**: Every bug fix must include a regression test. The test proves the bug existed and proves it's fixed. Without it, the bug can silently return.

## Banned Patterns

| Banned | Why | Replace With |
|--------|-----|-------------|
| "I think the issue might be..." without evidence | Speculation without a feedback loop. You're guessing. | "The feedback loop shows X fails when Y is present. Let me instrument Z to narrow down." |
| "Let me try changing X to see if it helps" | Change without understanding. You might mask the symptom. | Reproduce first. Then hypothesize. Then change ONE thing. |
| Adding print statements everywhere | Unstructured instrumentation creates noise. | Add targeted instrumentation between the symptom and the suspected cause. |
| "It works on my machine" | Environment-dependent bugs are real bugs. | Reproduce in the failing environment, or build a controlled reproduction. |

## Workflow

### Phase 1 — Build a Feedback Loop

**This is the most important phase.** Everything else depends on having a deterministic pass/fail signal.

Spend disproportionate effort here. Be aggressive. Refuse to give up.

Strategies, in priority order:

1. **Failing test** at the closest seam to the bug
2. **Curl/HTTP script** against a running dev server
3. **CLI invocation** with fixture input, diffing against expected output
4. **Headless browser script** (Playwright/Puppeteer) for UI bugs
5. **Replay a captured trace** — save a real payload, replay through the code path
6. **Throwaway harness** — minimal system subset that exercises the bug path
7. **Property/fuzz loop** — 1000 random inputs, look for the failure mode
8. **Bisection** — `git bisect` if the bug appeared between known good/bad states
9. **Differential loop** — run same input through old vs new version, diff outputs

**Self-check**: Can you run ONE command and get a clear pass/fail signal in under 10 seconds?

### Phase 2 — Minimise

Shrink the reproduction to its smallest possible form:
- Remove unrelated code, data, configuration
- Simplify input to the minimal failing case
- If the bug involves timing, isolate the race window

A minimal reproduction often reveals the cause without further debugging.

### Phase 3 — Hypothesise

Form a specific, falsifiable hypothesis about the root cause:
- "The bug is caused by X because Y"
- NOT "Maybe it's something with the database"

If you have multiple hypotheses, prioritise by likelihood. Test the most likely first.

### Phase 4 — Instrument

Add targeted instrumentation between the symptom and the suspected cause:
- Log state at key decision points
- NOT print statements everywhere — that creates noise
- Each instrumentation point should eliminate at least one hypothesis

### Phase 5 — Fix

- Change ONE thing
- Verify the feedback loop now passes
- Verify no existing tests break
- Commit with a message that references the reproduction

### Phase 6 — Regression Test

- Add a test that reproduces the original bug
- The test must fail without the fix, pass with the fix
- This proves the bug existed AND proves it's fixed
- Without this step, the bug can silently return

## Self-Checks (from KDNA Domain)

- [ ] Can I reproduce the bug reliably with a deterministic procedure?
- [ ] Have I minimised the reproduction to the smallest possible case?
- [ ] Did I trace from the symptom back to the root cause (not just fix the symptom)?
- [ ] Does my fix address the root cause, not mask the symptom?
- [ ] Did I add a regression test that fails without the fix?
- [ ] Did I check that no existing tests are broken by the fix?
- [ ] Can another developer run the reproduction and get the same result?

## What Makes This Better Than Standard Debugging Skills

Standard debugging skills give you a process. KDNA adds judgment:

- You know WHY reproduction is non-negotiable (AX-001: fixes without reproduction are guesses)
- You know HOW to narrow down (AX-002: subtract, don't add)
- You know WHERE to look (AX-003: first symptom ≠ root cause)
- You know WHAT proves the fix is real (AX-004: regression test)
- You can be VERIFIED: did you actually reproduce before fixing?
