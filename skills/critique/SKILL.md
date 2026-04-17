---
name: critique
description: "Evaluate a Flutter page, widget, flow, or screenshot from a UX perspective. Use when the user asks for a design review, launch-readiness critique, page feedback, or flow evaluation, and wants actionable problems ranked by severity rather than immediate code changes."
version: 2.1.1
user-invocable: true
argument-hint: "[area (page, flow, widget, screenshot set...)]"
---

# Flutter UX Critique

## Step 1: Preparation

Invoke `/impeccable` first so the critique follows this repository's design tone and Flutter implementation constraints.

Gather:

- What the page or flow is trying to help the user complete.
- Whether the evidence is screenshot-based, code-based, or both.
- Any critical business constraint such as compliance, conversion, or high-frequency use.

## Step 2: Run Two Independent Assessments

The review should separate experience judgment from implementation evidence.

### Assessment A: Experience Review

Evaluate the visible UI or described flow like a mobile product design director.

Review:

- 3-second comprehension of page purpose
- visual hierarchy and scan path
- information architecture and grouping
- interaction clarity and perceived tap targets
- emotional tone versus product expectations
- state completeness: loading, empty, error, success, refresh
- clarity of copy and action labels

Also run a cognitive-load pass:

- How many primary choices appear at once?
- Is the user forced to hold too much state in working memory?
- Is advanced information progressively disclosed or dumped at once?

### Assessment B: Flutter Evidence Review

Read the relevant Dart files and inspect implementation signals that support or weaken the UX.

Look for:

- hardcoded colors and text styles
- missing `SafeArea` or ScreenUtil usage
- `Navigator.push` or unsafe navigation patterns
- non-hooks Riverpod widgets in UI code
- business logic inside the page layer
- missing i18n for user-visible copy
- missing or weak async state handling
- provider subscriptions that cause excessive rebuild scope

## Step 3: Generate the Combined Critique

Do not dump the two assessments separately. Synthesize them into one report.

### Design Health Score

Score the following ten heuristics from 0 to 4.

| #         | Heuristic                          | Score     | Key Issue         |
| --------- | ---------------------------------- | --------- | ----------------- |
| 1         | Page purpose visible immediately   | ?         |                   |
| 2         | Language matches user mental model | ?         |                   |
| 3         | User control and recovery          | ?         |                   |
| 4         | Consistency with project patterns  | ?         |                   |
| 5         | Error prevention                   | ?         |                   |
| 6         | Recognition over recall            | ?         |                   |
| 7         | Efficiency for repeat use          | ?         |                   |
| 8         | Visual clarity and restraint       | ?         |                   |
| 9         | Error recovery and feedback        | ?         |                   |
| 10        | Guidance and helpfulness           | ?         |                   |
| **Total** |                                    | **??/40** | **[Rating band]** |

### Overall Impression

Write one short paragraph covering what works, what feels off, and the biggest leverage point.

### What's Working

List 2 to 3 specific strengths tied to actual UI evidence.

### Priority Issues

List the top 3 to 5 problems in severity order.

For each issue include:

- Severity `P0` to `P3`
- What the problem is
- Why it matters to the user
- How to fix it in Flutter terms
- Suggested next skill

### Persona Red Flags

Choose 2 to 3 relevant personas for the flow, such as first-time driver, fleet operator, finance approver, or high-frequency dispatcher.

For each persona, describe exactly where they would hesitate, misread, or mis-tap.

### Minor Observations

Small but real issues worth addressing later.

### Questions to Consider

Ask provocative, product-useful questions that could unlock a better design direction.

## Step 4: Ask Focused Follow-Ups

After the critique, ask at most 2 to 4 questions only if the next step is ambiguous.

Good follow-ups are:

- Which issue cluster matters most right now: hierarchy, copy, or state feedback?
- Should the page stay conservative and operational, or can it become more expressive?
- Do you want to fix only the top 3 issues or address the whole surface?

## Step 5: Recommend Action Sequence

Map findings to concrete skills such as:

- `/layout`
- `/clarify`
- `/distill`
- `/adapt`
- `/polish`
- `/logistics-flutter-development`

End with `/polish` when a build-ready pass is appropriate.

## Rules

- Be direct. Do not soften real UX problems.
- Use Flutter page, widget, state, provider, and route language instead of web layout jargon.
- Do not rely on browser tabs, DOM inspection, or web-only CLI tooling.
- Keep the critique tied to mobile product behavior, not abstract aesthetics.
