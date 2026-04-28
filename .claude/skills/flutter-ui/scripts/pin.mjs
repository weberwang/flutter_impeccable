#!/usr/bin/env node
/**
 * Pin or unpin flutter-ui sub-commands as standalone skill shortcuts.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_NAME = 'flutter-ui';
const PIN_MARKER = '<!-- flutter-ui-pinned-skill -->';

const HARNESS_DIRS = [
  '.claude', '.cursor', '.gemini', '.codex', '.agents',
  '.trae', '.trae-cn', '.pi', '.opencode', '.kiro', '.rovodev', '.github',
];

const VALID_COMMANDS = [
  'craft', 'shape', 'teach', 'document', 'extract',
  'critique', 'audit', 'polish', 'adapt', 'harden', 'optimize',
  'clarify', 'typeset', 'colorize', 'layout', 'animate', 'onboard',
];

function findProjectRoot(startDir = process.cwd()) {
  let dir = resolve(startDir);
  while (dir !== '/') {
    if (existsSync(join(dir, 'package.json')) || existsSync(join(dir, '.git')) || existsSync(join(dir, 'skills-lock.json'))) {
      return dir;
    }
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return resolve(startDir);
}

function findHarnessDirs(projectRoot) {
  const dirs = [];
  for (const harness of HARNESS_DIRS) {
    const skillsDir = join(projectRoot, harness, 'skills');
    if (existsSync(join(skillsDir, SKILL_NAME))) dirs.push(skillsDir);
  }
  return dirs;
}

function loadCommandMetadata() {
  const metadataPath = join(__dirname, 'command-metadata.json');
  if (!existsSync(metadataPath)) return {};
  return JSON.parse(readFileSync(metadataPath, 'utf-8'));
}

function generatePinnedSkill(command, metadata) {
  const desc = metadata[command]?.description || `Shortcut for /${SKILL_NAME} ${command}.`;
  const hint = metadata[command]?.argumentHint || '[target]';
  return `---
name: ${command}
description: "${desc.replace(/"/g, '\\"')}"
argument-hint: "${hint.replace(/"/g, '\\"')}"
user-invocable: true
---

${PIN_MARKER}

This is a pinned shortcut for \`{{command_prefix}}${SKILL_NAME} ${command}\`.

Invoke {{command_prefix}}${SKILL_NAME} ${command}, passing along any arguments provided here, and follow its instructions.
`;
}

function pin(command, projectRoot) {
  const metadata = loadCommandMetadata();
  const harnessDirs = findHarnessDirs(projectRoot);
  if (harnessDirs.length === 0) {
    console.log(`No harness directories with ${SKILL_NAME} installed found.`);
    return false;
  }

  const content = generatePinnedSkill(command, metadata);
  let created = 0;
  for (const skillsDir of harnessDirs) {
    const skillDir = join(skillsDir, command);
    const skillMd = join(skillDir, 'SKILL.md');
    if (existsSync(skillMd) && !readFileSync(skillMd, 'utf-8').includes(PIN_MARKER)) {
      console.log(`  SKIP: ${skillDir} (non-pinned skill already exists)`);
      continue;
    }
    mkdirSync(skillDir, { recursive: true });
    writeFileSync(skillMd, content, 'utf-8');
    console.log(`  + ${skillDir}`);
    created++;
  }
  if (created > 0) console.log(`\nPinned '${command}' as a standalone shortcut in ${created} location(s).`);
  return created > 0;
}

function unpin(command, projectRoot) {
  const harnessDirs = findHarnessDirs(projectRoot);
  let removed = 0;
  for (const skillsDir of harnessDirs) {
    const skillDir = join(skillsDir, command);
    const skillMd = join(skillDir, 'SKILL.md');
    if (!existsSync(skillMd)) continue;
    if (!readFileSync(skillMd, 'utf-8').includes(PIN_MARKER)) {
      console.log(`  SKIP: ${skillDir} (not a pinned skill)`);
      continue;
    }
    rmSync(skillDir, { recursive: true, force: true });
    console.log(`  - ${skillDir}`);
    removed++;
  }
  console.log(removed > 0 ? `\nUnpinned '${command}' from ${removed} location(s).` : `No pinned '${command}' shortcut found.`);
  return removed > 0;
}

const [,, action, command] = process.argv;
if (!action || !command) {
  console.log('Usage: node pin.mjs <pin|unpin> <command>');
  console.log(`\nAvailable commands: ${VALID_COMMANDS.join(', ')}`);
  process.exit(1);
}
if (action !== 'pin' && action !== 'unpin') {
  console.error(`Unknown action: ${action}. Use 'pin' or 'unpin'.`);
  process.exit(1);
}
if (!VALID_COMMANDS.includes(command)) {
  console.error(`Unknown command: ${command}`);
  console.error(`Available commands: ${VALID_COMMANDS.join(', ')}`);
  process.exit(1);
}

const root = findProjectRoot();
if (action === 'pin') pin(command, root);
else unpin(command, root);
