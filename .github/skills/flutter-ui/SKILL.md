---
name: flutter-ui
description: Use when the user wants to design, build, reshape, critique, audit, polish, adapt, harden, optimize, animate, colorize, extract, document, or otherwise improve Flutter interfaces. Covers Dart widget trees, screens, app flows, Material 3, Cupertino, ThemeData, ColorScheme, TextTheme, ThemeExtension, Semantics, accessibility, adaptive layouts, SafeArea, MediaQuery, LayoutBuilder, Slivers, localization, golden/widget tests, performance jank, rebuild scope, and production-ready mobile, tablet, desktop, iOS, and Android UI. Not for backend-only tasks, raw HTML/CSS DOM work, or browser live iteration.
version: 0.1.0
user-invocable: true
argument-hint: "[craft|shape|audit|critique|adapt|harden|optimize|polish|document|extract|clarify|typeset|colorize|layout|animate|onboard|bolder|quieter|distill|delight|overdrive] [screen|widget|flow|theme]"
license: Apache 2.0. Derived from the Impeccable frontend design skill in this repository.
---

Designs and iterates production-grade Flutter interfaces. Real Dart code, committed design choices, native platform respect, measurable quality.

## Setup (non-optional)

Do these steps before any Flutter UI work. Skipping them produces generic app UI that ignores the product, platform, and codebase.

### 1. Context gathering

Read the project before designing. Look for, at minimum:

- **PRODUCT.md** - required when present. Users, brand, tone, anti-references, strategic principles.
- **DESIGN.md** - optional, strongly recommended. Colors, typography, elevation, components, motion, spacing.
- **pubspec.yaml** - Flutter SDK constraints, dependencies, fonts, assets, localization packages.
- **lib/** - app root, routes, themes, widgets, state management, generated localization, feature structure.
- **test/** and **integration_test/** - widget tests, golden tests, existing harnesses.
- **l10n.yaml** and ARB files - localization structure and string constraints.

If PRODUCT.md is missing, empty, or placeholder-like (`[TODO]` markers, under 200 meaningful characters), gather the missing product context from existing code, app copy, README files, screenshots, and package metadata before making design decisions. If DESIGN.md is missing, mention once per session that documenting ThemeData, ColorScheme, TextTheme, fonts, assets, and reusable widgets will improve consistency, then proceed from code evidence.

### 2. Register

Every Flutter UI task is **brand** or **product**.

- **Brand** - onboarding, launch moments, upgrade/paywall flows, campaign-like screens, portfolio/store-style feature pages, expressive first-run experiences. Design carries the message.
- **Product** - authenticated app screens, forms, dashboards, editors, settings, lists, account flows, operations, data entry. Design serves the task.

Identify the register before designing. Priority: (1) the user's words; (2) the screen, route, or widget being edited; (3) PRODUCT.md if it has a register field; (4) product by default for task-oriented app work.

## Flutter design laws

Apply these to every Flutter task, both registers. Match implementation complexity to the aesthetic vision. Minimalism needs precision. Expressive app moments need more intentional code, not more decoration. Vary across projects; never collapse into the same template.

### Platform fit

A Flutter app should feel native to its target context, not like a web page squeezed into a widget tree. Respect iOS and Android navigation expectations, system back behavior, safe areas, keyboard insets, gestures, haptics, text scaling, accessibility settings, and platform density.

Material 3 and Cupertino are systems, not costumes. Use the system already established by the app. If none exists, Material 3 is the default for cross-platform Flutter. Use Cupertino deliberately for iOS-native flows or adaptive components; do not mix Material and Cupertino casually inside the same interaction.

### Theme and tokens

ThemeData, ColorScheme, TextTheme, component themes, and ThemeExtension are the source of truth. Do not scatter raw `Color(...)`, `TextStyle(...)`, `EdgeInsets`, `BorderRadius`, or duration values through leaf widgets unless the codebase already has a deliberate local-token pattern.

Use semantic roles, not decorative names: primary, secondary, surface, surfaceContainer, error, success, warning, disabled, selected, focus, inverse, scrim. If the app needs domain colors, put them in a typed ThemeExtension.

Good direction:

```dart
final scheme = Theme.of(context).colorScheme;
final text = Theme.of(context).textTheme;

return Text(
  label,
  style: text.titleMedium?.copyWith(color: scheme.onSurface),
);
```

Better for custom roles:

```dart
@immutable
class AppStatusColors extends ThemeExtension<AppStatusColors> {
  const AppStatusColors({required this.success, required this.warning});

  final Color success;
  final Color warning;

  @override
  AppStatusColors copyWith({Color? success, Color? warning}) => AppStatusColors(
        success: success ?? this.success,
        warning: warning ?? this.warning,
      );

  @override
  AppStatusColors lerp(ThemeExtension<AppStatusColors>? other, double t) {
    if (other is! AppStatusColors) return this;
    return AppStatusColors(
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
    );
  }
}
```

### Color strategy

Pick a color strategy before picking colors. Map the strategy into ColorScheme and ThemeExtension roles.

- **Restrained** - tinted neutrals plus one accent under 10% of the surface. Product default.
- **Committed** - one saturated role carries 30 to 60% of the surface. Good for identity-heavy onboarding and strong brand flows.
- **Full palette** - three or four named roles, each used deliberately. Good for data, status, and expressive brand moments.
- **Drenched** - the surface is the color. Use rarely for launch, hero, onboarding, or campaign-like screens.

Avoid pure black and pure white when defining palettes. Flutter will accept them, but they usually look harsh on mobile OLED and make elevation, tint, and contrast harder. Use slightly tinted surfaces unless the app's visual system proves otherwise.

### Theme mode

Dark versus light is never a default. Before choosing, write one concrete scene sentence: who uses this screen, where, under what ambient light, in what mood, and on what device. If the sentence does not force the answer, make it more specific.

Honor the app's existing `theme`, `darkTheme`, `themeMode`, platform brightness, high contrast mode, and dynamic color behavior. Never design only one theme if the app ships both.

### Typography

Use TextTheme as the scale. Hierarchy comes from size, weight, color role, spacing, and placement, not arbitrary one-off styles.

- Keep dense body copy readable at common phone widths and text scaling.
- Use at least a 1.25 ratio between meaningful hierarchy steps when the design needs contrast.
- Test with long localized strings and larger text. Avoid layouts that only work at `textScaleFactor == 1.0`.
- Prefer `maxLines`, overflow behavior, flexible parents, and meaningful wrapping over fixed-height text boxes.

### Layout and constraints

Flutter layout is constraint-based. Parents pass constraints down; children choose sizes; parents position children. Design with constraints, not guessed screen dimensions.

Use `LayoutBuilder`, `MediaQuery`, `OrientationBuilder`, `SafeArea`, `Expanded`, `Flexible`, `AspectRatio`, `SliverList`, `SliverGrid`, `CustomScrollView`, and adaptive navigation intentionally. Use breakpoints as product decisions, not magic numbers copied from web CSS.

Avoid fixed pixel widths and heights unless the element is intrinsically fixed, such as an icon, avatar, divider, or minimum tap target. Every screen should survive small phones, large phones, landscape, tablets, desktop windows, keyboard open, notches, gesture navigation, split screen, RTL, and long translations.

Cards are the lazy answer. Use Card or Material surfaces when they clarify grouping, elevation, or interaction. Nested cards and decorative Container stacks are usually wrong.

### Widget composition

Do not wrap everything in `Container`. Prefer widgets that state intent: `Padding`, `Align`, `SizedBox`, `DecoratedBox`, `ColoredBox`, `Card`, `Material`, `InkWell`, `ListTile`, `Semantics`, `Focus`, and `FocusableActionDetector`.

Extract widgets when it improves naming, state ownership, reuse, testing, or rebuild boundaries. Do not extract tiny fragments just to hide an unclear tree. Use `const` constructors where possible. Add keys for identity-sensitive lists, reorderable content, animations, and tests.

### State ownership

State placement is part of UI quality. Keep ephemeral visual state local. Keep shared product state in the app's established state management system, such as InheritedWidget, ChangeNotifier, Provider, Riverpod, Bloc, Redux, MobX, or another existing pattern. Do not introduce a new state framework for a small UI task.

Avoid broad `setState` at the screen root for small interactions. Update the narrowest subtree that owns the change. Never perform parsing, network calls, synchronous IO, or heavy allocation inside `build()`.

### Motion

Motion must clarify cause and effect. Prefer `AnimatedSwitcher`, `AnimatedOpacity`, `AnimatedSlide`, `AnimatedContainer`, `TweenAnimationBuilder`, `Hero`, and explicit AnimationController only when state and timing need it.

Use calm ease-out curves. Avoid bounce and elastic curves unless the product personality and interaction truly demand them. Respect reduced-motion accessibility settings and avoid animations that block task completion.

Do not animate expensive layout changes in tight loops. Prefer transforms, opacity, and bounded implicit animations. Watch shader compilation jank and frame budget.

### Accessibility

Accessibility is not a final pass. It shapes the widget tree.

- Icon-only actions need `tooltip`, `semanticLabel`, or an explicit Semantics label where appropriate.
- Interactive targets should be at least 48 by 48 logical pixels on Material surfaces, or follow deliberate platform compact patterns without becoming unreachable.
- Respect text scaling, high contrast, reduced motion, screen readers, keyboard traversal, switch access, RTL, and platform focus behavior.
- Use `Semantics`, `MergeSemantics`, `ExcludeSemantics`, `FocusTraversalGroup`, `Shortcuts`, and `Actions` when the default widget semantics are not enough.
- Do not rely on color alone for state. Pair color with labels, icons, shape, position, or copy.

Example:

```dart
IconButton(
  tooltip: 'Archive conversation',
  icon: const Icon(Icons.archive_outlined),
  onPressed: onArchive,
)
```

### Internationalization and copy

Every word earns its place. No restated headings, no filler subtitles, no error copy that hides the next action.

Flutter UI must handle generated localizations, RTL, pluralization, date/number formatting, and long strings. Prefer app localization APIs over hard-coded user-facing strings when the project is localized. Design layouts to expand, wrap, or scroll instead of clipping translated text.

No em dashes. Use commas, colons, semicolons, periods, or parentheses. Also not `--`.

### Performance and verification

Flutter UI quality is visible in frame timing. Use `const` constructors, lazy builders, cache images responsibly, isolate expensive repaints with `RepaintBoundary` only when useful, and prefer `ListView.builder` or slivers for long content.

Validation should match the change:

- Small widget change: `flutter analyze`, targeted widget tests.
- Visual screen change: widget test or golden test where the project has a harness.
- Layout/adaptive change: test at multiple sizes, text scales, and orientations.
- Performance fix: measure rebuild scope, frame timing, and list behavior.

Golden test shape:

```dart
testWidgets('settings screen matches golden', (tester) async {
  await tester.pumpWidget(const TestApp(child: SettingsScreen()));
  await expectLater(
    find.byType(SettingsScreen),
    matchesGoldenFile('goldens/settings_screen.png'),
  );
});
```

### Absolute bans

Match and refuse. If you are about to write any of these, rewrite the element with different structure.

- **Blind Container chains.** Multiple nested Containers used for padding, color, radius, and alignment without semantic intent.
- **Fixed phone mockup layouts.** Screens that only fit one device size, one text scale, or one locale.
- **Icon-only mystery actions.** Tappable icons without labels, tooltips, semantics, or visible context.
- **Gesture-only critical actions.** Swipe, long-press, drag, or hidden gestures with no visible fallback.
- **Root rebuild interactions.** Calling `setState` at a broad screen root for small local changes.
- **Work in build.** Network calls, parsing, database access, image decoding, sorting large lists, or allocations inside `build()`.
- **Column-built long lists.** Large scrollable lists built as `Column(children: ...)` instead of builders or slivers.
- **Custom controls without states.** Buttons, fields, toggles, or chips that ignore disabled, loading, error, focus, hover, pressed, and semantics states.
- **Theme bypass.** Raw colors, text styles, spacing, or radii repeated across widgets instead of a theme/token source.
- **Web mental model leakage.** CSS, DOM, hover-first interactions, viewport breakpoints, or browser live-mode assumptions applied directly to native Flutter.

### The AI slop test

If someone could look at the app and say "AI made that" without doubt, it failed. Generic gradients, same-sized card grids, template onboarding pages, fake glass panels, arbitrary neon, and category-reflex palettes all count.

Category-reflex check: if someone can guess the theme and palette from the category name alone, such as finance becoming navy and gold or healthcare becoming white and teal, rework the scene sentence and color strategy until the answer is no longer obvious from the domain.

## Commands

Use these command intents when the user invokes this skill. If no command is provided, show this menu grouped by category and ask which direction they want.

| Command | Category | Description |
|---|---|---|
| `craft [feature]` | Build | Shape, then build a Flutter screen, widget, or flow end-to-end. |
| `shape [feature]` | Build | Plan Flutter UX/UI before writing Dart code. |
| `teach` | Build | Establish PRODUCT.md and DESIGN.md context from product goals and existing app evidence. |
| `document` | Build | Generate or update DESIGN.md from ThemeData, ColorScheme, TextTheme, fonts, assets, widgets, routes, and tests. |
| `extract [target]` | Build | Pull reusable ThemeData, ThemeExtension roles, components, and widget patterns into a design system. |
| `critique [target]` | Evaluate | UX review of a screen, widget, flow, or app surface with concrete fixes. |
| `audit [target]` | Evaluate | Technical quality checks: semantics, layout resilience, theme use, performance, tests, localization. |
| `polish [target]` | Refine | Final Flutter UI pass before shipping. |
| `bolder [target]` | Refine | Amplify bland screens while preserving platform fit and usability. |
| `quieter [target]` | Refine | Reduce visual noise, excessive color, motion, or density. |
| `distill [target]` | Refine | Strip a screen or flow to its essential task. |
| `harden [target]` | Refine | Production-ready pass for errors, loading, empty states, permissions, i18n, text scaling, offline, and edge cases. |
| `onboard [target]` | Refine | Design first-run flows, empty states, activation, and permission moments. |
| `animate [target]` | Enhance | Add purposeful Flutter motion and transitions. |
| `colorize [target]` | Enhance | Improve ColorScheme, semantic color, and ThemeExtension use. |
| `typeset [target]` | Enhance | Improve TextTheme hierarchy, readable copy, and localized text behavior. |
| `layout [target]` | Enhance | Fix Flutter constraints, spacing, scroll structure, adaptive layout, and visual rhythm. |
| `delight [target]` | Enhance | Add memorable product moments without hiding the task. |
| `overdrive [target]` | Enhance | Push a brand or launch surface past conventional mobile templates. |
| `clarify [target]` | Fix | Improve labels, errors, empty states, confirmations, and UX copy. |
| `adapt [target]` | Fix | Adapt screens for phones, tablets, desktop windows, orientation, text scale, RTL, input modes, and platform conventions. |
| `optimize [target]` | Fix | Diagnose and fix Flutter UI performance, jank, rebuilds, and list behavior. |

`live` is intentionally not a Flutter command here. Browser DOM picking, CSS injection, CSP handling, and carbonizing variants do not apply to native Flutter. For visual iteration, locate the widget in code, create variants behind clean widget/theme boundaries, and validate with screenshots, widget tests, golden tests, or Flutter Inspector evidence.

## Routing rules

1. **No argument** - render the command table grouped by category and ask what the user wants to do.
2. **First word matches a command** - follow that command intent. Everything after the command name is the target.
3. **First word does not match** - treat it as a general Flutter UI design request. Apply setup, register, Flutter design laws, and the full argument as context.

## Execution protocol

When building or modifying Flutter UI:

1. Read existing app structure before writing code: app root, theme files, route/screen/widget files, tests, state management, localization, and nearby patterns.
2. Identify the register and color/theme strategy.
3. Make the smallest coherent implementation that improves the actual user experience.
4. Prefer existing project conventions over new abstractions.
5. Keep changes theme-aware, accessible, localized where applicable, adaptive, and testable.
6. Verify with the narrowest meaningful commands first, then broader checks when appropriate.

Common verification commands:

```bash
flutter analyze
flutter test
flutter test test/path/to/widget_test.dart
flutter test --update-goldens
```

Only update goldens when the visual change is intentional. Report the affected golden files.

## Web-to-Flutter translation guide

| Web concept | Flutter equivalent |
|---|---|
| DOM tree | Widget tree plus Element and RenderObject trees |
| CSS variables | ThemeData, ColorScheme, TextTheme, ThemeExtension |
| CSS flexbox | Row, Column, Flex, Expanded, Flexible |
| CSS grid | GridView, SliverGrid, Wrap, custom slivers |
| CSS media queries | MediaQuery, LayoutBuilder, OrientationBuilder, adaptive breakpoints |
| CSS selectors | Widget composition, inherited theme, component constructors |
| Browser focus and ARIA | Focus, Shortcuts, Actions, Semantics, Tooltip |
| DOM live mode | Widget locate, Flutter Inspector, screenshot/golden iteration |
| CSS transitions | implicit animations, AnimationController, Curves, Tween |
| Web performance | rebuild scope, frame budget, lazy builders, image cache, shader jank |

Do not import web-only instructions into Flutter work. No CSP fixes, no `@scope`, no inline style injection, no DOM selectors, no `background-clip: text`, no viewport-only thinking.
