#!/usr/bin/env node
/**
 * Locate likely Flutter widget source files by class name, key, route, or text.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const query = argValue('--query') || args.find((arg) => !arg.startsWith('--'));

if (!query) {
  console.error('Usage: node flutter-widget-locate.mjs --query <widget|key|route|text>');
  process.exit(1);
}

const files = collectDartFiles(path.join(ROOT, 'lib')).filter((file) => !isGenerated(file));
const matches = [];

for (const file of files) {
  const text = safeRead(file) || '';
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.toLowerCase().includes(query.toLowerCase())) {
      matches.push({
        file: path.relative(ROOT, file).split(path.sep).join('/'),
        line: index + 1,
        excerpt: line.trim().slice(0, 240),
        score: score(line, query),
      });
    }
  }
}

matches.sort((a, b) => b.score - a.score || a.file.localeCompare(b.file));
console.log(JSON.stringify({ ok: true, query, matchCount: matches.length, matches: matches.slice(0, 50) }, null, 2));

function score(line, query) {
  let value = 0;
  if (new RegExp('class\\s+' + escapeRegex(query) + '\\b', 'i').test(line)) value += 50;
  if (new RegExp('Key\\(["\\\']' + escapeRegex(query), 'i').test(line)) value += 30;
  if (line.includes('route') || line.includes('path')) value += 10;
  if (line.includes('Text(')) value += 5;
  return value;
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

function isGenerated(filePath) {
  return /\.g\.dart$|\.freezed\.dart$|\.gr\.dart$|\.gen\.dart$/.test(filePath);
}

function safeRead(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); } catch { return null; }
}

function argValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
