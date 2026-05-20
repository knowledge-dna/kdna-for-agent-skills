# KDNA Cognition Domains

This project includes KDNA cognition domains that provide structured judgment patterns for coding tasks.

## Loading Domains

When you start a task, check the following signals and load the corresponding domains:

### requirement_alignment

Load when: user request is vague, task has hidden constraints, agent is about to implement without enough context, user provides a wish without scope or criteria

Files:
- clusters/coding_agent/requirement_alignment/KDNA_Core.json
- clusters/coding_agent/requirement_alignment/KDNA_Patterns.json
- clusters/coding_agent/requirement_alignment/KDNA_Scenarios.json
- clusters/coding_agent/requirement_alignment/KDNA_Cases.json
- clusters/coding_agent/requirement_alignment/KDNA_Reasoning.json
- clusters/coding_agent/requirement_alignment/KDNA_Evolution.json

### shared_language

Load when: project has domain-specific terminology, agent uses verbose descriptions, naming consistency matters

Files:
- clusters/coding_agent/shared_language/KDNA_Core.json
- clusters/coding_agent/shared_language/KDNA_Patterns.json
- clusters/coding_agent/shared_language/KDNA_Scenarios.json
- clusters/coding_agent/shared_language/KDNA_Cases.json
- clusters/coding_agent/shared_language/KDNA_Reasoning.json
- clusters/coding_agent/shared_language/KDNA_Evolution.json

### bug_diagnosis

Load when: bug report, test failure, performance regression, runtime error

Files:
- clusters/coding_agent/bug_diagnosis/KDNA_Core.json
- clusters/coding_agent/bug_diagnosis/KDNA_Patterns.json
- clusters/coding_agent/bug_diagnosis/KDNA_Scenarios.json
- clusters/coding_agent/bug_diagnosis/KDNA_Cases.json
- clusters/coding_agent/bug_diagnosis/KDNA_Reasoning.json
- clusters/coding_agent/bug_diagnosis/KDNA_Evolution.json

### test_driven_development

Load when: new feature implementation, bug fix with expected behavior, regression prevention, agent is about to write implementation without a failing test

Files:
- clusters/coding_agent/test_driven_development/KDNA_Core.json
- clusters/coding_agent/test_driven_development/KDNA_Patterns.json
- clusters/coding_agent/test_driven_development/KDNA_Scenarios.json
- clusters/coding_agent/test_driven_development/KDNA_Cases.json
- clusters/coding_agent/test_driven_development/KDNA_Reasoning.json
- clusters/coding_agent/test_driven_development/KDNA_Evolution.json

### architecture_reasoning

Load when: large change, module boundary concern, codebase complexity, request to zoom out

Files:
- clusters/coding_agent/architecture_reasoning/KDNA_Core.json
- clusters/coding_agent/architecture_reasoning/KDNA_Patterns.json
- clusters/coding_agent/architecture_reasoning/KDNA_Scenarios.json
- clusters/coding_agent/architecture_reasoning/KDNA_Cases.json
- clusters/coding_agent/architecture_reasoning/KDNA_Reasoning.json
- clusters/coding_agent/architecture_reasoning/KDNA_Evolution.json

### issue_decomposition

Load when: plan needs to become tasks, PRD needs issue breakdown, triage is requested

Files:
- clusters/coding_agent/issue_decomposition/KDNA_Core.json
- clusters/coding_agent/issue_decomposition/KDNA_Patterns.json
- clusters/coding_agent/issue_decomposition/KDNA_Scenarios.json
- clusters/coding_agent/issue_decomposition/KDNA_Cases.json
- clusters/coding_agent/issue_decomposition/KDNA_Reasoning.json
- clusters/coding_agent/issue_decomposition/KDNA_Evolution.json

### handoff_context

Load when: conversation needs compacting, another agent will continue, session is ending

Files:
- clusters/coding_agent/handoff_context/KDNA_Core.json
- clusters/coding_agent/handoff_context/KDNA_Patterns.json
- clusters/coding_agent/handoff_context/KDNA_Scenarios.json
- clusters/coding_agent/handoff_context/KDNA_Cases.json
- clusters/coding_agent/handoff_context/KDNA_Reasoning.json
- clusters/coding_agent/handoff_context/KDNA_Evolution.json

## Loading Order

1. Always read Core + Patterns first
2. Read Scenarios when the task matches a specific situation
3. Read Cases when you need examples
4. Read Reasoning when tradeoffs matter
5. Read Evolution when measuring improvement

## How to Apply

- Axioms are principles, not suggestions — treat them as constraints on your judgment
- Terminology defines what words mean and don't mean in this domain
- Banned terms must be replaced with their specified alternatives
- Self-checks must pass before you produce output
- Stances are your default positions when reasoning in this domain
