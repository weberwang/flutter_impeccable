---
name: audit
description: "Run a Flutter UI quality audit across accessibility, responsiveness, theming, state coverage, performance risk, and architectural anti-patterns. Use when the user wants a technical quality review, launch-readiness check, accessibility pass, or implementation audit for a page, widget, or feature flow."
version: 2.1.1
user-invocable: true
argument-hint: "[area (page, flow, widget, feature...)]"
---

# Flutter UI Audit

## Mandatory Preparation

Invoke `/impeccable` first so the audit uses the project's product tone and Flutter constraints instead of generic frontend rules.

## Purpose

Run a technical audit for Flutter UI implementation.
Do not fix issues in this skill. Document them, score them, and point to the right follow-up skill.

## Audit Dimensions

Score each dimension from 0 to 4.

### 1. Accessibility and Semantics

Check for:

- Missing `Semantics`, labels, or role hints on critical interactive elements.
- Weak focus handling for keyboard or assistive navigation.
- Tap targets smaller than 44 logical pixels.
- Low contrast between text, icons, and backgrounds.
- Form validation that is visible but not understandable.
- Icon-only actions with unclear meaning.

### 2. Responsive Fit and Device Safety

Check for:

- Missing `SafeArea` on top-level pages.
- Raw pixel values instead of ScreenUtil sizing.
- Overflow risk on smaller devices or large text scale.
- Broken tablet, landscape, or long-content behavior.
- Dense layouts that are hard to tap or scan on mobile.

### 3. Theme and Token Discipline

Check for:

- Hardcoded colors, text styles, radii, or spacing.
- Theme drift from `Theme.of(context)`, `AppColorSchemes`, or `AppTextStyles`.
- Light and dark theme mismatch.
- Status color misuse that harms meaning.

### 4. State Coverage and Feedback

Check for:

- Missing loading, empty, error, disabled, success, or refresh states.
- Raw backend error text shown to users.
- No confirmation after critical actions.
- Buttons that stay tappable during async submissions.
- Dead-end empty states without next action.

### 5. Performance and Rebuild Risk

Check for:

- Broad `ref.watch` usage causing unnecessary rebuilds.
- Missing `const` on stable widgets where it meaningfully helps.
- Large list pages that render everything eagerly.
- Heavy blur, shadow, opacity, or nested scroll layouts likely to jank.
- Image decoding or caching misuse.
- Animation patterns likely to exceed the frame budget on mid-range Android.

### 6. Architecture and Flutter Anti-Patterns

Check for:

- Business logic inside widgets.
- `Navigator.push` or raw `context.push` instead of safe named-route navigation.
- Non-hooks Riverpod widgets in new or modified UI code.
- Direct API or repository calls from the page layer.
- User-visible strings not routed through Chinese i18n.

## Report Format

### Audit Score

| #         | Dimension                              | Score     | Key Finding       |
| --------- | -------------------------------------- | --------- | ----------------- |
| 1         | Accessibility and Semantics            | ?         |                   |
| 2         | Responsive Fit and Device Safety       | ?         |                   |
| 3         | Theme and Token Discipline             | ?         |                   |
| 4         | State Coverage and Feedback            | ?         |                   |
| 5         | Performance and Rebuild Risk           | ?         |                   |
| 6         | Architecture and Flutter Anti-Patterns | ?         |                   |
| **Total** |                                        | **??/24** | **[Rating band]** |

Rating bands:

- 21-24 excellent
- 17-20 good
- 12-16 usable but risky
- 7-11 poor
- 0-6 critical

### Executive Summary

- Overall score and rating band
- Count of issues by severity `P0` to `P3`
- Top 3 issues blocking quality
- Recommended next action sequence

### Detailed Findings

For each issue, include:

- Severity: `P0`, `P1`, `P2`, or `P3`
- Location: page, widget, provider, or file path
- Category: one of the six audit dimensions
- Impact on user behavior or maintainability
- Concrete fix direction in Flutter terms
- Suggested next skill

### Positive Findings

Note what already aligns with the design system or project architecture so the team knows what to preserve.

## Suggested Skills

Recommend only skills that fit the issue:

- `/layout` for spacing and hierarchy issues
- `/clarify` for copy and error-message issues
- `/distill` for clutter and complexity
- `/adapt` for responsive or device-fit problems
- `/polish` for final refinement
- `/critique` for UX-level review
- `/logistics-flutter-development` when the fix needs concrete code changes across layers

## Rules

- Be specific about Flutter evidence, not generic design theory.
- Prioritize issues that affect task completion, scan efficiency, or architectural drift.
- Do not flood the report with trivial `P3` items.
- Do not judge the page against web-only rules such as ARIA or Core Web Vitals.
