---
name: code-review
description: Structured code review with KDNA judgment. Behavior-first analysis, finding vs preference classification, anti-rubber-stamp discipline. Use when reviewing PRs, checking your own work before committing, or evaluating code quality.
trigger: user asks for code review, PR review, "review this", "check my code", or you're about to finalize a change
---

# Code Review

## Philosophy

**Core principle**: A code review must change something — either the code, the reviewer's understanding, or the author's understanding. Silent approval is not review.

The reviewer's job is not to find things to complain about. It is to verify that the change is correct, safe, and maintainable. This means understanding what the change intends to do, tracing its effects, and identifying real risks — not just style preferences.

## KDNA Judgment — Must Follow

Loaded from the `code-review` KDNA domain:

**AX-001**: A code review must change something — either the code, the reviewer's understanding, or the author's understanding. If a review finds nothing worth discussing, it has not been reviewed. LGTM without reasoning is a rubber stamp.

**AX-002**: Inspect behavior before implementation. A change that behaves correctly with ugly code is safer than a change that looks clean but behaves wrong. Correctness first, then maintainability, then style.

**AX-003**: Every review comment that requests a change must cite a specific failure mode. "This could be cleaner" is a preference. "This will NPE if the input is null after the refactor" is a finding. If you cannot name the failure mode, your comment is optional.

## Banned Patterns

| Banned | Why | Replace With |
|--------|-----|-------------|
| "LGTM" | Encodes zero information about what was reviewed. Normalizes approval without accountability. | "Verified: [specific behaviors checked], [specific edge cases considered]. Approved." |
| "Consider..." | You're unsure if it matters. The author has less context than you. Commit to a finding or label it optional. | "This will fail when [condition]" or "Optional: [suggestion]" |
| "Looks good to me" | Centres your subjective impression. Doesn't document what was checked. | "Reviewed: behavior confirmed via [method]. Edge cases: [covered/missing]." |
| "Maybe we should..." | Hedged language. Avoids responsibility. | "Recommend: [change] to prevent [specific failure]." |

## Workflow

### 1. Understand Intent

- Read the PR description. What problem does this change solve?
- If the description is unclear, ask before reviewing code.
- Load the `code-review` KDNA domain before starting.

### 2. Trace Behavior (Most Important)

Follow the change through its execution paths:
- Walk through the happy path
- Walk through error paths
- Check inputs: null, empty, oversized, malformed
- Check state: initial, intermediate, boundary, invalid
- Check concurrency: shared state, race windows, ordering assumptions
- Check side effects: filesystem, network, database, external services

**Self-check**: Can you describe exactly what happens when the code runs, for both valid and invalid inputs?

### 3. Classify Every Comment

Before posting any comment, classify it:

| Type | Definition | Required |
|------|-----------|----------|
| **Finding** | A specific defect or risk with a named failure mode | Must be fixed or explicitly accepted |
| **Question** | Something you genuinely don't understand about the change | Ask it |
| **Preference** | How you would have done it differently, without a concrete failure mode | Label as optional |

**Rule**: If you cannot name the specific failure mode a comment prevents, it is a preference — label it "Optional" or don't post it.

### 4. Verify Tests

- Do tests verify behavior (what it does) or implementation (how it does it)?
- Are edge cases tested? Error paths?
- Do the tests fail if the behavior changes? (AX-004 from TDD domain)

### 5. Check Maintainability

Only after verifying correctness:
- Is the code structure clear?
- Are names descriptive?
- Is complexity justified? (Not "is it complex" — "is the complexity WORTH IT")
- Are there hidden dependencies or coupling?

### 6. Write the Review

Structure your review:
1. **Summary**: What you verified and your overall assessment
2. **Findings** (must-fix): Specific defects with failure modes
3. **Questions**: Things you need clarified
4. **Preferences** (optional): Style suggestions, clearly labeled

### 7. Approve or Request Changes

- **Approve only if**: You verified specific behaviors AND you would be willing to maintain this code.
- **Request changes if**: Any finding is a real defect, security risk, or future maintenance trap.
- **Never approve with just "LGTM"**. Approval is a recorded act of verification.

## Self-Checks (from KDNA Domain)

- [ ] Did I name at least one specific behavior I verified?
- [ ] Did I identify any edge cases I considered, including ones I determined are safe?
- [ ] Does each comment that requests a change cite a specific failure mode?
- [ ] Did I label any preference comments as optional?
- [ ] Did I trace this change through its callers or dependents?
- [ ] Can someone reading this review six months later understand what was checked and why it passed?

## What Makes This Better Than Standard Review Guidelines

Standard review guidelines say "review the code." KDNA adds judgment:

- You know WHAT a real finding looks like (AX-003: must cite a failure mode)
- You know HOW to prioritize (AX-002: behavior before implementation)
- You know WHEN to approve (AX-001: only with documented verification)
- You know WHAT to ban (LGTM, "consider", "looks good to me" — with specific replacements)
- You can be VERIFIED: does your review document what was checked, or is it just opinion?
