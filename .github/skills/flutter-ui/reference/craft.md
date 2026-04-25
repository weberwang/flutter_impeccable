Build a Flutter screen, widget, or flow end-to-end.

## Flow

1. Run setup from SKILL.md.
2. Shape the UX before writing Dart.
3. Inspect existing theme, widgets, router, state management, and tests.
4. Implement using the project's established Flutter patterns.
5. Add or update states: loading, empty, error, success, disabled, and permission where relevant.
6. Verify with flutter analyze and targeted tests when available.
7. Finish with polish.

## Rules

- Use existing app architecture and state management.
- Prefer Theme.of(context), ColorScheme, TextTheme, and component themes.
- Keep widgets accessible with Semantics and clear labels.
- Avoid fixed dimensions unless intrinsic.
- Do not introduce new packages unless the project needs them and the user agrees.
