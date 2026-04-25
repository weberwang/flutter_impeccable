Improve Flutter typography through TextTheme, hierarchy, readability, and localization resilience.

## Check

- TextTheme roles are used consistently.
- Display, headline, title, body, and label styles have clear hierarchy.
- Font families from pubspec.yaml are loaded intentionally.
- Text survives larger text scaling.
- Long localized strings wrap or truncate intentionally.
- Buttons and chips do not rely on fixed widths for labels.

Prefer Theme.of(context).textTheme and app-level typography tokens over local TextStyle copies.
