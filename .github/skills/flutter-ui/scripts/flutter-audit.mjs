#!/usr/bin/env node
/**
 * Static Flutter UI audit helper. Runs flutter analyze when available and
 * scans Dart source for common mobile/native UI risks.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const targetArg = argValue('--target') || args.find((arg) => !arg.startsWith('--')) || 'lib';
const runTests = args.includes('--test');

function main() {
  const target = path.resolve(ROOT, targetArg);
  const files = collectDartFiles(target).filter((file) => !isGenerated(file));
  const findings = [];

  for (const file of files) {
    const text = safeRead(file);
    if (!text) continue;
    findings.push(...scanFile(file, text));
  }

  const analyze = runFlutter(['analyze']);
  const tests = runTests ? runFlutter(['test']) : { skipped: true, reason: 'Pass --test to run flutter test.' };

  console.log(JSON.stringify({
    ok: true,
    target: path.relative(ROOT, target).split(path.sep).join('/'),
    scannedFiles: files.length,
    analyze,
    tests,
    findingCount: findings.length,
    findings,
    summary: summarize(findings),
  }, null, 2));
}

function scanFile(file, text) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const findings = [];
  const lines = text.split(/\r?\n/);

  checkRegex(lines, rel, /\bGestureDetector\s*\(/, 'P2', 'accessibility', 'GestureDetector used. Verify it has Semantics, focus behavior, and a visible fallback when it performs an action.', findings);
  checkRegex(lines, rel, /\bIconButton\s*\((?:(?!tooltip\s*:|semanticLabel\s*:)[\s\S])*?\)/m, 'P2', 'accessibility', 'IconButton may be missing tooltip or semantic label.', findings);
  checkRegex(lines, rel, /\bSemantics\s*\(/, 'info', 'accessibility', 'Semantics usage found. Verify labels and state are meaningful.', findings, true);
  checkRegex(lines, rel, /\bContainer\s*\(/, 'P3', 'design-system', 'Container usage found. Verify Padding, SizedBox, Align, DecoratedBox, or semantic widgets would not express intent better.', findings, true);
  checkRegex(lines, rel, /\bColor\(0x[0-9a-fA-F]+\)|Colors\.[a-zA-Z]+/, 'P2', 'theming', 'Hard-coded color usage. Prefer ColorScheme or ThemeExtension unless this is a token definition.', findings);
  checkRegex(lines, rel, /TextStyle\s*\(/, 'P2', 'typography', 'Local TextStyle usage. Prefer TextTheme or named app text styles unless this is a token definition.', findings);
  checkRegex(lines, rel, /SizedBox\s*\(\s*(width|height)\s*:\s*(?:[4-9]\d{2,}|1\d{3,})/, 'P1', 'adaptive-layout', 'Large fixed SizedBox dimension can break small screens or text scaling.', findings);
  checkRegex(lines, rel, /Column\s*\([\s\S]{0,240}children\s*:\s*\[[\s\S]{1000,}/m, 'P2', 'performance', 'Large Column children block. Consider ListView.builder, CustomScrollView, or slivers for large content.', findings);
  checkRegex(lines, rel, /FutureBuilder\s*\(\s*future\s*:\s*[^,]+\(/, 'P1', 'performance', 'Future appears to be created inline. Store it outside build to avoid repeated work.', findings);
  checkRegex(lines, rel, /setState\s*\(/, 'P3', 'performance', 'setState usage found. Verify rebuild scope is as small as practical.', findings, true);

  if (/Scaffold\s*\(/.test(text) && !/SafeArea\s*\(/.test(text) && /body\s*:/.test(text)) {
    findings.push({ severity: 'P2', category: 'adaptive-layout', file: rel, line: 1, message: 'Scaffold body without obvious SafeArea. Verify system UI, notches, and gesture areas are handled.' });
  }

  return findings.filter((finding) => finding.severity !== 'info');
}

function checkRegex(lines, file, re, severity, category, message, findings, firstOnly = false) {
  for (let index = 0; index < lines.length; index++) {
    if (re.test(lines[index])) {
      findings.push({ severity, category, file, line: index + 1, message });
      if (firstOnly) return;
    }
  }
}

function summarize(findings) {
  const bySeverity = {};
  const byCategory = {};
  for (const finding of findings) {
    bySeverity[finding.severity] = (bySeverity[finding.severity] || 0) + 1;
    byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;
  }
  return { bySeverity, byCategory };
}

function runFlutter(commandArgs) {
  try {
    const stdout = execFileSync('flutter', commandArgs, { cwd: ROOT, encoding: 'utf-8', timeout: 120_000, stdio: ['ignore', 'pipe', 'pipe'] });
    return { ok: true, command: ['flutter', ...commandArgs].join(' '), output: stdout.slice(-12000) };
  } catch (err) {
    return {
      ok: false,
      command: ['flutter', ...commandArgs].join(' '),
      error: err.message,
      stdout: String(err.stdout || '').slice(-12000),
      stderr: String(err.stderr || '').slice(-12000),
    };
  }
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

main();
