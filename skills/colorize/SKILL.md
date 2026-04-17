---
name: colorize
description: "Add strategic color to Flutter UI that feels too gray or visually flat. Use when the user wants stronger hierarchy, clearer status meaning, warmer surfaces, or more expressive but still controlled color in a page, widget, or flow."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Colorize Flutter UI Strategically

## Mandatory Preparation

Invoke `/impeccable` first and inspect the current theme, status colors, and surrounding pages.

## Purpose

Introduce color in Flutter UI to improve hierarchy, wayfinding, and state meaning without breaking this logistics app's restrained enterprise tone.

## Use Color For

- primary emphasis
- semantic state: success, warning, error, info
- grouping or section emphasis
- status chips, badges, and progress markers
- making important actions easier to scan

## Flutter-Specific Rules

- prefer `Theme.of(context).colorScheme`, `AppColorSchemes`, and theme extensions
- add or evolve tokens before scattering literals
- keep text contrast strong in both light and dark themes
- use color with labels or icons, not as the sole indicator

## Good Fit For This Repo

- slightly richer surfaces for key sections
- clearer status chips or progress indicators
- stronger CTA emphasis on summary or form pages
- toned, trusted blues and controlled accent colors over loud gradients

## Avoid

- purple-blue gradient defaults
- decorative neon highlights
- random hex values on isolated widgets
- making every element colorful at once
- status colors that conflict with business meaning

## Output

When applying this skill, specify:

- which surfaces or elements gain color
- what semantic job that color now performs
- whether theme tokens or extensions need to change

## Never

- sacrifice scan speed for visual richness
- put weak gray text on colored surfaces
- colorize operational pages so heavily that hierarchy collapses
