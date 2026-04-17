---
name: optimize
description: "Diagnose and fix Flutter UI performance problems across rebuild scope, list rendering, animations, image usage, and page responsiveness. Use when the user mentions jank, lag, slow lists, heavy pages, slow transitions, or wants a faster, smoother Flutter experience."
version: 2.1.1
user-invocable: true
argument-hint: "[target]"
---

# Flutter UI Performance Optimization

## Purpose

Identify the real bottlenecks in Flutter UI and fix them without changing feature behavior.

## Measurement First

Before proposing fixes, gather evidence from the narrowest relevant source available:

- Flutter DevTools timeline or frame chart
- visible jank on a specific page or action
- code patterns known to expand rebuild scope
- image, list, or animation hotspots in Dart code

Do not optimize based on instinct alone.

## Common Flutter Bottleneck Areas

### 1. Rebuild Scope

Check for:

- broad `ref.watch` calls that rebuild large subtrees
- provider reads too high in the tree
- missing `select` when only one field matters
- expensive widgets recreated on every state tick

### 2. Large Lists and Scroll Surfaces

Check for:

- long `Column` trees where `ListView.builder` or slivers are needed
- eagerly built children on data-heavy pages
- nested scroll views that force expensive layout passes
- no pagination, chunking, or lazy loading on data-heavy flows

### 3. Images and Media

Check for:

- loading oversized images into small containers
- missing cache or resize hints
- repeated image decoding during scroll
- decorative media in high-frequency operational pages

### 4. Animations and Visual Effects

Check for:

- too many simultaneous controllers
- heavy blur, shadow, opacity, or nested clip effects
- page transitions that animate entire heavy trees
- animations that rebuild complex widgets every frame

### 5. Layout Cost

Check for:

- deep nested `IntrinsicHeight`, `IntrinsicWidth`, or unconstrained layouts
- overuse of `shrinkWrap` in long lists
- repeated measurement-heavy widgets in scrolling surfaces
- layout strategies that trigger overflow fixes instead of solving constraints directly

## Optimization Strategy

Work from highest-impact to lowest-impact.

1. Narrow rebuild scope.
2. Convert eager rendering into lazy rendering.
3. Remove unnecessary visual cost.
4. Simplify layout structure.
5. Tune animation paths and image loading.

## Flutter-Specific Fix Patterns

- Split large widgets so only the changing region rebuilds.
- Move derived state into providers or memoized hooks when it reduces churn.
- Use `const` where it meaningfully freezes stable subtrees.
- Prefer `ListView.builder`, `GridView.builder`, `CustomScrollView`, and slivers for large content.
- Replace nested general-purpose containers with simpler layout primitives.
- Keep animations local and cheap; avoid rebuilding the whole page for a tiny feedback pulse.
- Use lighter surfaces and fewer layered effects on mid-range Android targets.

## Report Format

### Performance Summary

- What feels slow
- Most likely root cause
- What evidence supports that conclusion

### Priority Fixes

List 3 to 5 fixes in order.

For each:

- Issue
- Why it is expensive
- Proposed Flutter change
- Risk level
- Expected benefit

### Validation Plan

- What to re-measure
- What user-visible action should feel faster
- Whether analyze, DevTools, or manual verification is required

## Rules

- Do not import web metrics like LCP, CLS, or bundle-size heuristics unless the target is specifically Flutter web.
- Optimize the hottest path first, not micro-details.
- Do not sacrifice accessibility or state clarity for raw speed.
- Prefer maintainable fixes over clever hacks.
