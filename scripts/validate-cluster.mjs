#!/usr/bin/env node

/**
 * validate-cluster.mjs — Validate the coding_agent cluster structure.
 *
 * Checks:
 * 1. cluster.json exists and is valid JSON
 * 2. Each domain directory exists
 * 3. Each active domain has kdna.json, KDNA_Core.json, KDNA_Patterns.json
 * 4. KDNA_Core.json has required fields: meta, axioms, ontology, frameworks, core_structure, stances
 * 5. KDNA_Patterns.json has required fields: terminology, misunderstandings, self_check
 * 6. kdna.json has required fields: kdna_spec, name, version, status
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLUSTER_DIR = join(__dirname, '..', 'clusters', 'coding_agent');
const CLUSTER_PATH = join(CLUSTER_DIR, 'cluster.json');

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  WARN: ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  OK: ${msg}`);
}

function loadJSON(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch (e) {
    error(`Invalid JSON in ${path}: ${e.message}`);
    return null;
  }
}

// 1. Validate cluster.json
console.log('\n=== Validating cluster.json ===');
const cluster = loadJSON(CLUSTER_PATH);
if (!cluster) {
  error('cluster.json not found or invalid');
  process.exit(1);
}

if (!cluster.cluster) error('Missing "cluster" field');
if (!cluster.version) error('Missing "version" field');
if (!Array.isArray(cluster.domains)) error('Missing "domains" array');
else ok(`Found ${cluster.domains.length} domains`);

// 2. Validate each domain
for (const domainEntry of cluster.domains) {
  const domainName = domainEntry.domain;
  const domainDir = join(CLUSTER_DIR, domainName);

  console.log(`\n=== Validating domain: ${domainName} (${domainEntry.status}) ===`);

  if (!existsSync(domainDir)) {
    if (domainEntry.status === 'planned') {
      ok(`Planned domain — skipping`);
      continue;
    }
    error(`Domain directory not found: ${domainDir}`);
    continue;
  }

  if (domainEntry.status === 'planned') {
    warn(`Planned domain has directory — consider implementing or removing`);
  }

  // 3. Validate kdna.json
  const kdnaJson = loadJSON(join(domainDir, 'kdna.json'));
  if (!kdnaJson) {
    error('Missing kdna.json');
  } else {
    if (!kdnaJson.kdna_spec) error('kdna.json missing "kdna_spec"');
    if (!kdnaJson.name) error('kdna.json missing "name"');
    if (!kdnaJson.version) error('kdna.json missing "version"');
    if (!kdnaJson.status) error('kdna.json missing "status"');
    if (kdnaJson.name !== domainName) error(`kdna.json name "${kdnaJson.name}" doesn't match directory "${domainName}"`);
    if (kdnaJson.name) ok(`kdna.json valid (${kdnaJson.kdna_spec}, ${kdnaJson.status})`);
  }

  // 4. Validate KDNA_Core.json
  const coreJson = loadJSON(join(domainDir, 'KDNA_Core.json'));
  if (!coreJson) {
    error('Missing KDNA_Core.json — required for all domains');
  } else {
    const requiredCore = ['axioms', 'ontology', 'frameworks', 'core_structure', 'stances'];
    for (const field of requiredCore) {
      if (!coreJson[field]) error(`KDNA_Core.json missing "${field}"`);
    }
    if (coreJson.domain && coreJson.domain !== domainName) {
      error(`KDNA_Core.json domain "${coreJson.domain}" doesn't match "${domainName}"`);
    }
    if (coreJson.axioms) ok(`Core: ${coreJson.axioms.length} axioms`);
    if (coreJson.ontology) ok(`Core: ${coreJson.ontology.length} ontology terms`);
    if (coreJson.stances) ok(`Core: ${coreJson.stances.length} stances`);
  }

  // 5. Validate KDNA_Patterns.json
  const patternsJson = loadJSON(join(domainDir, 'KDNA_Patterns.json'));
  if (!patternsJson) {
    error('Missing KDNA_Patterns.json — required for all domains');
  } else {
    const requiredPatterns = ['terminology', 'misunderstandings', 'self_check'];
    for (const field of requiredPatterns) {
      if (!patternsJson[field]) error(`KDNA_Patterns.json missing "${field}"`);
    }
    if (patternsJson.terminology?.standard_terms) ok(`Patterns: ${patternsJson.terminology.standard_terms.length} standard terms`);
    if (patternsJson.terminology?.banned_terms) ok(`Patterns: ${patternsJson.terminology.banned_terms.length} banned terms`);
    if (patternsJson.misunderstandings) ok(`Patterns: ${patternsJson.misunderstandings.length} misunderstandings`);
    if (patternsJson.self_check) ok(`Patterns: ${patternsJson.self_check.length} self-checks`);
  }

  // Check for optional files
  const optionalFiles = ['KDNA_Scenarios.json', 'KDNA_Cases.json', 'KDNA_Reasoning.json', 'KDNA_Evolution.json'];
  for (const file of optionalFiles) {
    if (existsSync(join(domainDir, file))) {
      ok(`Optional file present: ${file}`);
    }
  }
}

// Summary
console.log(`\n=== Summary ===`);
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.log('\nValidation FAILED');
  process.exit(1);
} else {
  console.log('\nValidation PASSED');
}
