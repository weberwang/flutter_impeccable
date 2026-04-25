#!/usr/bin/env node
/**
 * Extract Flutter theme signals from Dart files and pubspec.yaml.
 * This is a lightweight scanner, not a Dart AST parser.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function main() {
  const dartFiles = collectDartFiles(path.join(ROOT, 'lib')).filter((file) => !isGenerated(file));
  const pubspec = safeRead(path.join(ROOT, 'pubspec.yaml')) || '';
  const themeFiles = dartFiles.filter((file) => /(^|[/\\])(theme|themes|design|style|styles)([/\\]|\.)|theme/i.test(file));
  const scanFiles = themeFiles.length > 0 ? themeFiles : dartFiles;

  const colors = new Map();
  const textThemes = [];
  const themeDataFiles = [];
  const componentThemes = [];
  const themeExtensions = [];

  for (const file of scanFiles) {
    const text = safeRead(file) || '';
    const rel = relPath(file);
    if (/\bThemeData\s*\(/.test(text)) themeDataFiles.push(rel);
    if (/\bTextTheme\s*\(/.test(text)) textThemes.push(rel);
    if (/\bThemeExtension\b/.test(text)) themeExtensions.push(rel);

    for (const match of text.matchAll(/\bColor\(0x([0-9a-fA-F]{8})\)/g)) {
      colors.set('#' + match[1].slice(2).toUpperCase(), rel);
    }
    for (const match of text.matchAll(/\bColors\.([a-zA-Z0-9_]+)/g)) {
      colors.set('Colors.' + match[1], rel);
    }
    for (const match of text.matchAll(/\b([A-Za-z]+ThemeData)\s*\(/g)) {
      componentThemes.push({ type: match[1], file: rel });
    }
  }

  console.log(JSON.stringify({
    ok: true,
    pubspec: parsePubspec(pubspec),
    themeFiles: themeFiles.map(relPath),
    themeDataFiles,
    textThemeFiles: [...new Set(textThemes)],
    themeExtensionFiles: [...new Set(themeExtensions)],
    colors: [...colors.entries()].map(([value, file]) => ({ value, file })),
    componentThemes: uniqueObjects(componentThemes).slice(0, 100),
  }, null, 2));
}

function parsePubspec(pubspec) {
  return {
    packageName: matchFirst(pubspec, /^name:\s*(.+)$/m),
    fonts: parseFonts(pubspec),
    assets: parseAssets(pubspec),
  };
}

function parseFonts(pubspec) {
  const fonts = [];
  for (const match of pubspec.matchAll(/^\s{4}family:\s*(.+)$/gm)) {
    fonts.push(match[1].trim().replace(/^['"]|['"]$/g, ''));
  }
  return fonts;
}

function parseAssets(pubspec) {
  const assets = [];
  const lines = pubspec.split(/\r?\n/);
  let inAssets = false;
  for (const line of lines) {
    if (/^\s{2}assets:\s*$/.test(line)) { inAssets = true; continue; }
    if (inAssets && /^\s{2}\S/.test(line)) break;
    const match = inAssets ? line.match(/^\s{4}-\s*(.+)$/) : null;
    if (match) assets.push(match[1].trim());
  }
  return assets;
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

function uniqueObjects(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isGenerated(filePath) {
  return /\.g\.dart$|\.freezed\.dart$|\.gr\.dart$|\.gen\.dart$/.test(filePath);
}

function safeRead(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); } catch { return null; }
}

function matchFirst(text, re) {
  const match = text.match(re);
  return match ? match[1].trim() : null;
}

function relPath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

main();
