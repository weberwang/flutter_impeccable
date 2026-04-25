# Product Register

Use this register when design serves a Flutter app task: forms, settings, authenticated flows, dashboards, editors, lists, account management, transactions, and operational tools.

The bar is earned familiarity. A fluent mobile user should trust the screen immediately. Familiar Material 3 patterns, readable density, predictable navigation, and resilient states beat novelty.

## Flutter Product Priorities

- Use the existing app shell, router, state management, and theme conventions.
- Prefer Material 3 component vocabulary unless the app is already Cupertino-led.
- Keep primary actions reachable, especially on phones and when the keyboard is open.
- Make loading, empty, error, offline, and permission states first-class.
- Preserve task flow. Motion and decoration should communicate state, not delay work.

## Product Bans

- Invented controls where a native component already solves the job.
- Icon-only navigation with no labels when discoverability matters.
- Full-screen visual flourishes in dense task flows.
- Custom gestures with no visible fallback.
- Fixed-size layouts that ignore text scaling or localization.
