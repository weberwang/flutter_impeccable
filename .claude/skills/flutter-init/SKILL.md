---
name: flutter-init
description: 'Bootstrap Flutter project implementation guidance by creating or refreshing a workspace-scoped flutter-dev skill. Use when initializing a Flutter repo, auditing plugin configuration from pubspec.yaml, mapping plugin best practices and use cases, and enforcing strict clean architecture rules before implementation starts.'
argument-hint: '"create" to initialize for the first time, or "refresh" to update an existing flutter-dev skill. Optionally append the path to pubspec.yaml if it is not at the repo root.'
---

# Flutter Init

## When to Use

- Initialize a Flutter repository before feature implementation starts.
- Create or refresh the project guidance skill named flutter-dev.
- Audit plugin declarations in pubspec.yaml and turn them into strict usage rules.
- Enforce a strict clean architecture baseline for the project.

## Outcome

This skill exists to run the skill-creation workflow for a project-scoped flutter-dev skill.

The generated flutter-dev skill must do all of the following:

- inspect the Flutter project's plugin configuration from pubspec.yaml
- organize each plugin's best-practice usage and supported use cases
- convert those findings into mandatory implementation rules
- require a strict clean architecture structure for all project work
- define explicit clean architecture directory conventions in flutter-dev to prevent later structural drift
- require one primary class per file so file responsibility stays singular
- require files longer than 800 lines to be split into smaller files by responsibility

Do not expand scope to unrelated files unless the user explicitly changes the requirement.

## Procedure

1. Constrain the task.
   Work only on generating or updating the workspace-scoped flutter-dev skill at .claude/skills/flutter-dev/SKILL.md. Do not modify app code, UI, CI, or other documentation.

2. Gather only the minimum project context needed.
   Look for pubspec.yaml at the repo root first. If not found there, search one level deep (e.g. packages/, apps/). If multiple are found, STOP and ask the user which one to use before continuing. If pubspec.yaml is not found at all, STOP and tell the user the file was not located, then ask them to confirm the project path. Treat pubspec.yaml as the source of truth for this initialization pass. Do not broaden the audit into other files unless the user explicitly asks.

3. Run the [skill-creator] command.
   Invoke [skill-creator] to generate flutter-dev as a project implementation guidance skill, not as a general checklist. Pass the target path .claude/skills/flutter-dev/SKILL.md explicitly so the file is written directly without further prompting. The file created in this step is a skeleton. Steps 4 and 5 fill its content. Do not attempt to populate plugin rules or architecture rules during this step.

4. Encode plugin governance into flutter-dev.
   For each plugin found in pubspec.yaml, document:
   - the primary use case
   - the allowed architectural layer
   - the preferred integration pattern
   - misuse or anti-patterns to reject

5. Encode strict clean architecture rules into flutter-dev.
   Add the following mandatory rules:
   - Separate presentation, domain, and data layers. No cross-layer shortcuts.
   - Dependency direction must point inward only: presentation → domain ← data.
   - Framework and plugin code must not appear in domain entities or use cases.
   - Plugin access must route through adapters, gateways, or repository implementations.
   - One primary class per file. No exceptions.
   - Any file exceeding 800 lines must be split along responsibility boundaries before the next commit.

   The directory convention written into flutter-dev must follow a feature-first structure. Each feature owns its own presentation, domain, and data layers. Shared cross-feature code lives in core/.

   ```
   lib/
   ├── features/
   │   └── <feature>/
   │       ├── presentation/      # widgets, pages, state management (Bloc/Cubit/Provider)
   │       ├── domain/
   │       │   ├── entities/      # pure Dart classes, no framework imports
   │       │   ├── usecases/      # one use case per file
   │       │   └── repositories/  # abstract interfaces only — no implementations here
   │       └── data/
   │           ├── repositories/  # concrete implementations of domain interfaces
   │           ├── models/        # DTOs with fromJson/toJson
   │           └── datasources/   # remote (API) and local (DB/cache)
   └── core/                      # shared utilities, constants, error types, DI setup, router

   test/ must mirror lib/ structure exactly (test/features/<feature>/...).
   ```

   Enforce these import boundaries in flutter-dev:
   - No file in any feature's domain/ may import from that feature's data/ or presentation/.
   - No file in any feature's presentation/ may import from that feature's data/ directly.
   - Features must not import from each other's domain/, data/, or presentation/. Cross-feature dependencies must go through core/ or a shared domain interface.
   - core/ must not import from any feature.

6. Make the guidance enforceable.
   Prefer mandatory wording such as must, must not, and only when. Reject broad advice that cannot be checked during implementation. The generated skill should force feature work to declare affected layers, target directories, repository contracts, use cases, DTOs, mappers, and state flow when relevant.

7. Validate the generated flutter-dev skill.
   Confirm the folder name matches the skill name, the description is keyword-rich for Flutter and clean architecture discovery, and the body contains procedures, decision points, and completion checks.

## Decision Rules

- If a plugin can live in more than one layer, choose the highest boundary that preserves dependency inversion and architectural isolation.
- If plugin usage is unclear, classify it conservatively and require an adapter boundary before application code can depend on it.
- If the existing project structure conflicts with strict clean architecture, preserve the architecture rule in flutter-dev, define the target directory convention explicitly, and note the mismatch without relaxing the rule.
- If flutter-dev already exists at .claude/skills/flutter-dev/SKILL.md, read it first, then merge the updated plugin governance and architecture rules into the existing content. Do not silently overwrite content that is not being changed by this initialization pass.

## Completion Checks

- flutter-dev is created or updated at .claude/skills/flutter-dev/SKILL.md.
- pubspec.yaml plugin declarations were reviewed for this initialization pass.
- Each relevant plugin has an allowed use case and integration boundary.
- Strict clean architecture rules and directory conventions are explicit and mandatory.
- flutter-dev explicitly requires one primary class per file.
- flutter-dev explicitly caps file length at 800 lines before requiring a split.
- No unrelated files were changed.
- Verify by reading .claude/skills/flutter-dev/SKILL.md and confirming it contains the word "must", at least one plugin entry or a note that none were found, and the strings "lib/presentation", "lib/domain", "lib/data".

## Expected Output When Invoked

Print a bullet list with exactly four items:
- **Status**: "flutter-dev created" or "flutter-dev refreshed"
- **Plugins identified**: list plugin names grouped by category (state, network, storage, etc.), or "none beyond Flutter defaults"
- **Architecture constraints added**: list the layer names and directory paths written into flutter-dev
- **Assumptions pending confirmation**: list any items that could not be resolved from pubspec.yaml alone, or "none"