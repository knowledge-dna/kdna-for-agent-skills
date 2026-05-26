#!/usr/bin/env node

/**
 * validate-cluster.mjs — Validate the coding_agent cluster against KDNA SPEC.
 *
 * Checks:
 * 1. cluster.json exists and is valid JSON
 * 2. Each dev source workspace exists
 * 3. Each active domain has kdna.json with required fields
 * 4. Each KDNA_*.json has meta object with version/domain/created/purpose/load_condition
 * 5. meta.domain matches directory name
 * 6. KDNA_Core.json has required fields: axioms, ontology, frameworks, core_structure, stances
 * 7. KDNA_Patterns.json has required fields: terminology, misunderstandings, self_check
 * 8. banned_terms each have why and replace_with
 * 9. misunderstandings each have key_distinction
 * 10. self_check items are yes/no answerable
 * 11. No more than 6 KDNA JSON files per domain (excluding kdna.json)
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLUSTER_DIR = join(__dirname, '..', 'clusters', 'coding_agent');
const CLUSTER_PATH = join(CLUSTER_DIR, 'cluster.json');

const KDNA_FILE_PREFIX = 'KDNA_';
const MAX_KDNA_FILES = 6;

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

// Check if a self_check item is yes/no answerable
function isYesNoAnswerable(check) {
  if (typeof check !== 'string') return false;
  const c = check.trim();
  // Should start with: Can, Does, Is, Am, Have, Will, Should, Did, Would, Could, Are, Has, Do
  return /^(Can|Does|Is|Am|Have|Will|Should|Did|Would|Could|Are|Has|Do)\b/i.test(c);
}

// Validate meta object in a KDNA file
function validateMeta(json, filePath, expectedDomain) {
  if (!json.meta || typeof json.meta !== 'object') {
    error(`${filePath}: Missing "meta" object at root`);
    return false;
  }

  const requiredMetaFields = ['version', 'domain', 'created', 'purpose', 'load_condition'];
  let valid = true;

  for (const field of requiredMetaFields) {
    if (!json.meta[field]) {
      error(`${filePath}: meta missing "${field}"`);
      valid = false;
    }
  }

  if (json.meta.domain && json.meta.domain !== expectedDomain) {
    error(`${filePath}: meta.domain "${json.meta.domain}" doesn't match directory "${expectedDomain}"`);
    valid = false;
  }

  // Check for stale root-level fields that should be in meta
  const staleFields = ['version', 'domain', 'created', 'purpose', 'load_condition'];
  for (const field of staleFields) {
    if (json[field] !== undefined) {
      error(`${filePath}: "${field}" found at root level — must be inside "meta"`);
      valid = false;
    }
  }

  return valid;
}

// Validate banned_terms structure
function validateBannedTerms(terminology, filePath) {
  if (!terminology || !terminology.banned_terms || !Array.isArray(terminology.banned_terms)) return;

  for (let i = 0; i < terminology.banned_terms.length; i++) {
    const bt = terminology.banned_terms[i];
    if (!bt.why) {
      error(`${filePath}: banned_terms[${i}] "${bt.term}" missing "why"`);
    }
    if (!bt.replace_with) {
      error(`${filePath}: banned_terms[${i}] "${bt.term}" missing "replace_with"`);
    }
  }
}

// Validate misunderstandings structure
function validateMisunderstandings(misunderstandings, filePath) {
  if (!misunderstandings || !Array.isArray(misunderstandings)) return;

  for (let i = 0; i < misunderstandings.length; i++) {
    const ms = misunderstandings[i];
    if (!ms.key_distinction) {
      error(`${filePath}: misunderstandings[${i}] "${ms.id || i}" missing "key_distinction"`);
    }
    if (!ms.wrong) {
      error(`${filePath}: misunderstandings[${i}] "${ms.id || i}" missing "wrong"`);
    }
    if (!ms.correct) {
      error(`${filePath}: misunderstandings[${i}] "${ms.id || i}" missing "correct"`);
    }
  }
}

// Validate self_check structure
function validateSelfCheck(selfCheck, filePath) {
  if (!selfCheck || !Array.isArray(selfCheck)) return;

  for (let i = 0; i < selfCheck.length; i++) {
    if (!isYesNoAnswerable(selfCheck[i])) {
      warn(`${filePath}: self_check[${i}] may not be yes/no answerable: "${selfCheck[i].substring(0, 60)}..."`);
    }
  }
}

// 1. Validate cluster.json
console.log('\n=== Validating cluster.json ===');
const cluster = loadJSON(CLUSTER_PATH);
if (!cluster) {
  error('cluster.json not found or invalid');
  process.exit(1);
}

if (!cluster.name) error('Missing "name" field');
else ok(`Name: ${cluster.name}`);
if (cluster.version) ok(`Version: ${cluster.version}`);
else error('Missing "version" field');

const domainList = cluster.domains || cluster.packages || [];
if (!Array.isArray(domainList) || domainList.length === 0) error('Missing "domains" or "packages" array');
else ok(`Found ${domainList.length} domains/packages`);

// 2. Validate each domain
for (const domainEntry of domainList) {
  const domainName = domainEntry.domain || domainEntry.id;
  const domainDir = domainEntry.skills_dir
    ? join(CLUSTER_DIR, domainEntry.skills_dir)
    : join(CLUSTER_DIR, domainName);

  console.log(`\n=== Validating domain: ${domainName} (${domainEntry.status || domainEntry.role || 'active'}) ===`);

  if (!existsSync(domainDir)) {
    if (domainEntry.status === 'planned') {
      ok('Planned domain — skipping');
      continue;
    }
    error(`Domain directory not found: ${domainDir}`);
    continue;
  }

  if (domainEntry.status === 'planned') {
    warn('Planned domain has directory — consider implementing or removing');
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
    if (kdnaJson.name && kdnaJson.name !== domainName) error(`kdna.json name "${kdnaJson.name}" doesn't match directory "${domainName}"`);
    if (kdnaJson.name) ok(`kdna.json valid (${kdnaJson.kdna_spec}, ${kdnaJson.status})`);
  }

  // 11. Check max KDNA files
  const kdnaFiles = readdirSync(domainDir).filter(f => f.startsWith(KDNA_FILE_PREFIX) && f.endsWith('.json'));
  if (kdnaFiles.length > MAX_KDNA_FILES) {
    error(`Too many KDNA files: ${kdnaFiles.length} (max ${MAX_KDNA_FILES})`);
  } else {
    ok(`${kdnaFiles.length} KDNA files (max ${MAX_KDNA_FILES})`);
  }

  // 4-10. Validate each KDNA file
  for (const file of kdnaFiles) {
    const filePath = join(domainDir, file);
    const json = loadJSON(filePath);
    if (!json) continue;

    // Validate meta
    const metaValid = validateMeta(json, `${domainName}/${file}`, domainName);

    if (!metaValid) continue;

    ok(`${file}: meta valid`);

    // File-specific validation
    if (file === 'KDNA_Core.json') {
      const requiredCore = ['axioms', 'ontology', 'frameworks', 'core_structure', 'stances'];
      for (const field of requiredCore) {
        if (!json[field]) error(`KDNA_Core.json missing "${field}"`);
      }
      if (json.axioms) ok(`Core: ${json.axioms.length} axioms`);
      if (json.ontology) ok(`Core: ${json.ontology.length} ontology terms`);
      if (json.stances) ok(`Core: ${json.stances.length} stances`);
    }

    if (file === 'KDNA_Patterns.json') {
      const requiredPatterns = ['terminology', 'misunderstandings', 'self_check'];
      for (const field of requiredPatterns) {
        if (!json[field]) error(`KDNA_Patterns.json missing "${field}"`);
      }

      // 8. Validate banned_terms
      validateBannedTerms(json.terminology, `${domainName}/KDNA_Patterns.json`);

      // 9. Validate misunderstandings
      validateMisunderstandings(json.misunderstandings, `${domainName}/KDNA_Patterns.json`);

      // 10. Validate self_check
      validateSelfCheck(json.self_check, `${domainName}/KDNA_Patterns.json`);

      if (json.terminology?.standard_terms) ok(`Patterns: ${json.terminology.standard_terms.length} standard terms`);
      if (json.terminology?.banned_terms) ok(`Patterns: ${json.terminology.banned_terms.length} banned terms`);
      if (json.misunderstandings) ok(`Patterns: ${json.misunderstandings.length} misunderstandings`);
      if (json.self_check) ok(`Patterns: ${json.self_check.length} self-checks`);
    }

    if (file === 'KDNA_Scenarios.json') {
      if (json.scenes) ok(`Scenarios: ${json.scenes.length} scenes`);
    }

    if (file === 'KDNA_Cases.json') {
      if (json.cases) ok(`Cases: ${json.cases.length} cases`);
    }

    if (file === 'KDNA_Reasoning.json') {
      if (json.reasoning_chains) ok(`Reasoning: ${json.reasoning_chains.length} chains`);
    }

    if (file === 'KDNA_Evolution.json') {
      if (json.stages) ok(`Evolution: ${json.stages.length} stages`);
      if (json.measurement) ok(`Evolution: ${json.measurement.length} measurements`);
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
