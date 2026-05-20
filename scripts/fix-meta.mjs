#!/usr/bin/env node

/**
 * fix-meta.mjs — Batch fix KDNA JSON files to wrap root fields in meta object.
 *
 * Moves: version, domain, created, purpose, load_condition
 * From root level into a "meta" object.
 * Also fixes date from 2025 to 2026.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLUSTERS_DIR = join(__dirname, '..', 'clusters');

const META_FIELDS = ['version', 'domain', 'created', 'purpose', 'load_condition'];

function findKdnaFiles(dir) {
  const results = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...findKdnaFiles(fullPath));
    } else if (entry.startsWith('KDNA_') && entry.endsWith('.json')) {
      results.push(fullPath);
    }
  }

  return results;
}

function fixFile(filePath) {
  let json;
  try {
    json = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.error(`  SKIP (invalid JSON): ${filePath}`);
    return false;
  }

  // Check if already has meta
  if (json.meta && typeof json.meta === 'object') {
    // Verify meta is complete
    let needsFix = false;
    for (const field of META_FIELDS) {
      if (json[field] !== undefined) {
        // Root field exists alongside meta — merge into meta, remove from root
        json.meta[field] = json[field];
        delete json[field];
        needsFix = true;
      }
    }
    if (needsFix) {
      writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
      console.log(`  FIXED (merged root into meta): ${filePath}`);
      return true;
    }
    console.log(`  OK (already has meta): ${filePath}`);
    return false;
  }

  // No meta — extract root fields into meta
  const meta = {};
  for (const field of META_FIELDS) {
    if (json[field] !== undefined) {
      meta[field] = json[field];
      delete json[field];
    }
  }

  // Fix date: 2025 -> 2026
  if (meta.created && meta.created.startsWith('2025-')) {
    meta.created = meta.created.replace('2025-', '2026-');
  }

  // Insert meta at the beginning
  const newJson = { meta };
  for (const key of Object.keys(json)) {
    newJson[key] = json[key];
  }

  writeFileSync(filePath, JSON.stringify(newJson, null, 2) + '\n', 'utf-8');
  console.log(`  FIXED (added meta): ${filePath}`);
  return true;
}

// Main
const files = findKdnaFiles(CLUSTERS_DIR);
console.log(`Found ${files.length} KDNA files to check.\n`);

let fixed = 0;
for (const file of files) {
  if (fixFile(file)) fixed++;
}

console.log(`\nFixed ${fixed} of ${files.length} files.`);
