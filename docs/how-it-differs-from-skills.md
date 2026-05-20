# How KDNA Differs from Skills

Popular skills projects prove the demand. KDNA provides the cognition structure.

This project is inspired by the broader agent-skills ecosystem, including [mattpocock/skills](https://github.com/mattpocock/skills). It does not copy skill text or claim affiliation. It focuses on what KDNA adds beyond workflows.

## What Skills Solve Well

Skills encode repeatable workflows. They tell an agent the steps to follow for a given situation:

- `/diagnose`: reproduce → minimize → hypothesize → instrument → fix → regression-test
- `/tdd`: write failing test → implement → refactor
- `/grill-me`: ask questions one at a time → resolve each branch → confirm alignment

This is genuinely valuable. Without skills, agents either improvise or follow generic patterns that don't match the situation.

Skills solve the **execution gap**: agents don't know what to do next.

## What KDNA Adds

KDNA encodes the **judgment layer** — the patterns that determine when a workflow applies, what the common misjudgments are, and how to verify you're on the right track.

Skills answer: what's the next step?

KDNA answers:

- When should I stop and think before acting?
- What signal tells me this situation is different from the obvious interpretation?
- What's the common misjudgment here, and how do I avoid it?
- How do I check myself before producing output?

## Side-by-Side

| Dimension | Skills | KDNA |
|-----------|--------|------|
| Unit | Skill instruction | Cognition domain |
| Format | Markdown instructions | Structured JSON with meta |
| Level | "What to do" | "How to judge" |
| Composability | Per-skill invocation | Domains with load conditions |
| Testability | Manual review | Before/after comparison |
| Content type | Workflow steps | Axioms, terminology boundaries, misunderstandings, self-checks |
| Failure mode addressed | Agent doesn't know what to do | Agent doesn't know when to stop and think |
| Granularity | One skill per situation | One domain per judgment category |

## How They Work Together

Skills and KDNA are complementary, not competing.

A skill says: "When diagnosing a bug, reproduce it first."

KDNA says: "A fix without reproduction is a guess — this is an axiom, not a suggestion. The common misjudgment is treating the first plausible cause as the real cause. Before proposing any fix, check: can you state the smallest reproducible condition?"

The skill provides the step. KDNA provides the judgment that enforces the step.

### Example: Bug Diagnosis

**Skill version:**
> Follow these steps: reproduce, minimize, hypothesize, instrument, fix, regression-test.

**KDNA version:**
> Axiom: A fix without reproduction is a guess.
> Misunderstanding: Treating the first plausible cause as the real cause.
> Self-check: Can you state the smallest reproducible condition before proposing a fix?
> Banned term: "let me just try this fix" → replace with "my hypothesis is X, I will test it by Y"

The skill tells the agent what to do. The KDNA domain tells the agent how to judge whether it's doing the right thing — and catches it when it's about to skip a critical step.

### Example: Requirement Alignment

**Skill version:**
> Ask questions before implementing. Resolve each decision branch.

**KDNA version:**
> Axiom: A task without aligned requirements is a guess, not a plan.
> Misunderstanding: "If the user says 'go ahead', the requirement is aligned."
> Banned term: "I understand what you want" → replace with "let me restate the scope and success criteria to verify"
> Self-check: Can I state the full scope of what is included and excluded?

The skill prescribes a process. KDNA encodes the judgment that prevents the agent from skipping that process under pressure.

## The Core Distinction

| | Skills | KDNA |
|--|--------|------|
| Encodes | Repeatable workflows | Repeatable judgment patterns |
| Says | "Do this" | "Judge whether this applies" |
| Catches | Agent doesn't know what to do | Agent acts without thinking |
| Protects against | Lack of process | Misjudgment within the process |

Skills execute. KDNA judges.

Both are needed. This project demonstrates that relationship with real examples.
