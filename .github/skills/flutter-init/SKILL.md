---
name: flutter-init
description: 'Bootstrap Flutter project implementation guidance by creating or refreshing a workspace-scoped flutter-dev skill. Use when initializing a Flutter repo, auditing plugin configuration from pubspec.yaml, mapping plugin best practices and use cases, and enforcing strict clean architecture rules before implementation starts.'
argument-hint: 'Describe the Flutter project context and whether to create or refresh the flutter-dev guidance skill.'
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

Do not expand scope to unrelated files unless the user explicitly changes the requirement.

## Procedure

1. Constrain the task.
   Work only on generating or updating the workspace-scoped flutter-dev skill at .github/skills/flutter-dev/SKILL.md. Do not modify app code, UI, CI, or other documentation.

2. Gather only the minimum project context needed.
   Confirm the repository is a Flutter project and inspect pubspec.yaml for plugin declarations. Treat pubspec.yaml as the source of truth for this initialization pass. Do not broaden the audit into other files unless the user explicitly asks.

3. Run the create-skill workflow.
   Use the create-skill prompt or equivalent skill-creation workflow to generate flutter-dev as a project implementation guidance skill, not as a general checklist.

4. Encode plugin governance into flutter-dev.
   For each plugin found in pubspec.yaml, document:
   - the primary use case
   - the allowed architectural layer
   - the preferred integration pattern
   - misuse or anti-patterns to reject

5. Encode strict clean architecture rules into flutter-dev.
   Require a separation of presentation, domain, and data layers. Keep dependency direction inward. Keep framework and plugin code out of domain entities and use cases. Route plugin access through adapters, gateways, or repository implementations instead of direct UI or domain coupling.

6. Make the guidance enforceable.
   Prefer mandatory wording such as must, must not, and only when. Reject broad advice that cannot be checked during implementation. The generated skill should force feature work to declare affected layers, repository contracts, use cases, DTOs, mappers, and state flow when relevant.

7. Validate the generated flutter-dev skill.
   Confirm the folder name matches the skill name, the description is keyword-rich for Flutter and clean architecture discovery, and the body contains procedures, decision points, and completion checks.

## Decision Rules

- If a plugin can live in more than one layer, choose the highest boundary that preserves dependency inversion and architectural isolation.
- If plugin usage is unclear, classify it conservatively and require an adapter boundary before application code can depend on it.
- If the existing project structure conflicts with strict clean architecture, preserve the architecture rule in flutter-dev and note the mismatch explicitly.
- If there are no plugins beyond Flutter defaults, flutter-dev should still define architecture rules and explain that plugin governance will be added as dependencies appear.

## Completion Checks

- flutter-dev is created or updated at .github/skills/flutter-dev/SKILL.md.
- pubspec.yaml plugin declarations were reviewed for this initialization pass.
- Each relevant plugin has an allowed use case and integration boundary.
- Strict clean architecture rules are explicit and mandatory.
- No unrelated files were changed.

## Expected Output When Invoked

Summarize:

- whether flutter-dev was created or refreshed
- which plugin groups were identified from pubspec.yaml
- which clean architecture constraints were added
- which assumptions still need user confirmation