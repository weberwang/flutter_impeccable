Adapt Flutter mobile/native screens across device classes, orientations, input modes, text scaling, and platform expectations.

## Assess The Target

Identify:

- Source screen or widget and the original assumptions.
- Target devices: small phone, large phone, tablet, foldable, landscape, desktop-class window.
- Input: touch, keyboard, mouse or trackpad, assistive tech.
- State pressure: keyboard open, loading, empty, error, long localized text, high text scale.
- Existing app patterns: NavigationBar, NavigationRail, Drawer, master-detail, tabs, slivers.

## Flutter Adaptation Strategy

### Phones

- Use SafeArea for edge-to-edge screens.
- Keep primary actions reachable near the bottom when the flow allows it.
- Use scrollable content when vertical space can shrink.
- Avoid two-column forms unless each column remains readable.
- Account for keyboard insets with Scaffold resize behavior, scroll padding, and focus reveal.

### Large Phones and Landscape

- Do not simply stretch content. Add max widths or center content when reading is the primary task.
- Use two-pane layouts only when both panes remain useful.
- Reposition secondary actions instead of hiding them.

### Tablets and Foldables

- Consider NavigationRail, persistent side panels, master-detail, or split views.
- Use LayoutBuilder constraints rather than raw screen categories.
- Respect hinge and display features when the project supports foldables.
- Keep touch targets large even in denser layouts.

### Text Scaling and Localization

- Test at larger text scale. Do not clamp text to unreadable sizes.
- Prefer flexible layout over fixed button widths.
- Let labels wrap where possible. Use overflow only when truncation is acceptable.
- Check RTL: directional icons, EdgeInsetsDirectional, AlignmentDirectional, and text direction.

### Platform Expectations

- Android: system back, Material navigation, ripple or state feedback, permission flows.
- iOS: safe areas, large titles where established, swipe back, Cupertino patterns when the app uses them.
- Shared Flutter: consistency of theme and state behavior matters more than platform mimicry.

## Implementation Patterns

Prefer:

- LayoutBuilder for local constraints.
- MediaQuery for text scale, padding, insets, platform brightness, and view metrics.
- SafeArea and SliverSafeArea for system UI.
- CustomScrollView and slivers for complex scroll surfaces.
- Expanded, Flexible, Wrap, FractionallySizedBox, ConstrainedBox, and IntrinsicHeight sparingly.
- NavigationBar, NavigationRail, Drawer, TabBar, and BottomSheet according to device class.

Avoid:

- Magic pixel breakpoints without testing the actual content.
- Fixed screen-wide SizedBox values.
- Hiding core actions on small screens.
- Gesture-only functionality.
- Scroll views nested without a clear physics and constraint model.

## Verification

Verify at minimum:

- Small phone portrait.
- Large phone portrait.
- Phone landscape for critical flows.
- Tablet or large logical width if the app supports it.
- Keyboard open on forms.
- Text scaling increased.
- Light and dark theme.
- RTL if localization exists.
