# Example: Architecture Decay

## Input

```
User: "Move this notification logic into the UserService where it belongs."
```

Context: The user wants to move notification-sending code from a NotificationService into the UserService, arguing it "belongs there" because it's triggered by user actions.

## KDNA Domains Activated

- **bug_diagnosis** — secondary (the request may mask an architectural issue, not a code placement issue)
- **test_driven_development** — secondary (if refactoring is needed, it should be done with tests)

Note: `architecture_reasoning` is planned and would be the primary domain here. For now, bug_diagnosis provides relevant judgment about whether the proposed "fix" addresses a root cause or a symptom.
