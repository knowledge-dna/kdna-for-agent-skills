# Contributing to KDNA for Agent Skills

Thank you for your interest in contributing!

## Principles

1. **No copied content.** Do not copy text from mattpocock/skills or any other agent-skill project. KDNA domains must encode original judgment patterns.
2. **Follow the KDNA spec.** All domains must conform to KDNA v0.4. Minimum valid domain: `kdna.json` + `KDNA_Core.json` + `KDNA_Patterns.json`.
3. **Keep domains concise.** KDNA is not a knowledge base or textbook. Each file should encode judgment, not exposition.
4. **Use lowercase_snake_case** for all domain directory names.
5. **No extra KDNA file types.** Only the 6 standard KDNA files plus `kdna.json` are allowed.

## How to Add a Domain

1. Create a directory under `clusters/coding_agent/` with the domain name
2. Write `kdna.json` (manifest)
3. Write `KDNA_Core.json` (axioms, ontology, frameworks, core_structure, stances)
4. Write `KDNA_Patterns.json` (terminology, misunderstandings, self_check)
5. Update `cluster.json` to include the new domain
6. Run `node scripts/validate-cluster.mjs` to verify

## How to Submit

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure validation passes
5. Submit a pull request

## Code of Conduct

Be respectful. Be constructive. Focus on the work.
