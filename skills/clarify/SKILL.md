---
name: clarify
description: "Improve Flutter UX copy, labels, empty states, error messages, helper text, and action wording. Use when the user mentions confusing text, unclear buttons, bad validation messages, weak empty states, or wants clearer Chinese product copy in the app."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Clarify Flutter UX Copy

## Mandatory Preparation

Invoke `/impeccable` first and gather the user context, stress level, and the page's primary action.

## Purpose

Make Flutter UI copy easier to understand and act on.
This skill improves labels, button text, helper text, toasts, errors, and empty-state messaging.

## Focus Areas

- form labels and validation copy
- action buttons and CTAs
- empty-state guidance
- async and error feedback
- bottom-sheet, dialog, and confirmation wording
- list filters, tabs, and status labels

## Project-Specific Rules

- update user-facing text through the Chinese i18n layer
- prefer user language over backend or internal jargon
- make primary actions explicit
- keep operational language short, confident, and unambiguous
- explain what happened and what the user should do next

## Good Copy In This Repo

- helps drivers, operators, and business users decide quickly
- uses consistent terms across pages and flows
- avoids raw error codes or technical failure language
- makes success and failure states feel intentional

## Review Questions

- Can a first-time user understand the action without extra explanation?
- Is the label specific enough to avoid guessing?
- Does the error message tell the user how to recover?
- Does the empty state offer a meaningful next step?

## Output

For each change, provide:

- current wording problem
- why it is confusing
- improved wording
- where the i18n change should land if implementation is requested

## Never

- translate backend fields directly into UI copy
- rely on placeholders as the only label
- use playful or jokey copy in high-stakes logistics flows
- increase word count when a sharper sentence will do
