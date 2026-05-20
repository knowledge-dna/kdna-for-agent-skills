# Attribution

This project is inspired by the broader agent-skills ecosystem, including [mattpocock/skills](https://github.com/mattpocock/skills).

It does not claim affiliation, endorsement, or compatibility unless explicitly stated.

## What We Use

From the agent-skills ecosystem, we use:

- **Identified failure modes** — the publicly documented problems that agents encounter in real engineering work
- **High-frequency workflow patterns** — the general categories of tasks that agents perform repeatedly
- **Structural insights** — observations about what makes agent guidance effective or ineffective

## What We Do NOT Use

- Skill text or instructions — we do not copy, paraphrase, or rephrase any skill content
- Skill-specific workflows — we encode judgment patterns, not step-by-step procedures
- Skill branding or naming — our KDNA domains have their own names and structure

## The Relationship

| Aspect | Skills | KDNA Domains |
|--------|--------|-------------|
| Unit | Skill instruction | Judgment pattern |
| Format | Markdown instructions | Structured JSON |
| Level | "What to do" | "How to judge" |
| Composition | Per-skill invocation | Domain cluster with load conditions |
| Testability | Manual review | Before/after comparison |

Skills and KDNA are complementary. Skills execute; KDNA judges. This project demonstrates that relationship.
