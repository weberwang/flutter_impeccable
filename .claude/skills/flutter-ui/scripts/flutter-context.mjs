#!/usr/bin/env node
/**
 * Inspect a Flutter project and print compact JSON context for agents.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MAX_FILES = 500;

function main() {
  const pubspec = read('pubspec.yaml');
  const dartFiles = listFiles('lib', '.dart', MAX_FILES);
  const testFiles = listFiles('test', '.dart', MAX_FILES);
  const integrationFiles = listFiles('integration_test', '.dart', MAX_FILES);

  const mainFiles = dartFiles.filter((file) => /(^|\/)main[^/]*\.dart$/.test(file));
  const themeFiles = dartFiles.filter((file) => /(^|\/)(theme|themes|design|style|styles)(\/|\.)|theme/i.test(file));
  const localizationFiles = [
    ...listFiles('.', '.arb', 200),
    ...(exists('l10n.yaml') ? ['l10n.yaml'] : []),
  ];
  const generatedFiles = dartFiles.filter((file) => /\.g\.dart$|\.freezed\.dart$|\.gr\.dart$|\.gen\.dart$/.test(file));

  const sourceSample = dartFiles.slice(0, 80).map((file) => ({
    file,
    signals: scanDart(read(file) || ''),
  })).filter((entry) => Object.values(entry.signals).some(Boolean));

  const result = {
    ok: true,
    isFlutterProject: Boolean(pubspec && /\bflutter\s*:/m.test(pubspec)),
    packageName: pubspec ? matchFirst(pubspec, /^name:\s*(.+)$/m) : null,
    dependencies: pubspec ? parseDependencies(pubspec) : [],
    hasAnalysisOptions: exists('analysis_options.yaml'),
    hasL10n: localizationFiles.length > 0,
    mainFiles,
    themeFiles: themeFiles.slice(0, 50),
    dartFileCount: dartFiles.length,
    testFileCount: testFiles.length,
    integrationTestFileCount: integrationFiles.length,
    generatedFiles: generatedFiles.slice(0, 50),
    localizationFiles: localizationFiles.slice(0, 50),
    sourceSignals: summarizeSignals(sourceSample),
    sourceSample: sourceSample.slice(0, 30),
  };

  console.log(JSON.stringify(result, null, 2));
}

function scanDart(text) {
  return {
    materialApp: /\bMaterialApp\s*\(/.test(text),
    cupertinoApp: /\bCupertinoApp\s*\(/.test(text),
    themeData: /\bThemeData\s*\(/.test(text),
    colorScheme: /\bColorScheme\b/.test(text),
    textTheme: /\bTextTheme\b/.test(text),
    themeExtension: /\bThemeExtension\b/.test(text),
    semantics: /\bSemantics\s*\(/.test(text),
    safeArea: /\bSafeArea\s*\(/.test(text),
    layoutBuilder: /\bLayoutBuilder\s*\(/.test(text),
    mediaQuery: /\bMediaQuery\b/.test(text),
    navigationRail: /\bNavigationRail\s*\(/.test(text),
    navigationBar: /\bNavigationBar\s*\(/.test(text),
    goRouter: /\bGoRouter\s*\(/.test(text),
  };
}

function summarizeSignals(entries) {
  const summary = {};
  for (const entry of entries) {
    for (const [key, value] of Object.entries(entry.signals)) {
      if (!value) continue;
      summary[key] = (summary[key] || 0) + 1;
    }
  }
  return summary;
}

function parseDependencies(pubspec) {
  const deps = [];
  const lines = pubspec.split(/\r?\n/);
  let section = null;
  for (const line of lines) {
    const sectionMatch = line.match(/^(dependencies|dev_dependencies):\s*$/);
    if (sectionMatch) {
      section = sectionMatch[1];
      continue;
    }
    if (section && /^\S/.test(line)) section = null;
    const depMatch = section ? line.match(/^\s{2}([a-zA-Z0-9_]+):/) : null;
    if (depMatch) deps.push({ name: depMatch[1], section });
  }
  return deps;
}

function listFiles(relDir, ext, limit) {
  const out = [];
  const start = path.join(ROOT, relDir);
  const skip = new Set(['.git', '.dart_tool', 'build', '.idea', '.vscode']);
  function walk(dir) {
    if (out.length >= limit) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (out.length >= limit) return;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!skip.has(entry.name)) walk(abs);
      } else if (entry.isFile() && entry.name.endsWith(ext)) {
        out.push(path.relative(ROOT, abs).split(path.sep).join('/'));
      }
    }
  }
  walk(start);
  return out;
}

function read(relPath) {
  try { return fs.readFileSync(path.join(ROOT, relPath), 'utf-8'); } catch { return null; }
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function matchFirst(text, re) {
  const match = text.match(re);
  return match ? match[1].trim() : null;
}

main();
