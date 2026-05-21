---
name: tdd
description: Test-Driven Development with KDNA judgment. Red-green-refactor loop enforced by domain axioms. Use when implementing features, fixing bugs, or writing any new code.
trigger: user requests new feature, bug fix, test writing, or mentions "TDD" / "test-first" / "red-green-refactor"
---

# Test-Driven Development

## Philosophy

**Core principle**: Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't.

**Good tests** are integration-style: they exercise real code paths through public APIs. They describe _what_ the system does, not _how_ it does it. A good test reads like a specification: "user can checkout with valid cart" tells you exactly what capability exists. These tests survive refactors because they don't care about internal structure.

**Bad tests** are coupled to implementation. They mock internal collaborators, test private methods, or verify through external means. The warning sign: your test breaks when you refactor, but behavior hasn't changed.

## KDNA Judgment — Must Follow

These are not suggestions. They are domain axioms loaded from the `tdd` KDNA domain. Violating them means your work is not TDD.

**AX-001**: A test written after implementation tests the implementation, not the behavior. Write the test FIRST.

**AX-002**: Vertical slices produce reliable software; horizontal slices produce brittle tests. One test covers one behavior through the full stack. Don't test all behaviors at one layer.

**AX-003**: Refactoring while RED is waste. If the test is failing, the ONLY valid action is to make it pass. Refactor only on GREEN.

**AX-004**: A test that cannot fail is not a test. Before writing implementation, verify the test fails. If it passes without code, it's testing nothing.

**AX-005**: Each test should have one reason to fail. If a test can fail for multiple reasons, the failure message won't tell you what broke. One assertion per logical behavior.

## Banned Patterns

The KDNA domain bans these anti-patterns. If you do them, you are not doing TDD:

| Banned | Why | Replace With |
|--------|-----|-------------|
| "Write all tests first, then implement" | Horizontal slicing. Tests test imagined behavior, not actual behavior. | Vertical slices: one test → one implementation pass → repeat. |
| "We'll add tests later" | Tests written after implementation test what the code DOES, not what it SHOULD do. | Write the failing test NOW. |
| Mock-heavy unit tests | Tests implementation details. When you refactor, tests break even though behavior is correct. | Integration-style tests through public APIs. |
| Testing private methods | Private methods are implementation details. They change or disappear during refactoring. | Test through the public interface that calls them. |
| "This test is too simple to fail" | If you can't make it fail, it's not verifying anything. | Delete it. Every test must have a verifiable failure mode. |

## Workflow

### 1. Planning (Before any code)

- Identify the behavior to implement. State it as a user-facing capability.
- Confirm with the user what the public interface should look like.
- Prioritize: which behaviors are most critical to test first?
- Load the `tdd` KDNA domain before writing any code.

### 2. RED — Write a Failing Test

- Write ONE test for ONE behavior.
- The test must exercise the public interface.
- The test must fail BEFORE you write implementation. Verify this.
- If the test passes without implementation code, it's not testing anything — rewrite it.
- **Self-check**: Can you explain what specific behavior this test verifies?

### 3. GREEN — Make It Pass

- Write the MINIMUM code to make the test pass. Not the elegant code. Not the optimized code. The minimum.
- Don't think about design during GREEN. Design happens in REFACTOR.
- **Self-check**: Does the implementation do ONLY what's needed to pass the test?

### 4. REFACTOR — Improve Design

- ONLY refactor on GREEN (all tests passing).
- Improve code structure, remove duplication, clarify names.
- Run tests after each refactoring step. If tests break, you changed behavior — revert.
- **Self-check**: Did the refactoring change any test? If yes, the test was testing implementation, not behavior.

### 5. Repeat

- One behavior at a time. RED → GREEN → REFACTOR.
- NEVER write multiple tests at once. NEVER implement without a failing test.
- After 3-5 cycles, review: are the tests reading like specifications?

## Self-Checks (from KDNA Domain)

Before completing the task, verify:

- [ ] Did I write the test before the implementation?
- [ ] Does each test verify behavior through public interfaces, not implementation details?
- [ ] Did I use vertical slices (one test → one implementation → repeat)?
- [ ] Did I refactor ONLY when all tests were green?
- [ ] Does every test have a single, clear reason to fail?
- [ ] Can I delete the implementation and still have the test fail for the right reason?
- [ ] Would these tests survive a significant refactoring?

## What Makes This Better Than Standard TDD Skills

Standard TDD skills tell you the red-green-refactor loop. KDNA adds judgment:

- You know WHY you write tests first (AX-001: post-hoc tests confirm implementation, not behavior)
- You know WHAT counts as a good test (AX-005: one reason to fail)
- You know WHEN refactoring is safe (AX-003: only on GREEN)
- You know WHAT to avoid (banned patterns with explicit replacements)
- You can BE VERIFIED against these principles after the fact

The difference is not in the workflow. It's in the **judgment framework** that surrounds the workflow and catches mistakes before they become code.
