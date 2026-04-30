---
name: flutter-init
description: 'Bootstrap Flutter project implementation guidance by creating or refreshing a workspace-scoped flutter-dev skill directory. Reads pubspec.yaml, researches each plugin via documentation search and GitHub examples, auto-generates plugin constraint references under flutter-dev, and enforces strict clean architecture rules.'
argument-hint: '"create" to initialize for the first time, or "refresh" to update an existing flutter-dev skill. Optionally append the path to pubspec.yaml if it is not at the repo root.'
---

# Flutter Init

## When to Use

- Initialize a Flutter repository before feature implementation starts.
- Create or refresh the project guidance skill directory at `.claude/skills/flutter-dev/`.
- Audit plugin declarations in `pubspec.yaml` and auto-generate per-plugin constraint references.
- Enforce a strict clean architecture baseline for the project.

## Outcome

This skill generates the `.claude/skills/flutter-dev/` directory containing:

```
.claude/skills/flutter-dev/
├── SKILL.md                           # Entry point: imports all constraints, plugin index
├── _template.md                       # Template for manually adding new plugin references
└── references/
    ├── plugins/
    │   ├── <plugin-a>.md             # Auto-generated constraint reference (one per plugin)
    │   ├── <plugin-b>.md
    │   └── ...
    └── architectures/
        └── clean-feature-first.md    # Directory tree, layer rules, import boundaries
```

**Boundary**: Do NOT modify any app code, UI, CI configuration, `pubspec.yaml`, or any file outside `.claude/skills/flutter-dev/`. The only output is files under that directory.

Do not expand scope to unrelated files unless the user explicitly changes the requirement.

## Procedure

### Step 1 — Locate and Parse pubspec.yaml

Search for `pubspec.yaml` at the repo root. If not found, search one level deep (e.g. `packages/`, `apps/`).

- **Multiple found**: STOP. Ask the user which one to use before continuing.
- **None found**: STOP. Tell the user the file was not located and ask them to confirm the project path.
- **Exactly one found**: Proceed.

Read the file. Extract all dependency names from `dependencies` and `dev_dependencies`. Exclude:
- `flutter` SDK
- `flutter_test`
- `flutter_lints` and similar meta-packages
- Path-based local packages (entries with `path:`)

### Step 2 — Classify Plugins by Category

For each extracted dependency, assign a category for organization:

| Category | Includes |
|----------|----------|
| **state** | riverpod, flutter_bloc, bloc, provider, get, mobx |
| **network** | dio, http, retrofit, graphql, connectivity_plus |
| **storage** | hive, sqflite, drift, shared_preferences, isar, flutter_secure_storage |
| **navigation** | go_router, auto_route, beamer |
| **di** | get_it, injectable, kiwi, riverpod (when used as DI) |
| **serialization** | freezed, json_serializable, json_annotation, built_value |
| **ui** | flutter_svg, lottie, shimmer, cached_network_image, animations |
| **platform** | permission_handler, image_picker, file_picker, url_launcher |
| **other** | anything not matching above |

### Step 3 — Research Each Plugin (PARALLEL, ALL AT ONCE)

For **every** plugin from Step 2, launch research in parallel. Do NOT wait for one plugin to finish before starting the next.

For each plugin, spawn TWO background calls simultaneously:

**Research A — Real-world usage (librarian agent)**:
```
task(
  subagent_type="librarian",
  run_in_background=true,
  load_skills=[],
  description="Research <plugin> GitHub usage",
  prompt="
    [CONTEXT]: I am generating architecture constraint references for a Flutter project using strict clean architecture (presentation / domain / data layers). I need to define rules for the plugin '<plugin>'.
    [GOAL]: Find production usage patterns and anti-patterns for this plugin in Flutter clean architecture projects.
    [DOWNSTREAM]: I will write a constraint .md file that limits where and how this plugin can be used in the codebase.
    [REQUEST]:
    1. Search GitHub for '<plugin>' used in Flutter projects with clean architecture (BLoC, Riverpod, or Provider).
    2. Identify:
       - Primary use case: what problem does this plugin solve?
       - Architectural layer: which layer (presentation, domain, or data) does it belong in?
       - Integration pattern: direct import, through an adapter, through a repository interface?
       - Constraints (MUST): what must developers do when using this plugin?
       - Anti-patterns (MUST NOT): what common mistakes should be rejected?
       - Minimal configuration: the smallest valid setup code.
    3. Return findings in this exact format:
       USE_CASE: <one sentence>
       LAYER: presentation | domain | data
       INTEGRATION: direct | adapter | repository | DI
       MUST: <constraint>
       MUST: <constraint>
       MUST_NOT: <anti-pattern>
       MUST_NOT: <anti-pattern>
       CONFIG: <minimal Dart setup code>
       DOCS_URL: <official documentation URL if found>
    4. If no reliable patterns found, return exactly: STATUS: NOT_FOUND
  "
)
```

**Research B — Official documentation (context7)**:
```
# First resolve the library ID:
context7_resolve-library-id(libraryName="<plugin>")

# Then query the resolved ID:
context7_query-docs(
  libraryId="<resolved-id>",
  query="best practices, architecture integration patterns, anti-patterns, avoiding misuse, recommended configuration"
)
```

**After launching ALL research agents**: STOP. End your response and wait for system-reminder notifications. Do NOT proceed to Step 4 until ALL research tasks have completed.

**On receiving results**: Collect output from each agent via `background_output(task_id="...")`. Merge Research A and Research B findings for each plugin. If they conflict, prefer Context7 results (official docs) over GitHub examples.

### Step 4 — Synthesize Plugin Reference Files

For each plugin, write `.claude/skills/flutter-dev/references/plugins/<plugin>.md`.

**If research succeeded** (both LAYER and at least one constraint found):

```markdown
# <plugin-name>

> Auto-generated by flutter-init. Last update: <today's date>
> Docs: <context7 URL or official docs URL>

## Primary Use Case
<one sentence from research>

## Allowed Layer
<layer from research>

## Integration Pattern
<integration from research>

## Constraints

### Must
- <MUST constraint 1 from research>
- <MUST constraint 2 from research>

### Must Not
- <MUST_NOT anti-pattern 1 from research>
- <MUST_NOT anti-pattern 2 from research>

## Minimal Configuration
```dart
<CONFIG code from research>
```

## References
- <DOCS_URL from research>
```

**If research failed** (STATUS: NOT_FOUND, or research returned nothing useful):

```markdown
# <plugin-name>

> ⚠️ AUTO-GENERATION FAILED: No reliable usage patterns found. MANUAL REVIEW REQUIRED.

## Allowed Layer
data  (conservative default — may be incorrect)

## Integration Pattern
adapter  (default: always route through an adapter)

## Constraints

### Must
- Route all access through an adapter or repository interface. Never import this plugin directly.
- MANUAL REVIEW REQUIRED: verify the layer assignment above and add plugin-specific constraints.

### Must Not
- Do not use outside the assigned layer without explicit architecture review.

## References
- Add official documentation URL here after manual review.
```

**Naming rule**: File name must exactly match the dependency name from `pubspec.yaml` (lowercase, underscores preserved). Example: `go_router` → `go_router.md`.

### Step 5 — Generate Template File

Write `.claude/skills/flutter-dev/_template.md`:

```markdown
# _template

> Copy this file to `references/plugins/<new-plugin>.md` when adding a plugin manually.
> Then add a row to the plugin index table in `SKILL.md`.

## Primary Use Case
<!-- What problem does this plugin solve? One sentence. -->

## Allowed Layer
<!-- presentation | domain | data -->

## Integration Pattern
<!-- direct | adapter | repository | DI -->
<!-- How is this plugin accessed? What class or interface wraps it? -->

## Constraints

### Must
- <!-- constraint 1: required behavior when using this plugin -->
- <!-- constraint 2 -->

### Must Not
- <!-- anti-pattern 1: forbidden usage -->
- <!-- anti-pattern 2 -->

## Minimal Configuration
```dart
// Minimal setup or import required for this plugin
```

## References
- <!-- URL to official documentation -->
```

### Step 6 — Generate Architecture Reference

Write `.claude/skills/flutter-dev/references/architectures/clean-feature-first.md`:

```markdown
# Clean Architecture — Feature-First

## Directory Convention

\`\`\`
lib/
├── features/
│   └── <feature>/
│       ├── presentation/      # widgets, pages, state management (Bloc/Cubit/Provider)
│       ├── domain/
│       │   ├── entities/      # pure Dart classes, no framework imports
│       │   ├── usecases/      # one use case per file
│       │   └── repositories/  # abstract interfaces only — no implementations
│       └── data/
│           ├── repositories/  # concrete implementations of domain interfaces
│           ├── models/        # DTOs with fromJson/toJson
│           └── datasources/   # remote (API) and local (DB/cache)
└── core/                      # shared utilities, constants, error types, DI setup, router
\`\`\`

## Dependency Direction

```
presentation → domain ← data
```

Dependencies point inward only. Domain must have zero framework imports and zero plugin imports.

## Import Boundaries

### Per-Feature Boundaries
- No file in any feature's `domain/` may import from that feature's `data/` or `presentation/`.
- No file in any feature's `presentation/` may import from that feature's `data/` directly.
- Plugin access in `data/` must route through adapter classes or repository implementations.

### Cross-Feature Boundaries
- Features must not import from each other's `domain/`, `data/`, or `presentation/` directories.
- Cross-feature dependencies must go through `core/` or a shared domain interface extracted to `core/`.

### Core Boundaries
- `core/` must not import from any `features/` directory.

## Code Constraints

- One primary class per file. No exceptions.
- Any file exceeding 800 lines must be split along responsibility boundaries before the next commit.
## Enforcement

All of the above are mandatory. Violations must be rejected in code review. When in doubt, consult this reference before implementing.
```

### Step 7 — Generate Main flutter-dev/SKILL.md

Write `.claude/skills/flutter-dev/SKILL.md`. Build the plugin index table dynamically from the plugins identified in Step 2 and researched in Step 3:

```markdown
---
name: flutter-dev
description: 'Flutter project implementation guidance — strict clean architecture rules, per-plugin usage constraints, and mandatory file conventions. Auto-generated by flutter-init. Regenerate with: flutter-init refresh.'
---

# Flutter Development Constraints

> Auto-generated by flutter-init. Last update: <today's date>.
> Regenerate with: invoke `flutter-init` with `"refresh"`.

## How to Use

Before implementing ANY feature, read:

1. **Architecture**: [`references/architectures/clean-feature-first.md`](references/architectures/clean-feature-first.md) — directory structure, layer rules, import boundaries, code constraints.
2. **Plugins**: [`references/plugins/`](references/plugins/) — per-plugin constraint files. Find your plugin's file and read all constraints before using it.

## Architecture

→ Full rules: [`references/architectures/clean-feature-first.md`](references/architectures/clean-feature-first.md)

Summary of mandatory rules:
- Separate presentation, domain, and data layers. No cross-layer shortcuts.
- Dependency direction: presentation → domain ← data.
- Domain must have zero framework or plugin imports.
- One primary class per file.
- Files > 800 lines must be split before next commit.
## Plugin Constraint Index

→ Per-plugin detail files: [`references/plugins/`](references/plugins/)

| Plugin | Category | Layer | Integration | Reference |
|--------|----------|-------|-------------|-----------|
<!-- AUTO-GENERATED: insert one row per plugin from Step 2/3 -->
| <plugin-1> | <category> | <layer> | <integration> | [`references/plugins/<plugin-1>.md`](references/plugins/<plugin-1>.md) |
| <plugin-2> | <category> | <layer> | <integration> | [`references/plugins/<plugin-2>.md`](references/plugins/<plugin-2>.md) |
<!-- END AUTO-GENERATED -->

⚠️ Plugins showing "data (conservative default)" with a "MANUAL REVIEW REQUIRED" warning in their reference file have not been fully researched. Consult official documentation before using them.

## Adding a Plugin Manually

1. Copy `_template.md` → `references/plugins/<new-plugin>.md`
2. Fill in the template using official documentation
3. Add a row to the Plugin Constraint Index table above
4. Run `flutter-init refresh` to validate

## Regeneration

Invoke `flutter-init` with `"refresh"` to re-research all plugins from `pubspec.yaml` and regenerate all reference files. The plugin index table will be updated automatically.
```

Replace the `| <plugin-1> | ...` rows with actual entries. Omit the placeholder text entirely — only real plugin rows should appear.

### Step 8 — Present Summary and Ask for Confirmation

After all files are written, present a summary table:

```
## flutter-init Summary

**Status**: flutter-dev created (or refreshed)
**pubspec.yaml**: <path>

### Plugins Researched
| Plugin | Category | Layer | Status |
|--------|----------|-------|--------|
| dio | network | data | ✅ auto-generated |
| go_router | navigation | presentation | ✅ auto-generated |
| freezed | serialization | domain | ✅ auto-generated |
| hive | storage | data | ⚠️ needs manual review |

### Files Generated
| File | Purpose |
|------|---------|
| .claude/skills/flutter-dev/SKILL.md | Entry point + plugin index |
| .claude/skills/flutter-dev/_template.md | Template for manual additions |
| .claude/skills/flutter-dev/references/plugins/*.md | Per-plugin constraints (N files) |
| .claude/skills/flutter-dev/references/architectures/clean-feature-first.md | Architecture rules |

### Needs Manual Attention
- <list plugins marked "MANUAL REVIEW REQUIRED", or "none">

Review the generated files and adjust constraints as needed.
```

## Decision Rules

- **Plugin category ambiguous**: Classify into the most restrictive plausible category. Default to `other`.
- **Plugin layer ambiguous**: Assign to the lowest plausible layer (data). Require an adapter boundary.
- **Research results conflict between sources**: Prefer Context7 (official docs) over GitHub examples.
- **Research returns no useful results**: Use the "AUTO-GENERATION FAILED" template (see Step 4). Mark for manual review.
- **Research agent times out** (no result after 3 minutes): Proceed with whatever partial results exist. Mark plugins with zero constraints as "MANUAL REVIEW REQUIRED".
- **Multiple pubspec.yaml found**: STOP and ask user. Do NOT guess.
- **No pubspec.yaml found**: STOP and tell user. Do NOT create one.
- **flutter-dev already exists** (refresh mode): Read the existing directory structure first. Regenerate all `references/plugins/*.md` files (overwriting old research with new). Preserve any hand-edited sections in `SKILL.md` outside the auto-generated plugin index table. If unsure which sections are hand-edited, generate into a temporary location and show diff to user.
- **Existing project structure conflicts with clean architecture**: Preserve the strict rules in generated files. Add a note in the summary: "Project structure does not currently match clean architecture conventions. Rules are enforced for future work."
- **Plugin is a Dart-only package (not Flutter-specific)**: Research and generate normally. Dart packages in a Flutter project inherit the same architectural constraints.
- **User provides a custom pubspec.yaml path**: Use the provided path. Skip root-level search.

## Completion Checks

Before considering the task done, verify ALL of the following:

- [ ] `.claude/skills/flutter-dev/SKILL.md` exists and contains a non-empty plugin index table.
- [ ] `.claude/skills/flutter-dev/_template.md` exists.
- [ ] `.claude/skills/flutter-dev/references/architectures/clean-feature-first.md` exists and contains the strings "presentation", "domain", "data", and "800".
- [ ] For every plugin from pubspec.yaml, `.claude/skills/flutter-dev/references/plugins/<plugin>.md` exists and contains the sections "Allowed Layer", "Must", and "Must Not".
- [ ] All plugin reference file names match their pubspec.yaml dependency names exactly.
- [ ] No files outside `.claude/skills/flutter-dev/` were created or modified.
- [ ] Summary was presented to the user with plugin research status and manual attention items.
- [ ] Verify by reading `.claude/skills/flutter-dev/SKILL.md` — it must contain the word "must", at least one cross-reference to a `references/` file, and the phrase "one primary class per file".

## Expected Output When Invoked

Print a summary with exactly these sections in bullet form:

- **Status**: `flutter-dev created` or `flutter-dev refreshed`
- **Plugins researched**: count of plugins found, researched, and any needing manual review
- **Architecture constraints**: list the key rules encoded (presentation/domain/data separation, import boundaries, 800-line cap, one-class-per-file)
- **Files generated**: count and root path of the flutter-dev directory
- **Needs manual attention**: list of items requiring user review, or `none`