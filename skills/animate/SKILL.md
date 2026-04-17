---
name: animate
description: "Enhance a Flutter feature with purposeful animation, transition smoothing, and micro-interactions. Use when the user wants motion, better feedback, richer transitions, or a more alive interface without sacrificing clarity or performance."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Animate Flutter UI With Purpose

## Mandatory Preparation

Invoke `/impeccable` first and gather the feature's performance sensitivity, target devices, and whether the surface is operational or expressive.

## Purpose

Use motion to improve comprehension, feedback, and emotional polish in Flutter UI.
Do not add animation as decoration alone.

## Find The Right Motion Opportunities

Look for:

- abrupt state changes
- actions without feedback
- heavy flows that need smoother transition between steps
- loading or success moments that feel dead
- unclear spatial relationships between widgets or screens

## Flutter Animation Toolkit

Prefer the lightest tool that fits the job:

- `AnimatedContainer`
- `AnimatedOpacity`
- `AnimatedSwitcher`
- `AnimatedPositioned`
- `TweenAnimationBuilder`
- `Hero`
- `AnimationController` with hooks
- custom page transitions only when they fit existing navigation patterns
- subtle haptics for confirmation when appropriate

## Motion Layers

### Feedback layer

- button press acknowledgement
- disabled or loading transitions
- form validation feedback
- selection and toggle changes

### State transition layer

- list to empty state changes
- loading to content swaps
- inline expand and collapse
- confirmation and success transitions

### Navigation layer

- preserve the repo's current transition system by default
- use `Hero` only when the spatial continuity is obvious and worth it
- avoid custom page transitions that make routine operational flows slower

## Performance Rules

- budget for mid-range Android first
- avoid animating large heavy trees every frame
- localize animations to the smallest subtree possible
- stop or simplify decorative loops on data-dense pages
- prefer implicit animation before reaching for controller-heavy orchestration

## Accessibility Rules

- respect reduced-motion or platform accessibility preferences
- provide a stable non-animated path for the same interaction
- never hide meaning inside animation timing alone

## Output Expectations

When applying this skill, specify:

- the hero motion moment, if any
- the feedback moments to improve
- the exact Flutter widgets or controllers to change
- how performance and reduced motion will be protected

## Never

- add bounce-heavy or playful motion to serious transaction screens
- animate every element on page load
- slow down the primary workflow for flair
- introduce controller complexity when `AnimatedSwitcher` would solve it cleanly
