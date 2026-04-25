Generate or refresh DESIGN.md for a Flutter mobile/native project. The output should help future agents stay aligned with the app's real ThemeData, widgets, assets, and platform conventions.

## Inputs

Run:

```bash
node .github/skills/flutter-ui/scripts/load-context.mjs
node .github/skills/flutter-ui/scripts/flutter-context.mjs
node .github/skills/flutter-ui/scripts/flutter-theme-extract.mjs
```

Use the script output as evidence, then inspect the referenced Dart files directly when needed.

## What To Extract

### Project Surface

- App entry: MaterialApp, CupertinoApp, or custom shell.
- Router: Navigator, go_router, auto_route, beamer, or custom routing.
- State management signals: provider, riverpod, bloc, get_it, hooks, stacked, mobx, or none.
- Localization: l10n.yaml, ARB files, intl usage.

### Theme

- ThemeData and darkTheme.
- ColorScheme roles and custom colors.
- TextTheme roles, font families, weights, sizes, line heights.
- Component themes: ElevatedButtonThemeData, FilledButtonThemeData, TextButtonThemeData, InputDecorationTheme, CardTheme, DialogTheme, AppBarTheme, NavigationBarThemeData, NavigationRailThemeData, BottomSheetThemeData, ListTileThemeData.
- ThemeExtension classes and values.

### Assets

- Fonts and families from pubspec.yaml.
- Image assets, icon assets, generated assets.
- App icon or brand signals if present.

### Component Patterns

Document reusable widgets and their variants:

- Buttons and tappable rows.
- Cards and surfaces.
- Inputs and validation.
- Navigation components.
- Empty, loading, error, offline, and permission states.
- Dialogs, bottom sheets, menus, and toasts/snackbars.

## DESIGN.md Structure

Use this structure:

```markdown
---
name: Project Name
description: One-line product and visual summary
platform: flutter-mobile-native
colors:
  primary: "#6750A4"
typography:
  bodyLarge:
    fontFamily: "Roboto"
    fontSize: 16
    fontWeight: 400
spacing:
  screenPadding: 16
components:
  filled-button:
    backgroundColor: "{colors.primary}"
---

# Design System: Project Name

## Overview

## Colors

## Typography

## Elevation

## Components

## Do's and Don'ts
```

The frontmatter is a practical token map, not a perfect Dart mirror. If a Flutter concept does not fit the simple token schema, document it in prose under the closest section.

## Rules

- Do not invent tokens that the project does not use.
- Do not rename established app tokens to Material defaults unless the project already uses those names.
- If ThemeData and DESIGN.md conflict, treat ThemeData as current implementation and call out the drift.
- Include Flutter-specific rules in Do's and Don'ts: SafeArea, text scaling, semantics, list builders, theme usage, and generated file boundaries.
- Never silently overwrite an existing DESIGN.md. Summarize what will change and proceed only when the user requested the refresh.
