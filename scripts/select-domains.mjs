#!/usr/bin/env node

/**
 * select-domains.mjs — Select relevant KDNA domains for a given task.
 *
 * Usage:
 *   node scripts/select-domains.mjs "fix this failing test"
 *   node scripts/select-domains.mjs "fix this failing test" --full
 *   node scripts/select-domains.mjs "fix this failing test" --cluster coding_agent
 *
 * Flags:
 *   --full    Include optional files (Scenarios, Cases, Reasoning, Evolution) in load_order
 *   --cluster <name>  Specify cluster name (default: coding_agent)
 *
 * This script reads the cluster.json and its load_when signals,
 * then selects domains whose load_when conditions match the input.
 * It also reads each domain's kdna.json to determine available files.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(args) {
  const positional = [];
  let fullLoad = false;
  let clusterName = 'coding_agent';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--full') {
      fullLoad = true;
    } else if (args[i] === '--cluster' && args[i + 1]) {
      clusterName = args[i + 1];
      i++;
    } else {
      positional.push(args[i]);
    }
  }

  return { input: positional.join(' '), fullLoad, clusterName };
}

function loadJSON(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

function loadCluster(clusterName) {
  const clusterPath = join(__dirname, '..', 'clusters', clusterName, 'cluster.json');
  const cluster = loadJSON(clusterPath);
  if (!cluster) {
    console.error(`Cluster not found: ${clusterPath}`);
    process.exit(1);
  }
  return { cluster, clusterDir: join(__dirname, '..', 'clusters', clusterName) };
}

function selectDomains(input, cluster, clusterDir, fullLoad) {
  const inputLower = input.toLowerCase();
  const inputWords = inputLower.split(/\s+/);
  const selected = [];

  for (const domain of cluster.domains) {
    if (domain.status === 'planned') continue;

    let matchScore = 0;
    const matchedSignals = [];

    for (const signal of domain.load_when) {
      const signalLower = signal.toLowerCase();
      const signalWords = signalLower.split(/\s+/);

      for (const word of inputWords) {
        if (word.length < 3) continue;
        for (const sWord of signalWords) {
          if (sWord.includes(word) || word.includes(sWord)) {
            matchScore++;
            matchedSignals.push(signal);
            break;
          }
        }
      }
    }

    if (matchScore > 0) {
      const domainPath = domain.path.replace(/^\.\//, '');
      const domainDir = join(clusterDir, domainPath);
      const kdnaJson = loadJSON(join(domainDir, 'kdna.json'));

      selected.push({
        domain: domain.domain,
        path: domainPath,
        status: domain.status,
        score: matchScore,
        matched_signals: [...new Set(matchedSignals)],
        available_files: kdnaJson ? kdnaJson.files : ['KDNA_Core.json', 'KDNA_Patterns.json']
      });
    }
  }

  selected.sort((a, b) => b.score - a.score);

  const loadOrder = [];
  for (const sel of selected) {
    loadOrder.push(`${sel.path}/kdna.json`);
    loadOrder.push(`${sel.path}/KDNA_Core.json`);
    loadOrder.push(`${sel.path}/KDNA_Patterns.json`);

    if (fullLoad) {
      const optionalFiles = ['KDNA_Scenarios.json', 'KDNA_Cases.json', 'KDNA_Reasoning.json', 'KDNA_Evolution.json'];
      for (const file of optionalFiles) {
        if (sel.available_files.includes(file)) {
          loadOrder.push(`${sel.path}/${file}`);
        }
      }
    }
  }

  const loadReason = [];
  for (const sel of selected) {
    for (const signal of sel.matched_signals) {
      loadReason.push(`${sel.domain}: "${signal}"`);
    }
  }

  return {
    input,
    selected_domains: selected.map(s => s.domain),
    matched_signals: selected.map(s => ({
      domain: s.domain,
      score: s.score,
      signals: s.matched_signals
    })),
    load_order: loadOrder,
    load_reason: loadReason.join('; ')
  };
}

// Main
const { input, fullLoad, clusterName } = parseArgs(process.argv.slice(2));
if (!input) {
  console.error('Usage: node scripts/select-domains.mjs "<task description>" [--full] [--cluster <name>]');
  process.exit(1);
}

const { cluster, clusterDir } = loadCluster(clusterName);
const result = selectDomains(input, cluster, clusterDir, fullLoad);
console.log(JSON.stringify(result, null, 2));
