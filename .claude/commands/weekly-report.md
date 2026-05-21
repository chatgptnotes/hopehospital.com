---
description: Build a stakeholder SEO performance report from the latest GSC export
---

This is the **reporting workflow** of the Hope Hospital SEO operating system.
Produce the periodic performance report (the kind shared with Dr. Murali) from
**real Search Console data** — no API, just the export.

## Steps
1. Run `node seo-system/scripts/gsc-insights.js` (Bash). It reads
   `seo-system/data/` and writes `seo-system/reports/gsc-insights-<date>.md`.
   - If it reports "No GSC export found", tell the user to export from Search
     Console (Performance → Export) and drop the CSVs into `seo-system/data/`,
     then **stop**.
2. Read that insights report + `seo-system/project-context/master-context.md` +
   `change-ledger.md` (what we changed recently).

## Output — a clear, non-technical stakeholder report
- **Headline metrics** — clicks, impressions, CTR, avg position.
- **What's working** — top queries/pages.
- **Top opportunities** — striking-distance queries + high-impression/low-CTR
  pages, framed as concrete next actions.
- **What we changed this period** (from change-ledger) and what to expect.
- **Plan for next period.**

Frame ranking honestly: it's not one number; what the user sees on their phone is
personalised vs the true GSC average.

## Rules
- Use **only true numbers** from the export — never fabricate metrics.
- Rating is **3.9 / 399**. **No Hindi.**
- Generate only — don't commit or render to PDF until the user approves.
