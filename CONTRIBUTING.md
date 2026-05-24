# Contributing to KDNA Agent Skills

This repository contains the KDNA loader skill and agent adapters — the bridge that teaches AI agents (Codex, Claude Code, OpenCode) how to discover, load, and apply KDNA domains at runtime.

For protocol-level guidance (schema, spec, judgment patterns), see the [main KDNA CONTRIBUTING.md](https://github.com/aikdna/kdna/blob/main/CONTRIBUTING.md).

## Development Setup

```bash
git clone https://github.com/aikdna/kdna-for-agent-skills.git
cd kdna-for-agent-skills
```

The skill loader is a markdown-based skill file that agents consume directly. Agent adapters are platform-specific integration shims.

## Contributing New Agent Adapters

To add support for a new agent platform:

1. Create an adapter file under the appropriate directory (e.g., `adapters/<agent-name>/`)
2. Implement the loader interface: domain discovery, loading, and runtime projection
3. Test that the agent can:
   - Discover installed KDNA domains
   - Load relevant domains for a given task
   - Apply judgment fragments at runtime
   - Log loaded domains and triggered axioms
4. Update the loader skill's agent compatibility table
5. Open a PR with test results showing judgment comparison (with vs. without KDNA)

## Adapter Requirements

- Must not bypass the KDNA Human Lock
- Must respect risk-level warnings (R2/R3)
- Must log loaded domains for auditability
- Must report yanked/deprecated domain warnings at load time

## Pull Request Process

1. Open an issue describing the adapter or change
2. Fork the repo and create a branch
3. Test the adapter with at least 3 domains
4. Include a before/after judgment comparison in the PR description
5. Submit a PR against the `main` branch

## License

- Code: Apache 2.0
- Documentation: CC BY 4.0
