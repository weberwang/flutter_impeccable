Run systematic Flutter mobile/native technical quality checks and generate a prioritized report. Do not fix issues unless the user asks. Document what is measurable, where it lives, and how to address it.

## Required Context

Run these first from the project root:

```bash
node .github/skills/flutter-ui/scripts/load-context.mjs
node .github/skills/flutter-ui/scripts/flutter-context.mjs
node .github/skills/flutter-ui/scripts/flutter-audit.mjs --target lib
```

If Flutter is not installed or the commands fail, continue with static findings and state the limitation clearly.

## Diagnostic Scan

Score each dimension 0-4.

### 1. Accessibility and Semantics

Check for:

- IconButton, GestureDetector, InkWell, custom controls, and tappable rows without semantic labels.
- Touch targets below 48x48 logical pixels.
- Missing focus traversal for keyboard or switch users.
- Screens that fail when MediaQuery text scaling increases.
- Images without meaningful semantic labels where the image carries meaning.
- Custom controls that do not expose disabled, selected, checked, expanded, loading, or error state.
- Missing RTL support in directional layouts and icons.

Score: 0 inaccessible, 1 major gaps, 2 partial, 3 good, 4 excellent.

### 2. Flutter Performance

Check for:

- Heavy work in build(), initState without cancellation, repeated parsing, sync IO, or network calls in build.
- Broad setState calls where local state or ValueListenableBuilder would reduce rebuild scope.
- Missing const constructors in stable widget subtrees.
- Long lists built with Column children instead of ListView.builder, GridView.builder, or slivers.
- Large images without sizing, caching, or decode control.
- Shader compilation jank risks in first-run animations.
- Excessive opacity, blur, clip, saveLayer, or nested shadows.

Score: 0 severe jank risk, 1 major issues, 2 partial, 3 good, 4 excellent.

### 3. Theming and Design System

Check for:

- Hard-coded Color, TextStyle, EdgeInsets, BorderRadius, Duration, and shadows in widgets.
- ThemeData, ColorScheme, TextTheme, component themes, or ThemeExtension unused or inconsistent.
- Light and dark theme drift.
- Material and Cupertino patterns mixed without clear platform intent.
- Components that duplicate existing app design system widgets.

Score: 0 no theme system, 1 mostly hard-coded, 2 partial, 3 good, 4 excellent.

### 4. Adaptive Layout

Check for:

- Fixed widths or heights that overflow on small devices, landscape, or text scaling.
- Missing SafeArea around full-screen content.
- Keyboard overlap on forms.
- Screens without a scroll path when content grows.
- Missing tablet or landscape strategy for information-dense screens.
- Poor thumb reach for primary actions.

Score: 0 phone-only brittle, 1 major issues, 2 partial, 3 good, 4 excellent.

### 5. Production Resilience

Check for:

- Empty, loading, error, offline, permission, and retry states.
- Long localized strings, CJK text, RTL, emoji, large numbers, and date/currency formats.
- App lifecycle, back navigation, deep link, and interrupted flow handling.
- Form validation and input preservation.
- Golden, widget, or integration tests for changed UI.

Score: 0 ideal-data only, 1 major gaps, 2 partial, 3 good, 4 excellent.

## Report Structure

Start with the anti-pattern verdict: does this feel like generic generated Flutter UI, or does it use the app's real theme and platform patterns?

Then provide:

| # | Dimension | Score | Key Finding |
|---|---|---|---|
| 1 | Accessibility and Semantics | ? | |
| 2 | Flutter Performance | ? | |
| 3 | Theming and Design System | ? | |
| 4 | Adaptive Layout | ? | |
| 5 | Production Resilience | ? | |
| Total | | ??/20 | rating |

Rating bands: 18-20 excellent, 14-17 good, 10-13 acceptable, 6-9 poor, 0-5 critical.

For each finding include:

- Severity: P0 blocking, P1 major, P2 minor, P3 polish.
- Location: file, widget, route, or theme symbol.
- Impact: why users or maintainers care.
- Recommendation: concrete Flutter fix.
- Suggested command: adapt, harden, optimize, polish, clarify, layout, typeset, colorize, or document.

End with positive findings and a prioritized action list.
