---
description: Review which logged SEO changes worked, and update the learning loop
---

This is the **learning-loop workflow** of the Hope Hospital SEO operating system.
Close the loop: figure out which past changes actually moved the needle.

## Steps
1. Run `node seo-system/scripts/outcome-check.js` (Bash). It lists logged changes
   from `change-ledger.md` and flags which are old enough (14+ days) to judge,
   matched against the GSC export if present.
2. Read `seo-system/reports/outcome-review.md`, `change-ledger.md`, and the latest
   `gsc-insights-*.md` if available.

## Output
For each ✅ ready-to-judge change:
- Its current GSC metrics (position / clicks / CTR) for the affected page(s).
- A verdict: **worked / no effect / hurt**, with the likely reason.
- The exact line to write into `change-ledger.md`'s Outcome column and the lesson
  to append to `learnings.md`.

## Rules
- Only conclude from **real data** — if there's no GSC export (or <14 days), say
  "too early / need data", don't guess a verdict.
- Update `change-ledger.md` / `learnings.md` only after the user approves.
