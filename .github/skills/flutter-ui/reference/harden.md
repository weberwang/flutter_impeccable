Harden Flutter mobile/native UI against real data, platform behavior, accessibility settings, localization, and failure states.

## Hardening Scan

Test or reason through:

- Very long names, titles, labels, errors, and descriptions.
- Empty strings, missing optional data, null images, missing avatars.
- CJK, emoji, accented text, RTL, and long German-style translations.
- Text scale increases and bold text accessibility settings.
- Keyboard open, orientation changes, app pause/resume, and route restoration.
- Offline, timeout, auth failure, permission denied, and retry states.
- Large lists, pagination, filtering, and search results.

## Flutter Fix Patterns

### Text and Layout

- Use Flexible or Expanded when text must share a row.
- Use softWrap, maxLines, overflow, and TextScaler deliberately.
- Prefer EdgeInsetsDirectional and AlignmentDirectional for localized layouts.
- Make screens scrollable when content can grow.
- Avoid fixed button widths for localized labels.

### Forms

- Preserve input after validation errors.
- Reveal focused fields when the keyboard opens.
- Put errors close to the field and expose them to Semantics.
- Disable or debounce duplicate submissions.
- Handle autofill and platform keyboard types.

### State and Recovery

- Every async surface needs loading, empty, error, retry, and offline states where relevant.
- Permission errors should explain why the permission matters and how to recover.
- Destructive actions should prefer undo when feasible.
- Optimistic updates need rollback paths.

### Localization and RTL

- Use AppLocalizations or the project's established localization layer.
- Do not concatenate translated fragments when grammar can vary.
- Format dates, numbers, and currency through intl or the app's localization helpers.
- Mirror directional icons only when the meaning is directional.

### Platform Lifecycle

- Handle Android back behavior and interrupted flows.
- Respect iOS safe areas and navigation gestures.
- Consider deep links and app resume into partially completed flows.
- Avoid assuming the app starts from a fresh route.

## Verification

Before marking hardened:

- Run flutter analyze when available.
- Run relevant widget or golden tests when available.
- Check a small phone with text scaling increased.
- Check keyboard open on forms.
- Check dark theme if supported.
- Check RTL if localization exists.

Report remaining gaps explicitly rather than pretending perfect coverage.
