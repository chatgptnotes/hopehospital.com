---
description: Generate constraint-safe JSON-LD schema for a page (the fix side of /geo-audit)
argument-hint: <page path, e.g. departments/oncology.html>
---

This is the **schema-generation workflow** of the Hope Hospital SEO operating
system — the *fix* companion to `/geo-audit`. Produce ready-to-paste JSON-LD
structured data so the page is more citable by AI engines and richer in Google.

## Steps
1. Run `node seo-system/scripts/geo-check.js $ARGUMENTS` (Bash) to see which
   schema `@type`s are **already present** — do not duplicate them.
2. Read the page (`$ARGUMENTS`) and extract **real** content for the schema:
   verbatim FAQ Q&A, the procedures/conditions named on the page, address/phone,
   and any named doctor + credentials actually shown.
3. Read `seo-system/project-context/master-context.md` for canonical NAP and the
   hard constraints.

## Generate the missing, relevant types
- `MedicalWebPage`, `BreadcrumbList`, `FAQPage` (built from the page's real FAQs)
- `MedicalProcedure` / `MedicalCondition` (from procedures/conditions named on the page)
- `Physician` (**only** if a real named doctor + credentials appear on the page or
  are provided by the user)
- `Hospital` / `MedicalClinic` (NAP from master-context)

## Output
Each schema as a ready-to-paste `<script type="application/ld+json">` block, plus
exactly where to insert it in the page.

## Rules (hard constraints — never break)
- **NEVER** add review/`aggregateRating` schema to a blog article.
- Use **only true facts**. Do **not** invent doctor names, credentials, ratings,
  or medical claims. Where real data is missing (e.g. a named oncologist), **stop
  and flag** "needs real data + doctor sign-off" rather than guessing.
- Org-level rating, where used, is **3.9 / 415**. **No Hindi.**
- **Generate only** — do not edit the live file or commit until the user approves.
  After approved edits, remind them to log it to `change-ledger.md`.
