---
name: shape
description: "Plan a Flutter feature's UX and UI before writing code. Use during discovery or implementation planning to define page structure, route placement, widget composition, state boundaries, and required UI states for a new feature or major redesign."
version: 2.1.1
user-invocable: true
argument-hint: "[feature to shape]"
---

# Shape A Flutter Feature

## Mandatory Preparation

Invoke `/impeccable` first so the plan reflects this repository's design tone and Flutter constraints.

## Purpose

This skill does planning, not implementation.
Its output is a Flutter-ready design brief that can guide implementation through `/logistics-flutter-development`.

## Phase 1: Discovery Interview

Ask only what the codebase cannot already tell you.

### Product and User Context

- What problem does this feature solve?
- Who uses it and how often?
- What should users feel here: speed, confidence, reassurance, urgency?

### Feature and Flow

- What is the primary action on this page or flow?
- Where does the user enter from and where do they go next?
- Is this a list page, form page, detail page, approval flow, or dashboard?

### Data and State

- What data appears on screen?
- What are the normal, empty, loading, error, and edge states?
- Which state is local UI state versus provider-managed business state?

### Technical Boundaries

- Which module owns this feature?
- Does it need new routes, providers, use cases, or models?
- Does it involve i18n, generation, or backend contract updates?

### Anti-Goals

- What should this feature explicitly not become?
- What existing pattern should it stay consistent with?

## Phase 2: Produce A Flutter Design Brief

Return a brief with these sections.

### 1. Feature Summary

What the feature is, who it serves, and what success looks like.

### 2. Primary User Action

The one thing the user should do or understand first.

### 3. Page and Route Strategy

- screen or flow type
- likely route placement
- navigation entry and exit points

### 4. Layout Strategy

- key sections
- what must appear above the fold
- what is secondary or progressively disclosed

### 5. Widget Composition

- page-level widgets
- reusable sections
- modal or bottom-sheet usage if needed

### 6. State Boundary Plan

- local Hook state
- provider-managed state
- where validation, loading, and submission logic should live

### 7. Required UI States

- default
- loading
- empty
- error
- success
- any feature-specific edge cases

### 8. Copy and i18n Notes

- critical labels
- empty-state guidance
- error messaging tone
- any localization constraints

### 9. Implementation Risks

- architecture drift risk
- responsive complexity
- async or navigation risk
- generation or contract risk

### 10. Recommended Next Skill

Point to the best execution skill based on the outcome.

## Rules

- Plan in Flutter terms: page, widget, provider, route, state, i18n.
- Do not write code in this skill.
- Do not skip state design. Loading, empty, and error handling are part of the feature, not cleanup.
- Get confirmation on the brief before treating the shaping work as complete.
