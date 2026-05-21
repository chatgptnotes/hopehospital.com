---
description: Suggest internal-link opportunities for a page (anchors + targets)
argument-hint: <page path, e.g. departments/nephrology.html>
---

This is the **internal-linking workflow** of the Hope Hospital SEO operating
system. Strengthen internal links to consolidate topical authority (a top
priority for nephrology and the Ayushman/PMJAY cluster).

## Steps
1. Run `node seo-system/scripts/link-graph.js $ARGUMENTS` (Bash) for the page's
   inbound/outbound links + high-value pages it doesn't yet link to.
   - With **no argument**, run it bare for the site-wide orphan report.
2. Read `seo-system/project-context/master-context.md` for priorities + constraints.
3. Read the page (`$ARGUMENTS`) to find natural in-content anchor spots.

## Output
- **Links to ADD into this page** — each as `target page` + a natural, keyword-rich
  **anchor** + roughly where in the content it fits. Prioritise links to/from
  priority clusters (nephrology, Ayushman, oncology).
- **Pages that should link TO this page** (if it's under-linked / an orphan).

## Rules
- Only suggest links to pages that actually exist (the script lists them).
- Natural, relevant anchors — no keyword stuffing, no Hindi.
- Plan only — show the exact edits; don't modify files or commit until approved.
  After approved edits, remind the user to log it to `change-ledger.md`.
