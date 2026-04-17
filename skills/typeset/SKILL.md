---
name: typeset
description: "Improve Flutter typography by fixing hierarchy, readability, sizing, and text styling. Use when the user mentions poor text hierarchy, weak readability, awkward labels, inconsistent text styles, or wants more intentional typography in a page or component."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Typeset Flutter UI Intentionally

## Mandatory Preparation

Invoke `/impeccable` first and inspect the page's current text roles, theme styles, and density requirements.

## Purpose

Improve typography in Flutter UI so text reads clearly, feels intentional, and supports fast mobile scanning.

## Focus Areas

- title versus body versus metadata contrast
- text style consistency across similar roles
- Chinese readability on small screens
- numeric alignment in tables, fees, counts, and stats
- long labels, multi-line descriptions, and dense detail blocks

## Flutter Typography Rules

- prefer `AppTextStyles` and theme text roles over one-off `TextStyle` literals
- use `.sp` sizing through ScreenUtil when project conventions expect it
- keep hierarchy clear with size, weight, spacing, and color, not size alone
- use `FontFeature.tabularFigures()` for aligned numbers where relevant
- keep metadata visually secondary but still readable

## Common Fixes

- reduce too many near-identical font sizes
- create clearer separation between section titles and descriptive copy
- prevent long text from looking like a wall by using better spacing and hierarchy
- tone down decorative typography that harms clarity
- fix line breaks and cramped copy in lists and cards

## Never

- add font experimentation that drifts from the current design system without explicit request
- use tiny body text just to fit more content
- rely on color alone to distinguish text roles
- treat Chinese mobile UI like a web landing page headline system
