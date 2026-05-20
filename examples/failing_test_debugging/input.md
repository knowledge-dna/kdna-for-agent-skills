# Example: Failing Test Debugging

## Input

```
User: "This test is failing. Can you fix it?"

Test output:
  ✗ UserService.create() should reject invalid email
  Expected: Error "Invalid email format"
  Received: null
```

## KDNA Domains Activated

- **bug_diagnosis** — primary (signal: "test failure")
- **test_driven_development** — secondary (signal: "bug fix with expected behavior")

Loaded files: bug_diagnosis/Core + Patterns + Scenarios; test_driven_development/Core + Patterns
