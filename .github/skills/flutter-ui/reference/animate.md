Add purposeful Flutter motion that communicates state and preserves performance.

## Use For

- State changes.
- Route or step transitions.
- Loading to content transitions.
- Feedback on selection, completion, or error.
- Brand moments that do not block task flow.

## Patterns

- AnimatedSwitcher for content changes.
- AnimatedOpacity, AnimatedSlide, AnimatedScale, and AnimatedContainer for simple state motion.
- Hero for shared element transitions.
- AnimationController when timing or orchestration needs explicit control.
- Curves.easeOutCubic, easeOutQuart-like custom curves, or project motion tokens.

Avoid long decorative animations, undisposed controllers, off-screen tickers, and expensive blur or shader effects without profiling.
