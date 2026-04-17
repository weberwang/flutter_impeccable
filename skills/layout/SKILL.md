---
name: layout
description: "Improve Flutter page and widget layout, spacing, and visual rhythm. Use when the user mentions crowded screens, weak hierarchy, bad spacing, awkward alignment, monotonous composition, or a page that feels structurally off."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Improve Flutter Layout And Rhythm

## Mandatory Preparation

Invoke `/impeccable` first so layout changes stay aligned with this repository's product tone and Flutter UI constraints.

## Purpose

Fix layout and spacing problems that make Flutter pages feel crowded, flat, or hard to scan.

## Diagnose The Layout

Inspect:

- whether the page purpose is clear in the first screenful
- whether spacing groups related content tightly and separates unrelated sections generously
- whether there are too many equal-weight blocks competing for attention
- whether cards, dividers, and containers are doing work or just adding noise
- whether the page structure survives smaller devices and large text scale

## Flutter Layout Tools

Prefer Flutter-native structure choices:

- `Column`, `Row`, `Flex`, `Wrap`
- `Expanded` and `Flexible`
- `SizedBox` or shared gap widgets with ScreenUtil sizing
- `CustomScrollView` and slivers for long pages
- `Align`, `Padding`, `ConstrainedBox`, `LayoutBuilder`

## Layout Fix Patterns

- move from a flat scroll of repeated cards to clearly separated sections
- replace nested containers with simpler hierarchy and spacing
- keep titles, summaries, metadata, and actions visually distinct
- tighten local spacing within a section and increase spacing between sections
- use max-width or constrained composition for wide layouts
- reduce centered composition when left alignment improves scanning

## What Good Looks Like In This Repo

- operational clarity beats visual novelty
- primary action is obvious
- key metrics or statuses are readable without decoration overload
- list items scan quickly
- forms feel sectional, not like one long wall

## Verify

Check:

- first-screen comprehension
- spacing consistency
- hierarchy clarity
- overflow at small widths
- large text scale behavior
- alignment of interactive elements and labels

## Never

- solve hierarchy only with more cards
- nest cards inside cards by default
- treat every section as visually equal
- use raw pixel spacing values when ScreenUtil or shared spacing exists
