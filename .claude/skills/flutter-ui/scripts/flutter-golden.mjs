#!/usr/bin/env node
/**
 * Discover Flutter golden test signals.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const testFiles = collectDartFiles(path.join(ROOT, 'test'));
const hits = [];

for (const file of testFiles) {
  const text = safeRead(file) || '';
  if (/matchesGoldenFile|goldenToolkit|multiScreenGolden|screenMatchesGolden|GoldenBuilder/.test(text)) {
    hits.push({ file: rel(file), signals: extractSignals(text) });
  }
}

console.log(JSON.stringify({
  ok: true,
  hasGoldenTests: hits.length > 0,
  goldenFileCount: hits.length,
  files: hits.slice(0, 100),
}, null, 2));

function extractSignals(text) {
  const signals = [];
  for (const token of ['matchesGoldenFile', 'goldenToolkit', 'multiScreenGolden', 'screenMatchesGolden', 'GoldenBuilder']) {
    if (text.includes(token)) signals.push(token);
  }
  return signals;
}

function collectDartFiles(start) {
  const out = [];
  function walk(filePath) {
    let stat;
    try { stat = fs.statSync(filePath); } catch { return; }
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(filePath, { withFileTypes: true })) {
        if (['.git', '.dart_tool', 'build'].includes(entry.name)) continue;
        walk(path.join(filePath, entry.name));
      }
    } else if (stat.isFile() && filePath.endsWith('.dart')) {
      out.push(filePath);
    }
  }
  walk(start);
  return out;
}

function safeRead(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); } catch { return null; }
}

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}
