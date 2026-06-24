---
description: Run the SEO audit and return a prioritized daily task list for Hope Hospital
---

This is the **daily operations workflow** of the Hope Hospital **SEO operating
system** — one of several workflows (alongside GEO, schema, content, reporting,
GBP). It is the daily *planner*, not the whole system.

Acting as senior SEO strategist, produce today's prioritized plan across the
**full SEO surface** — technical SEO, GEO / AI-search, local SEO, content,
internal linking, schema, topical authority, GSC performance, and the
Ayushman/PMJAY cluster — not just the technical audit findings.

## Steps
1. Run the audit: `npm run audit` (Bash). It writes
   `seo-system/reports/seo-audit-<today>.md`.
2. Read that fresh report.
3. Read `seo-system/project-context/master-context.md` (priorities + hard
   constraints) and `seo-system/project-context/learnings.md` (what has worked).
4. If `seo-system/data/` contains a GSC export, also read it for real ranking data;
   otherwise skip silently.

## Output — a prioritized task list
Score each candidate task with **SEO-RICE**
(`(search_demand × position_opportunity × business_value) ÷ effort`) and present:

- **🎯 Do now (top 3)** — each with its score and a one-line reason.
- **⚡ Quick wins** — low-effort items worth doing today.
- **🧊 Skip / ignore** — low-value flags (e.g. strict title/meta-length 🟡s) and
  why they're not worth it.
- **🩺 Needs review** — anything touching medical claims (doctor sign-off) or that
  changes live pages (needs the user's approval before editing).

## Rules
- Obey every hard constraint in master-context.md (no Hindi, no new location
  pages, no blog review schema, rating is 4.0/433, no commit/push without
  explicit approval).
- Do NOT edit any file yet — this command only *plans* the day. Wait for the user
  to pick tasks.
- After the user approves and you make changes, remind them to log each change to
  `seo-system/project-context/change-ledger.md`.
