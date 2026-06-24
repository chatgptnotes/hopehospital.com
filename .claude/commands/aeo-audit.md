---
description: Site-wide AEO (Answer-Engine Optimization) scorecard — how citable every page is by AI engines, with prioritized fixes
---

This is the **AEO workflow** of the Hope Hospital SEO operating system. AEO = Answer
Engine Optimization: how likely each page is to be **cited by AI engines** (ChatGPT,
Gemini, Perplexity, Google AI Overviews). This is the **all-pages** view; for a deep
single-page audit use `/geo-audit <page>`, and to generate the fix use `/schema-generate <page>`.

## Steps
1. Run `npm run aeo` (Bash) → `node seo-system/scripts/aeo-scorecard.js`. It scores every
   indexable page and writes `seo-system/reports/aeo-scorecard-<today>.md`.
2. Read that report.
3. Read `seo-system/project-context/master-context.md` (priorities + hard constraints)
   and `learnings.md` (a named credentialed reviewer is the validated EEAT/AEO lever).

## What the score measures (per page, /10)
MedicalWebPage (+2) · FAQPage or ≥3 FAQ (+2) · named author/medical reviewer (+1.5) ·
MedicalProcedure/Condition (+1) · ≥30% question-form headings (+1) · entity clarity
(Nagpur/NABH/Ayushman/Hope Hospital, +1) · Hospital/MedicalClinic (+0.5) · BreadcrumbList
(+0.5) · ≥600 words (+0.5).

## Output — a prioritized AEO plan
- **Site-wide readiness: X/10** + the 🟢/🟡/🔴 split, and the per-section table.
- **Weakest pages** (🔴) and the one or two gaps capping each.
- **Fixes, grouped by gating** (this is the key framing):
  - **🔧 Safe now** — schema-only, no medical claims, no sign-off (e.g. add `MedicalWebPage`
    to an under-schema'd page; convert statement headings to question form). Use `/schema-generate`.
  - **🩺 Doctor-gated** — anything needing a **named medical reviewer** or a clinical claim
    (disease pages' `reviewedBy`, doctor `MedicalProcedure`, service reviewers). Route to a
    sign-off packet; do NOT publish a named reviewer or clinical claim without sign-off.
  - **🧊 Skip** — listing/navigation pages (blog/index, doctors/index) and dated PR pages:
    low AEO relevance by nature; schema there is wasted effort.

## Rules
- **Generate/plan only** — do not edit pages or commit until the user approves.
- Respect hard constraints: **no review/aggregateRating schema on blog articles**; medical
  content needs **doctor sign-off**; **no Hindi**; rating 4.0/433. Only true facts — never
  invent a doctor/reviewer/procedure; where real data is missing, **flag for doctor sign-off**.
- After approved edits, remind the user to log each to `change-ledger.md`. Site auto-deploys
  on push to `main`, so keep edits local + verified until approved.
