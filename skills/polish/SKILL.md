---
name: polish
description: "Perform a final Flutter UI quality pass before shipping. Use when the user wants finishing touches, launch-readiness review, consistency fixes, alignment cleanup, or micro-detail refinement on a page, widget, or feature flow."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Polish Flutter UI Before Shipping

## Mandatory Preparation

Invoke `/impeccable` first and determine the quality bar: quick MVP cleanup or product-grade ship pass.

## Purpose

Run a final detailed pass that improves consistency, precision, state completeness, and fit with this repository's Flutter conventions.

## Polish Checklist

### Visual and Layout

- alignment is clean
- spacing follows ScreenUtil and shared rhythm
- section hierarchy is obvious
- no accidental overflow or clipped content

### Theme and Typography

- colors come from theme or shared tokens
- text styles reuse `AppTextStyles` or theme roles
- contrast stays readable in light and dark themes
- metadata and body copy are visually distinct

### States and Feedback

- loading, empty, error, success, disabled, and refresh states are covered where needed
- async actions communicate progress clearly
- destructive or irreversible actions confirm intent appropriately
- empty states suggest the next action

### Interaction and Navigation

- taps feel intentional
- focus and accessibility cues are present where needed
- routes use safe named navigation patterns
- modal, page, and sheet behavior match existing app conventions

### Code and System Fit

- no hardcoded styling that should be themed
- no stray `Navigator.push`, `ConsumerWidget`, or business logic in the widget layer
- i18n coverage is complete for changed user-facing text
- related generated files are refreshed when required

## Verification

Validate with the narrowest useful checks:

- formatter on touched files
- analyze on the affected area when possible
- build_runner when annotated sources changed
- manual scan of changed states and main interactions

## Output

Summarize:

- what was polished
- what still looks risky
- what was validated
- whether the result is ready for handoff or needs one more focused pass

## Never

- turn a polish pass into an unrelated redesign
- chase tiny visual tweaks while major state gaps remain
- introduce new patterns that drift from the repo's Flutter conventions
