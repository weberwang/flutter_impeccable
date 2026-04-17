---
name: distill
description: "Simplify a Flutter page, flow, or widget by removing unnecessary complexity. Use when the user wants a cleaner page, fewer distractions, less visual noise, reduced cognitive load, or a more focused path to the primary task."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Distill Flutter UI To Essentials

## Mandatory Preparation

Invoke `/impeccable` first so simplification work preserves the logistics product's business clarity instead of stripping away useful information.

## Purpose

Reduce complexity in Flutter UI by removing obstacles between the user and the primary task.

## Find The Complexity Sources

Look for:

- too many buttons or equally weighted actions
- duplicate summaries, headers, or helper text
- long forms without section structure
- repeated containers, borders, or cards that add no meaning
- filters and options exposed too early
- visual styles that distract from the real decision

## Distillation Strategy

1. Identify the page's primary user action.
2. Separate must-have content from optional context.
3. Collapse, defer, merge, or remove low-value elements.
4. Keep critical logistics or compliance information visible where decisions happen.

## Flutter-Specific Simplification Moves

- reduce page-level widget nesting
- combine small adjacent widgets into one stronger section
- move secondary controls into bottom sheets, tabs, expansion panels, or secondary routes when appropriate
- simplify CTA hierarchy to one primary action and a small set of secondary actions
- shorten verbose helper copy and route it through i18n consistently

## Good Outcomes

- the page reads faster
- users know what to do next without guessing
- forms feel sectional and manageable
- empty and error states become clearer rather than more decorative

## Verify

Check whether:

- the primary action became more obvious
- the page still exposes all necessary business information
- fewer elements compete for attention
- the simplified version is easier to scan on a phone

## Never

- remove legally or operationally required information
- hide critical state or approval context just to make the page look cleaner
- oversimplify dense expert workflows into ambiguous minimalism
