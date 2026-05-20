# Example: Agent Handoff

## Input

```
User: "I need to step away. Summarize what we've done so another agent can continue."
```

Context: The user and agent have been working on implementing the team collaboration feature. They've completed Issues 1-2 (team creation, membership management) and were in the middle of Issue 3 (project sharing) when a question arose about whether project sharing should be team-level or document-level.

## KDNA Domains Activated

- **requirement_alignment** — primary (unresolved decision branch from Issue 3)
- **bug_diagnosis** — secondary (one bug was found during Issue 2: role validation was missing for self-removal)

Note: `handoff_context` domain is planned and would be the primary domain here.
