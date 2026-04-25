Extract reusable Flutter UI patterns into the project's design system.

## Look For

- Repeated colors, text styles, padding, radii, durations, and shadows.
- Duplicate buttons, cards, fields, app bars, list rows, empty states, and dialogs.
- ThemeData or ThemeExtension values that should replace hard-coded widget values.
- Widgets that should become shared components.

## Migrate

- Prefer ThemeData, ColorScheme, TextTheme, component themes, and ThemeExtension for tokens.
- Create reusable widgets only when they reduce real duplication or clarify behavior.
- Keep public widget APIs small and semantic.
- Update call sites incrementally and verify with tests or screenshots.
