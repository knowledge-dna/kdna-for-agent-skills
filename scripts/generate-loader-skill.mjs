#!/usr/bin/env node

/**
 * generate-loader-skill.mjs — Generate an agent-specific loader skill
 * that teaches an agent how to load KDNA domains based on task context.
 *
 * Usage:
 *   node scripts/generate-loader-skill.mjs claude_code
 *   node scripts/generate-loader-skill.mjs codex
 *   node scripts/generate-loader-skill.mjs opencode
 *   node scripts/generate-loader-skill.mjs cursor
 *
 * Output is written to adapters/<agent>/README.md or SKILL.md depending on the agent.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadJSON(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

function loadCluster() {
  const clusterPath = join(__dirname, '..', 'clusters', 'coding_agent', 'cluster.json');
  return loadJSON(clusterPath);
}

function generateClaudeCodeSkill(cluster) {
  const activeDomains = cluster.domains.filter(d => d.status !== 'planned');
  const plannedDomains = cluster.domains.filter(d => d.status === 'planned');

  let skill = `---
name: kdna-loader
description: Load KDNA cognition domains for coding agent tasks. Use when the user asks for engineering help, bug fixing, feature implementation, or architecture decisions.
argument-hint: "Describe the task or problem"
---

# KDNA Loader

You have access to a KDNA cognition cluster that provides structured judgment patterns for coding tasks.

## How to Use

When the user asks for engineering help, **classify the situation** and load the relevant KDNA domains.

## Available Domains

`;

  for (const domain of activeDomains) {
    const domainDir = join(__dirname, '..', 'clusters', 'coding_agent', domain.path.replace(/^\.\//, ''));
    const kdnaJson = loadJSON(join(domainDir, 'kdna.json'));

    skill += `### ${domain.domain}\n\n`;
    if (kdnaJson) {
      skill += `${kdnaJson.description}\n\n`;
    }
    skill += `**Load when:**\n`;
    for (const signal of domain.load_when) {
      skill += `- ${signal}\n`;
    }
    skill += `\n**Files:**\n`;
    if (kdnaJson) {
      for (const file of kdnaJson.files) {
        skill += `- \`clusters/coding_agent/${domain.path.replace(/^\.\//, '')}/${file}\`\n`;
      }
    }
    skill += `\n`;
  }

  skill += `## Loading Strategy

1. **Always load** Core + Patterns for any activated domain
2. **Load Scenarios** when the task has a concrete context or specific situation
3. **Load Cases** when examples are needed or when demonstrating correct vs. incorrect judgment
4. **Load Reasoning** when the user asks "why" or when tradeoffs matter
5. **Load Evolution** when coaching, improvement, or practice measurement is requested

## How to Classify

Read the user's request and match against the "Load when" signals above. Multiple domains can be active simultaneously.

`;
  if (plannedDomains.length > 0) {
    skill += `## Planned Domains (not yet available)\n\n`;
    for (const domain of plannedDomains) {
      skill += `- \`${domain.domain}\`\n`;
    }
    skill += `\n`;
  }

  skill += `## Important

- KDNA domains encode **judgment patterns**, not workflow instructions
- After loading, apply the axioms, terminology, and self-checks to your reasoning
- Use the stances as your default position for the domain
- Check yourself against the self_check list before producing output
- Do not copy domain content verbatim into your response — internalize the judgment and apply it
`;

  return skill;
}

function generateCodexSkill(cluster) {
  const activeDomains = cluster.domains.filter(d => d.status !== 'planned');

  let skill = `# KDNA Cognition Domains

This project includes KDNA cognition domains that provide structured judgment patterns for coding tasks.

## Loading Domains

When you start a task, check the following signals and load the corresponding domains:

`;

  for (const domain of activeDomains) {
    skill += `### ${domain.domain}\n\n`;
    skill += `Load when: ${domain.load_when.join(', ')}\n\n`;
    skill += `Files:\n`;
    const domainDir = join(__dirname, '..', 'clusters', 'coding_agent', domain.path.replace(/^\.\//, ''));
    const kdnaJson = loadJSON(join(domainDir, 'kdna.json'));
    if (kdnaJson) {
      for (const file of kdnaJson.files) {
        skill += `- clusters/coding_agent/${domain.path.replace(/^\.\//, '')}/${file}\n`;
      }
    }
    skill += `\n`;
  }

  skill += `## Loading Order

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
`;

  return skill;
}

function generateOpenCodeSkill(cluster) {
  return generateCodexSkill(cluster);
}

function generateCursorSkill(cluster) {
  const activeDomains = cluster.domains.filter(d => d.status !== 'planned');

  let skill = `# KDNA for Cursor

## Overview

KDNA cognition domains provide structured judgment patterns for coding tasks. Configure Cursor to load relevant domains based on the task context.

## Setup

Add the following to your Cursor rules or .cursorrules file:

\`\`\`
When working on coding tasks, reference the KDNA cognition domains in clusters/coding_agent/.
Load Core + Patterns for any activated domain.
Apply axioms, terminology, and self-checks to your reasoning.
\`\`\`

## Available Domains

`;

  for (const domain of activeDomains) {
    skill += `- **${domain.domain}**: ${domain.load_when.join('; ')}\n`;
  }

  skill += `\n## Domain Files\n\nEach domain is located at \`clusters/coding_agent/<domain_name>/\` and contains:\n\n`;
  skill += `- \`kdna.json\` — Domain manifest\n`;
  skill += `- \`KDNA_Core.json\` — Axioms, ontology, frameworks, stances\n`;
  skill += `- \`KDNA_Patterns.json\` — Terminology, misunderstandings, self-checks\n`;
  skill += `- \`KDNA_Scenarios.json\` — Scenario triggers (optional)\n`;
  skill += `- \`KDNA_Cases.json\` — Example cases (optional)\n`;
  skill += `- \`KDNA_Reasoning.json\` — Reasoning chains (optional)\n`;
  skill += `- \`KDNA_Evolution.json\` — Capability stages (optional)\n`;

  return skill;
}

// Main
const agentType = process.argv[2];
if (!agentType || !['claude_code', 'codex', 'opencode', 'cursor'].includes(agentType)) {
  console.error('Usage: node scripts/generate-loader-skill.mjs <claude_code|codex|opencode|cursor>');
  process.exit(1);
}

const cluster = loadCluster();
if (!cluster) {
  console.error('Failed to load cluster.json');
  process.exit(1);
}

const generators = {
  claude_code: { generate: generateClaudeCodeSkill, filename: 'SKILL.md' },
  codex: { generate: generateCodexSkill, filename: 'AGENTS.md' },
  opencode: { generate: generateOpenCodeSkill, filename: 'README.md' },
  cursor: { generate: generateCursorSkill, filename: 'README.md' }
};

const { generate, filename } = generators[agentType];
const content = generate(cluster);
const outputPath = join(__dirname, '..', 'adapters', agentType, filename);

writeFileSync(outputPath, content, 'utf-8');
console.log(`Generated: ${outputPath}`);
