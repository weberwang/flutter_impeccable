Critique a Flutter mobile/native screen or flow from a UX and visual design perspective. This is a design review, not a code-only audit.

## Inputs

Use all available evidence:

- Relevant Dart source under lib/.
- PRODUCT.md and DESIGN.md.
- ThemeData, ColorScheme, TextTheme, and reusable widgets.
- Screenshot, golden output, simulator screenshot, or user-provided image when available.
- Flutter context output from `flutter-context.mjs`.

If no screenshot is available, review source and state that visual assessment is limited.

## Review Dimensions

### Visual Hierarchy

- Is the primary task obvious?
- Does typography guide the eye?
- Are action priorities clear?
- Does spacing create rhythm rather than uniform padding everywhere?

### Platform Fit

- Does the screen feel like a native Flutter mobile surface?
- Are navigation, back behavior, sheets, dialogs, and gestures appropriate?
- Is the UI using Material or Cupertino conventions consistently?

### Cognitive Load

- Count visible choices at each decision point.
- Check progressive disclosure.
- Identify jargon and hidden dependencies.
- Flag flows that require memory across screens.

### Accessibility Experience

- Would a screen reader user understand controls and state?
- Would a large-text user complete the task?
- Are icon-only actions discoverable?
- Are error and loading states perceivable?

### Emotional Fit

- Does the tone match the product context?
- Are empty, success, and error states humane and specific?
- Does motion help users understand change?

### Flutter Slop Detection

Flag generated-app tells:

- Generic Material sample-app structure with no product-specific choices.
- Repeated Card/ListTile grids with icon, title, subtitle everywhere.
- Hard-coded theme fragments instead of app theme usage.
- Decorative gradients, glass, or shadows without purpose.
- Fixed mobile mockup dimensions embedded in widgets.

## Report Structure

Start with the verdict: does this feel like a considered Flutter app screen or a generic generated one?

Then include:

- Design health score out of 40 using Nielsen heuristics.
- What is working.
- Priority issues, 3-5 max, ordered by impact.
- Persona red flags for first-time user, power user, and accessibility user when relevant.
- Questions that would unlock a better solution.
- Recommended next commands.

For each priority issue include:

- Severity P0-P3.
- What is wrong.
- Why it matters.
- Concrete Flutter-oriented fix.
- Suggested command.
