# Demo: Failing Test Debugging

A complete before/after comparison showing how KDNA domains change agent judgment.

## Input

```
User: "This test is failing. Can you fix it?"

Test output:
  ✗ UserService.create() should reject invalid email
  Expected: Error "Invalid email format"
  Received: null
```

## KDNA Domains Activated

`bug_diagnosis` (primary) + `test_driven_development` (secondary)

```bash
$ node scripts/select-domains.mjs "fix this failing test"

{
  "selected_domains": ["bug_diagnosis", "test_driven_development"],
  "load_reason": "bug_diagnosis: \"test failure\"; test_driven_development: \"bug fix with expected behavior\""
}
```

---

## Without KDNA (Baseline)

The agent reads the error message and jumps to the most obvious fix:

> Looking at the failing test, the issue is missing email validation. I'll add it.

```diff
+ if (!email.includes('@')) {
+   throw new Error('Invalid email format');
+ }
```

> Done. The test should pass now.

**What went wrong:**

| Problem | Violated KDNA Axiom |
|---------|-------------------|
| No reproduction — trusted the test output at face value | bug_diagnosis AX-001: A fix without reproduction is a guess |
| Committed to first hypothesis ("validation missing") | bug_diagnosis AX-002: The first plausible hypothesis is rarely correct |
| Used `includes('@')` — `"@"` would pass validation | (trivial fix, wrong abstraction) |
| No regression test written | bug_diagnosis AX-004: A regression test must exist before the fix is applied |
| Didn't check if validation already existed elsewhere | requirement_alignment ON-002: Hidden constraints from context |
| Would have broken `adminService` that depends on return-based validation | bug_diagnosis AX-006: A symptom is not a cause |

---

## With KDNA (Loaded Domains)

The agent follows the judgment patterns encoded in `bug_diagnosis` and `test_driven_development`.

### Step 1: Reproduce (AX-001)

> Before proposing a fix, I need to confirm the failure.

```
$ npm test -- UserService.create
✗ UserService.create() should reject invalid email
  Expected: Error "Invalid email format"
  Received: null
```

Reproduction confirmed.

### Step 2: Generate hypotheses (AX-002)

> Instead of jumping to the first explanation, I'll list possible root causes:

| # | Hypothesis | Testable? |
|---|-----------|-----------|
| H1 | Email validation is not called at all | Add log at validation entry → check if called |
| H2 | Validation exists but returns instead of throwing | Check validation function return type |
| H3 | Validation throws but is caught upstream | Check for try/catch in caller |
| H4 | Test targets the wrong method/signature | Verify test matches the code path |

### Step 3: Test H1 (most falsifiable)

```typescript
// Current code
export class UserService {
  create(data: { email: string }) {
    const validated = validateInput(data);  // validation IS called
    return this.repository.save(validated);
  }
}
```

**H1 eliminated** — validation is called.

### Step 4: Test H2

```typescript
// validators.ts (current)
export function validateInput(data: { email: string }) {
  if (!isValidEmail(data.email)) {
    return { error: 'Invalid email format' };  // RETURNS, doesn't throw!
  }
  return data;
}
```

**H2 confirmed** — validation detects the invalid email but returns an error object instead of throwing. `create()` doesn't check the return value.

### Step 5: Check for hidden constraints (AX-006, ON-002)

Before applying a fix, check if other callers depend on current behavior:

```
$ grep -r "validateInput" src/
src/services/userService.ts:  const validated = validateInput(data);
src/services/adminService.ts:  const result = validateInput(data);
  if (result.error) { ... }  // depends on return-based behavior!
```

**Hidden constraint found:** Changing `validateInput` to throw would break `adminService`.

### Step 6: Write regression test BEFORE fix (AX-004)

```typescript
it('should reject invalid email', () => {
  expect(() => UserService.create({ email: 'invalid' }))
    .toThrow('Invalid email format');
});
```

This test already exists and is failing — it serves as the regression guard.

### Step 7: Surface decision to user

> The root cause is that `validateInput` returns an error object instead of throwing. However, `adminService` depends on the return-based behavior. Two options:
>
> - **Option A**: Change `validateInput` to throw, update `adminService` to use try/catch
> - **Option B**: Keep `validateInput` returning, make `UserService.create` check the return value
>
> Which approach fits your project conventions?

---

## Judgment Difference Summary

| Judgment Point | Without KDNA | With KDNA |
|---------------|-------------|-----------|
| First action | Write a fix | Reproduce the failure |
| Hypotheses | 1 (implicit) | 4 (explicit, ranked) |
| Hidden constraints | Not checked | Found adminService dependency |
| Regression test | Not written | Written before fix |
| Fix scope | Changed validation globally | Surfaced as decision for user |
| Would have broken | adminService | Nothing — decision deferred to user |

**Key insight:** The baseline agent would have written a "working fix" that breaks another service. The KDNA-loaded agent discovered the real root cause (inconsistent error handling pattern) and surfaced it as a decision instead of silently introducing a regression.

---

## Full Example Files

- [input.md](../examples/failing_test_debugging/input.md)
- [baseline-output.md](../examples/failing_test_debugging/baseline-output.md)
- [kdna-output.md](../examples/failing_test_debugging/kdna-output.md)
- [kdna-loaded-domains.json](../examples/failing_test_debugging/kdna-loaded-domains.json)
