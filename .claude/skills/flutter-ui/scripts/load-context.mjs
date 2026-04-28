#!/usr/bin/env node
/**
 * Load product, design, and Flutter project context for flutter-ui commands.
 */

import fs from 'node:fs';
import path from 'node:path';

const PRODUCT_NAMES = ['PRODUCT.md', 'Product.md', 'product.md'];
const DESIGN_NAMES = ['DESIGN.md', 'Design.md', 'design.md'];
const LEGACY_NAMES = ['.impeccable.md'];

export function loadContext(cwd = process.cwd()) {
  let migrated = false;
  let productPath = firstExisting(cwd, PRODUCT_NAMES);

  if (!productPath) {
    const legacyPath = firstExisting(cwd, LEGACY_NAMES);
    if (legacyPath) {
      const nextPath = path.join(cwd, 'PRODUCT.md');
      try {
        fs.renameSync(legacyPath, nextPath);
        productPath = nextPath;
        migrated = true;
      } catch {
        productPath = legacyPath;
      }
    }
  }

  const designPath = firstExisting(cwd, DESIGN_NAMES);
  const flutter = detectFlutter(cwd);

  return {
    hasProduct: Boolean(productPath),
    product: productPath ? safeRead(productPath) : null,
    productPath: productPath ? rel(cwd, productPath) : null,
    hasDesign: Boolean(designPath),
    design: designPath ? safeRead(designPath) : null,
    designPath: designPath ? rel(cwd, designPath) : null,
    migrated,
    flutter,
  };
}

function detectFlutter(cwd) {
  const pubspecPath = path.join(cwd, 'pubspec.yaml');
  const pubspec = safeRead(pubspecPath);
  const libPath = path.join(cwd, 'lib');
  const testPath = path.join(cwd, 'test');
  const integrationTestPath = path.join(cwd, 'integration_test');

  const dartFiles = fs.existsSync(libPath) ? findFiles(libPath, '.dart', 200) : [];
  const themeFiles = dartFiles.filter((file) => /(^|[/\\])(theme|themes|design|style|styles)([/\\]|\.)|theme/i.test(file));
  const localizationFiles = [
    ...findFiles(cwd, '.arb', 100),
    ...['l10n.yaml'].map((name) => path.join(cwd, name)).filter(fs.existsSync),
  ];
  const generatedFiles = dartFiles.filter((file) => /\.g\.dart$|\.freezed\.dart$|\.gr\.dart$|\.gen\.dart$/.test(file));

  return {
    isFlutterProject: Boolean(pubspec && /\bflutter\s*:/m.test(pubspec)),
    hasPubspec: Boolean(pubspec),
    pubspecPath: pubspec ? 'pubspec.yaml' : null,
    packageName: pubspec ? matchFirst(pubspec, /^name:\s*(.+)$/m) : null,
    hasLib: fs.existsSync(libPath),
    hasTest: fs.existsSync(testPath),
    hasIntegrationTest: fs.existsSync(integrationTestPath),
    dartFileCount: dartFiles.length,
    sampleDartFiles: dartFiles.slice(0, 25).map((file) => rel(cwd, file)),
    themeFiles: themeFiles.slice(0, 25).map((file) => rel(cwd, file)),
    localizationFiles: localizationFiles.slice(0, 25).map((file) => rel(cwd, file)),
    generatedFiles: generatedFiles.slice(0, 25).map((file) => rel(cwd, file)),
    dependencies: pubspec ? parseDependencies(pubspec) : [],
  };
}

function parseDependencies(pubspec) {
  const deps = [];
  const lines = pubspec.split(/\r?\n/);
  let inDeps = false;
  for (const line of lines) {
    if (/^(dependencies|dev_dependencies):\s*$/.test(line)) {
      inDeps = true;
      continue;
    }
    if (inDeps && /^\S/.test(line)) break;
    const match = line.match(/^\s{2}([a-zA-Z0-9_]+):/);
    if (inDeps && match) deps.push(match[1]);
  }
  return deps;
}

function firstExisting(cwd, names) {
  for (const name of names) {
    const abs = path.join(cwd, name);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

function findFiles(root, ext, limit) {
  const out = [];
  const skip = new Set(['.git', '.dart_tool', 'build', '.idea', '.vscode', 'ios', 'android', 'macos', 'windows', 'linux']);
  function walk(dir) {
    if (out.length >= limit) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (out.length >= limit) break;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!skip.has(entry.name)) walk(abs);
      } else if (entry.isFile() && entry.name.endsWith(ext)) {
        out.push(abs);
      }
    }
  }
  walk(root);
  return out;
}

function safeRead(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); } catch { return null; }
}

function matchFirst(text, re) {
  const match = text.match(re);
  return match ? match[1].trim() : null;
}

function rel(cwd, filePath) {
  return path.relative(cwd, filePath).split(path.sep).join('/');
}

function cli() {
  console.log(JSON.stringify(loadContext(process.cwd()), null, 2));
}

const running = process.argv[1];
if (running?.endsWith('load-context.mjs') || running?.endsWith('load-context.mjs/')) {
  cli();
}
