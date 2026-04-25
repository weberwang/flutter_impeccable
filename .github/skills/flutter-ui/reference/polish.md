Perform a final Flutter UI quality pass before shipping.

## Check

- Alignment, spacing, and visual hierarchy.
- ThemeData and component theme consistency.
- TextTheme usage and readable line lengths.
- All interactive states: default, pressed, focused, disabled, loading, error, success.
- Semantics labels for icon-only or custom controls.
- Text scaling, keyboard open, and small screen behavior.
- Light and dark theme if supported.
- No debug prints, dead code, or temporary visual hacks.

## Verify

Run flutter analyze and relevant tests when available. Use the feature yourself on the smallest supported phone size and with larger text.
