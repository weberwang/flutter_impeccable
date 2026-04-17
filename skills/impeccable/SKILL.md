---
name: impeccable
description: "Create distinctive, production-grade Flutter app interfaces for this logistics project. Use when building pages, widgets, feature flows, or shared UI patterns, and whenever other design skills need project context. Call with 'craft' for plan-plus-build, 'teach' for project design context setup, or 'extract' to pull reusable Flutter UI patterns into the design system."
version: 2.1.1
user-invocable: true
argument-hint: "[craft|teach|extract]"
---

# Impeccable Flutter Design

This is the base skill for design work in this repository.
Its job is to keep output Flutter-native, product-grade, and aligned with the logistics app's existing tone instead of drifting into generic web aesthetics.

## Context Gathering Protocol

Design work in this repo must start from project context, not visual improvisation.

### Required context

- Who uses the feature and in what operating context.
- What job they are trying to complete.
- What emotional tone the page should carry.

### Read these sources first

- `.github/copilot-instructions.md`
- `lib/core/theme/app_color_scheme.dart`
- `lib/core/theme/app_text_styles_constant.dart`
- `lib/core/theme/page_transitions.dart`
- Product docs relevant to the feature flow

If these sources still do not reveal audience, use case, or tone, ask only the missing questions.

## Project Design Defaults

- Tone: professional, trustworthy, efficient, lightweight, easy to scan.
- Product shape: enterprise logistics app, not marketing site, not gaming UI, not glossy finance dashboard.
- Visual bias: restrained color, clear hierarchy, dense-but-readable information blocks, purposeful feedback.

## Flutter Non-Negotiables

- Top-level pages respect `SafeArea`.
- Sizing uses `flutter_screenutil` tokens such as `.w`, `.h`, `.sp`, `.r`.
- Provider-aware UI uses `HookConsumerWidget` or `HookConsumerStatefulWidget`.
- Business logic stays in providers or use cases, not inside page widgets.
- Navigation uses safe named-route helpers such as `context.safePushNamed()`.
- User-visible copy stays in Chinese i18n resources.
- Async surfaces cover loading, empty, error, and success or refresh states when relevant.

## Flutter Design Principles

### Typography

- Prefer existing `AppTextStyles` and theme text styles over one-off font stacks.
- Design for Chinese mobile reading: short line lengths, obvious hierarchy, strong contrast between title, body, and metadata.
- Use `FontFeature.tabularFigures()` or equivalent for aligned numeric data in tables, counters, and rates.
- Do not import web-font experimentation into core app pages unless the user explicitly asks to evolve the design system.

### Color and Theme

- Prefer `Theme.of(context).colorScheme`, `AppColorSchemes`, and theme extensions.
- Avoid hardcoded color literals unless adding or fixing tokens is out of scope.
- Status color should carry meaning, not decoration.
- Avoid purple-blue gradients, glassmorphism, neon glows, and decorative overlays that weaken operational clarity.

### Layout and Rhythm

- Prefer `Column`, `Row`, `Flex`, `Wrap`, `Stack`, `SliverList`, and `SliverGrid` according to content density.
- Use spacing to show hierarchy; do not rely on endless cards and dividers.
- Avoid card-in-card nesting and repeated identical list tiles when hierarchy can be shown with spacing, typography, and background contrast.
- Optimize for scan speed on phone screens first.

### Motion and Interaction

- Use motion to explain state changes, reinforce completion, or reduce abruptness.
- Prefer Flutter-native patterns such as `AnimatedSwitcher`, `AnimatedContainer`, `TweenAnimationBuilder`, `Hero`, and controlled `AnimationController` usage.
- Respect reduced-motion and accessibility preferences.
- Keep motion subtle on enterprise flows; do not turn operational screens into animation showcases.

### Feedback and States

- Empty states should teach the next action.
- Error states should explain what happened in user language and what to do next.
- Success states should confirm completion without adding friction.
- Use the project's toast and helper patterns instead of ad hoc SnackBars where project conventions already exist.

## Flutter Anti-Patterns

- Hardcoded colors, font sizes, and spacing values that bypass theme and ScreenUtil.
- `ConsumerWidget`, `Consumer`, or `Navigator.push` in new work.
- Business logic or API calls embedded in widgets.
- Decorative redesigns that compromise scan efficiency.
- Web-specific advice transplanted directly into Flutter code.
- Visual styles that look like generic AI dashboards rather than an operational logistics product.

## AI Slop Test For This Repo

If the result looks like a generic dark dashboard, gradient-heavy landing page, or card grid that could belong to any startup, it is wrong for this product.

The correct outcome should feel intentionally designed for drivers, fleet operators, shippers, or operational staff who need clarity first.

## Implementation Principles

- Choose the smallest visual change that materially improves clarity.
- Reuse project widgets, theme tokens, and navigation patterns before inventing new ones.
- When a design change implies state or data changes, map the work back through Provider, UseCase, Repository, and DataSource boundaries.
- Validate changed Dart code with narrow analyze or generation steps when relevant.

## Craft Mode

When invoked with `craft`, follow this flow:

1. Identify the target page, widget, or flow.
2. Read the nearest route, page, widget, provider, and theme anchors.
3. Shape the design direction in Flutter terms: page structure, widgets, states, navigation, i18n.
4. Implement the smallest coherent code change.
5. Validate with formatting, analyze, or build_runner when needed.

## Teach Mode

When invoked with `teach`, do not design immediately. Build project context first.

1. Explore repository docs, theme files, and existing pages.
2. Infer what you can about audience, tone, and feature patterns.
3. Ask only for missing context that the codebase cannot reveal.
4. Synthesize a `## Design Context` section into `.impeccable.md` for future design work in this repo.

## Extract Mode

When invoked with `extract`, identify reusable design patterns worth lifting into the shared system.

- Repeated page sections
- Shared loading or empty states
- Common chips, filters, stat rows, summary cards
- Theme tokens or typography roles that should stop being hardcoded

The output should recommend concrete Flutter assets to extract, such as shared widgets, theme extensions, or common page scaffolds.
