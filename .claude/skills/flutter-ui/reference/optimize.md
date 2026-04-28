Diagnose and improve Flutter UI performance. Measure first when possible, then fix the cause rather than adding broad complexity.

## Measurement

Prefer evidence from:

- Flutter DevTools performance view.
- Frame chart, UI thread, raster thread, and shader compilation events.
- `flutter run --profile` on a real device when possible.
- `flutter analyze` and targeted tests.
- User-visible symptoms: slow scroll, delayed input, animation stutter, first-run jank, image pop-in.

If profiling is unavailable, perform a static risk scan and label it as static.

## Common Flutter Bottlenecks

### Rebuild Scope

- Broad setState at screen root for local changes.
- Missing const constructors in stable subtrees.
- Expensive selectors or inherited dependencies that rebuild too much.
- Recreating controllers, focus nodes, futures, streams, formatters, or animations inside build().

### Layout and Paint

- Deep nested layout where a simpler widget would work.
- IntrinsicWidth, IntrinsicHeight, shrinkWrap, and nested scrollables used casually.
- Repeated Clip, Opacity, BackdropFilter, ShaderMask, and large BoxShadow.
- Animated layout changes across large subtrees.

### Lists and Data

- Column with hundreds of children instead of ListView.builder or slivers.
- Missing itemExtent, prototypeItem, or cacheExtent consideration for predictable rows.
- Unbounded images or expensive image decoding during scroll.
- Filtering or sorting large data on every build.

### Images and Assets

- Large source images decoded far beyond display size.
- No placeholder or progressive state for remote images.
- Assets loaded synchronously or repeatedly.
- Too many custom font weights.

### Animation

- Shader compilation jank on first animation.
- Multiple tickers running off-screen.
- AnimationController not disposed.
- Decorative motion competing with input responsiveness.

## Fix Strategy

- Reduce rebuild scope before adding caching.
- Use const widgets where it improves stability and readability.
- Move heavy computation out of build and memoize with clear invalidation.
- Use builders and selectors in the state management style already used by the app.
- Use slivers or builder lists for large content.
- Size images intentionally and cache where appropriate.
- Warm up or simplify shader-heavy effects.
- Keep animation work under frame budget.

## Report

For each issue include:

- Symptom or risk.
- Location.
- Evidence if measured.
- Why it affects UI thread, raster thread, memory, or input latency.
- Minimal fix.
- Verification step.
