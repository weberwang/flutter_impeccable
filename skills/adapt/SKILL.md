---
name: adapt
description: "Adapt Flutter pages and widgets to different device sizes and usage contexts. Use when the user mentions responsive layout, tablet support, landscape behavior, desktop or web fit, text scaling, or cross-device compatibility in a Flutter app."
version: 2.1.1
user-invocable: true
argument-hint: "[target] [context such as phone, tablet, desktop, Flutter web]"
---

# Adapt Flutter UI Across Contexts

## Mandatory Preparation

Invoke `/impeccable` first, then inspect the target page, its route entry, and any nearby shared widgets.

## Purpose

Adapt an existing Flutter UI to different devices or contexts without breaking the product's operational clarity.

## Assess The Adaptation Problem

Understand:

- original target context: phone-only, tablet, desktop, or Flutter web
- target context: small phone, large phone, tablet, landscape, desktop, external keyboard, large text scale
- current failure mode: overflow, tiny touch targets, wasted space, weak hierarchy, broken navigation, or density mismatch

## Flutter Adaptation Strategy

### Phone-first

- keep a clear vertical flow
- protect the primary action within thumb reach
- reduce simultaneous choices on screen
- keep chips, tabs, and segmented controls lightweight

### Tablet and Large Screens

- consider two-column or master-detail layouts
- use additional width for secondary context, not duplicate decoration
- switch between bottom navigation and `NavigationRail` when appropriate
- widen content blocks without making text hard to scan

### Flutter Web or Desktop

- preserve the app's operational structure instead of pretending it is a marketing site
- add max-width constraints where long forms or details would otherwise stretch too far
- support pointer hover and keyboard focus where helpful, but keep touch-safe affordances

## Implementation Patterns

Use Flutter-native tools:

- `LayoutBuilder`
- `MediaQuery`
- `OrientationBuilder`
- `flutter_screenutil`
- `Wrap`, `Flex`, `Expanded`, `Flexible`
- `CustomScrollView`, `SliverList`, `SliverGrid`
- `NavigationRail` or side panes on larger widths when justified

## Common Adaptation Fixes

- replace rigid `Row` layouts with wrapping or stacked layouts on narrow widths
- split oversized forms into sections
- move secondary filters into chips, tabs, or bottom sheets on phone
- promote secondary panels into side-by-side layouts on tablet
- guard against keyboard overlap and inset issues on form pages
- test high text scale and long Chinese strings, not just default previews

## Verify

Check:

- small phone portrait
- large phone portrait
- tablet portrait and landscape
- large text scale
- safe areas and keyboard insets
- tap comfort and scan speed

## Rules

- Do not copy CSS breakpoint thinking directly into Flutter.
- Do not hide core functionality on smaller devices; restructure it.
- Prefer content-driven layout changes over arbitrary width thresholds.
- Keep navigation patterns consistent with the repository's GoRouter setup.
