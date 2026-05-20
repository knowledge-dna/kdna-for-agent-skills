---
name: kdna-loader
description: Load KDNA cognition domains for coding agent tasks. Use when the user asks for engineering help, bug fixing, feature implementation, or architecture decisions.
argument-hint: "Describe the task or problem"
---

# KDNA Loader

You have access to a KDNA cognition cluster that provides structured judgment patterns for coding tasks.

## How to Use

When the user asks for engineering help, **classify the situation** and load the relevant KDNA domains.

## Available Domains

### requirement_alignment

Judgment patterns for when a requirement is truly aligned vs. when the agent is about to implement on wishful thinking.

**Load when:**
- user request is vague
- task has hidden constraints
- agent is about to implement without enough context
- user provides a wish without scope or criteria

**Files:**
- `clusters/coding_agent/requirement_alignment/KDNA_Core.json`
- `clusters/coding_agent/requirement_alignment/KDNA_Patterns.json`
- `clusters/coding_agent/requirement_alignment/KDNA_Scenarios.json`
- `clusters/coding_agent/requirement_alignment/KDNA_Cases.json`
- `clusters/coding_agent/requirement_alignment/KDNA_Reasoning.json`
- `clusters/coding_agent/requirement_alignment/KDNA_Evolution.json`

### shared_language

Judgment patterns for building and maintaining a shared language between agents and humans: what terms to keep, avoid, or formalize.

**Load when:**
- project has domain-specific terminology
- agent uses verbose descriptions
- naming consistency matters

**Files:**
- `clusters/coding_agent/shared_language/KDNA_Core.json`
- `clusters/coding_agent/shared_language/KDNA_Patterns.json`
- `clusters/coding_agent/shared_language/KDNA_Scenarios.json`
- `clusters/coding_agent/shared_language/KDNA_Cases.json`
- `clusters/coding_agent/shared_language/KDNA_Reasoning.json`
- `clusters/coding_agent/shared_language/KDNA_Evolution.json`

### bug_diagnosis

Judgment patterns for disciplined bug diagnosis: when a fix is a guess, what counts as reproduction, and when to refuse to fix.

**Load when:**
- bug report
- test failure
- performance regression
- runtime error

**Files:**
- `clusters/coding_agent/bug_diagnosis/KDNA_Core.json`
- `clusters/coding_agent/bug_diagnosis/KDNA_Patterns.json`
- `clusters/coding_agent/bug_diagnosis/KDNA_Scenarios.json`
- `clusters/coding_agent/bug_diagnosis/KDNA_Cases.json`
- `clusters/coding_agent/bug_diagnosis/KDNA_Reasoning.json`
- `clusters/coding_agent/bug_diagnosis/KDNA_Evolution.json`

### test_driven_development

Judgment patterns for test-driven development: what makes a test behavioral vs. brittle, when TDD applies, and what a vertical slice looks like.

**Load when:**
- new feature implementation
- bug fix with expected behavior
- regression prevention
- agent is about to write implementation without a failing test

**Files:**
- `clusters/coding_agent/test_driven_development/KDNA_Core.json`
- `clusters/coding_agent/test_driven_development/KDNA_Patterns.json`
- `clusters/coding_agent/test_driven_development/KDNA_Scenarios.json`
- `clusters/coding_agent/test_driven_development/KDNA_Cases.json`
- `clusters/coding_agent/test_driven_development/KDNA_Reasoning.json`
- `clusters/coding_agent/test_driven_development/KDNA_Evolution.json`

### architecture_reasoning

Judgment patterns for architecture reasoning: when to zoom out, what constitutes a deep module, and when refactoring boundaries is necessary.

**Load when:**
- large change
- module boundary concern
- codebase complexity
- request to zoom out

**Files:**
- `clusters/coding_agent/architecture_reasoning/KDNA_Core.json`
- `clusters/coding_agent/architecture_reasoning/KDNA_Patterns.json`
- `clusters/coding_agent/architecture_reasoning/KDNA_Scenarios.json`
- `clusters/coding_agent/architecture_reasoning/KDNA_Cases.json`
- `clusters/coding_agent/architecture_reasoning/KDNA_Reasoning.json`
- `clusters/coding_agent/architecture_reasoning/KDNA_Evolution.json`

### issue_decomposition

Judgment patterns for issue decomposition: what makes an issue independently deliverable, how to slice vertically, and when to triage before executing.

**Load when:**
- plan needs to become tasks
- PRD needs issue breakdown
- triage is requested

**Files:**
- `clusters/coding_agent/issue_decomposition/KDNA_Core.json`
- `clusters/coding_agent/issue_decomposition/KDNA_Patterns.json`
- `clusters/coding_agent/issue_decomposition/KDNA_Scenarios.json`
- `clusters/coding_agent/issue_decomposition/KDNA_Cases.json`
- `clusters/coding_agent/issue_decomposition/KDNA_Reasoning.json`
- `clusters/coding_agent/issue_decomposition/KDNA_Evolution.json`

### handoff_context

Judgment patterns for agent handoff: what information must survive between agents, what is noise, and how to preserve decision context.

**Load when:**
- conversation needs compacting
- another agent will continue
- session is ending

**Files:**
- `clusters/coding_agent/handoff_context/KDNA_Core.json`
- `clusters/coding_agent/handoff_context/KDNA_Patterns.json`
- `clusters/coding_agent/handoff_context/KDNA_Scenarios.json`
- `clusters/coding_agent/handoff_context/KDNA_Cases.json`
- `clusters/coding_agent/handoff_context/KDNA_Reasoning.json`
- `clusters/coding_agent/handoff_context/KDNA_Evolution.json`

## Loading Strategy

1. **Always load** Core + Patterns for any activated domain
2. **Load Scenarios** when the task has a concrete context or specific situation
3. **Load Cases** when examples are needed or when demonstrating correct vs. incorrect judgment
4. **Load Reasoning** when the user asks "why" or when tradeoffs matter
5. **Load Evolution** when coaching, improvement, or practice measurement is requested

## How to Classify

Read the user's request and match against the "Load when" signals above. Multiple domains can be active simultaneously.

## Important

- KDNA domains encode **judgment patterns**, not workflow instructions
- After loading, apply the axioms, terminology, and self-checks to your reasoning
- Use the stances as your default position for the domain
- Check yourself against the self_check list before producing output
- Do not copy domain content verbatim into your response — internalize the judgment and apply it
