# Evaluation: KDNA Cluster Results

This document summarizes the comparative evaluation of KDNA-loaded vs. skill-only agent behavior across 5 scenarios.

## Summary Table

| Scenario | Correctness | Completeness | Safety | Actionability | Verifiability |
|----------|:-----------:|:------------:|:------:|:-------------:|:-------------:|
| Failing test debugging | +2 | +2 | +3 | +1 | +2 |
| Vague feature request | +2 | +3 | +1 | +2 | +1 |
| Architecture decay | +1 | +2 | +3 | +2 | +1 |
| Issue breakdown | +1 | +2 | +1 | +2 | +1 |
| Agent handoff | +1 | +3 | +1 | +3 | +1 |

Scale: +3 = major improvement, +2 = significant improvement, +1 = moderate improvement, 0 = no difference

## Per-Scenario Analysis

### 1. Failing Test Debugging

**KDNA advantage: Safety (+3)**
The baseline agent wrote a fix that would have broken another service (`adminService`). The KDNA-loaded agent discovered the hidden constraint through systematic hypothesis testing. This is the strongest KDNA advantage because it prevents real damage.

**Key KDNA axioms applied:**
- bug_diagnosis AX-001 (reproduction before fix)
- bug_diagnosis AX-002 (multiple hypotheses)
- bug_diagnosis AX-003 (one variable at a time)

### 2. Vague Feature Request

**KDNA advantage: Completeness (+3)**
The baseline agent implemented a multi-week real-time collaboration system based on a vague request. The KDNA-loaded agent resolved 4 decision branches before writing any code, narrowing scope from "everything" to a verifiable vertical slice.

**Key KDNA axioms applied:**
- requirement_alignment AX-005 (implementation is expensive verification)
- requirement_alignment ON-003 (decision branches)
- requirement_alignment ON-006 (wish vs. task)

### 3. Architecture Decay

**KDNA advantage: Safety (+3)**
The baseline agent made the codebase worse by increasing coupling. The KDNA-loaded agent refused the literal request and identified the real problem (missing abstraction), proposing solutions that preserve the architecture.

**Key KDNA axioms applied:**
- bug_diagnosis AX-006 (symptom is not cause)
- bug_diagnosis stance ("The diagnosis is more valuable than the fix")

### 4. Issue Breakdown

**KDNA advantage: Actionability (+2)**
The baseline agent produced horizontal slices that provide zero value until all are complete. The KDNA-loaded agent produced vertical slices with a tracer bullet, meaning Issue 1 alone is deployable.

**Key KDNA axioms applied:**
- test_driven_development ON-002 (vertical slice)
- test_driven_development ON-006 (tracer bullet)

### 5. Agent Handoff

**KDNA advantage: Completeness (+3), Actionability (+3)**
The baseline agent produced a chronological summary that loses decisions, open questions, and constraints. The KDNA-loaded agent produced a structured handoff that preserves the judgment layer, enabling the next agent to make informed decisions.

**Key KDNA axioms applied:**
- requirement_alignment ON-003 (unresolved decision branches)
- requirement_alignment ON-004 (alignment signals / decisions made)
- requirement_alignment ON-002 (hidden constraints)
- bug_diagnosis AX-001 (root cause, not just fix)

## Overall Assessment

KDNA-loaded agents show the strongest improvement in **safety** and **completeness**. These are the dimensions where judgment matters most — preventing damage and ensuring all relevant factors are considered.

The weakest improvement is in **correctness** for scenarios where the baseline agent would have produced working code (just for the wrong scope or with hidden problems). This is expected: KDNA adds judgment, not capability.

## What KDNA Does NOT Improve

- **Speed of simple tasks**: For unambiguous, well-specified requests, KDNA adds no value. If the user says "fix the typo on line 42," no judgment is needed.
- **Code generation quality**: KDNA does not make the agent write better code. It makes the agent make better decisions about what code to write.
- **Domain-specific knowledge**: KDNA encodes judgment patterns, not domain facts. A KDNA domain for medical diagnosis would not make the agent know medicine.

## Conclusion

KDNA cognition domains improve agent output primarily by preventing three classes of failure:

1. **Premature action** — acting before understanding (requirement_alignment)
2. **Symptom treatment** — fixing surface problems without root cause (bug_diagnosis)
3. **Structural blindness** — making changes that damage the architecture (architecture_reasoning, issue_decomposition)

These are exactly the failure modes identified by popular agent-skill projects. KDNA addresses them at the judgment layer rather than the workflow layer.
