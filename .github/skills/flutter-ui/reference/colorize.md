Improve Flutter color use through ColorScheme, semantic state color, and theme consistency.

## Check

- Colors come from Theme.of(context).colorScheme or ThemeExtension.
- Light and dark themes preserve contrast and meaning.
- Error, warning, success, selected, disabled, and focus states are distinct.
- Decorative color does not compete with primary actions.
- Text contrast remains readable under text scaling and platform brightness.

Avoid scattering hard-coded Color literals through widgets. Consolidate meaningful roles into theme tokens.
