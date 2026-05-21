---
description: Assess a page's GEO / AI-search citation readiness and recommend fixes
argument-hint: <page path, e.g. departments/oncology.html>
---

This is the **GEO audit workflow** of the Hope Hospital SEO operating system.
Assess how ready a page is to be **cited by AI search engines** (ChatGPT, Gemini,
Perplexity) — not just ranked by Google.

## Steps
1. Run `node seo-system/scripts/geo-check.js $ARGUMENTS` (Bash) for the
   deterministic fact sheet.
2. Read `seo-system/project-context/master-context.md` (priorities + hard
   constraints).
3. Read the page itself (`$ARGUMENTS`) to judge answer quality and entity clarity.

## Assess GEO readiness across
- **Schema depth** — MedicalWebPage, FAQPage, Physician, MedicalProcedure /
  MedicalCondition, Hospital, BreadcrumbList.
- **Answer-first formatting** — concise definitions + Q&A blocks AI engines extract.
- **Conversational/question headings** ("What is…", "Is it free under Ayushman?").
- **Entity clarity** — Hope Hospital, Nagpur, NABH, Ayushman, department, doctor.
- **Citable facts** — costs, eligibility, numbers.
- **Author / medical-review authority** (EEAT).

## Output
- **GEO readiness: X/10** with a one-line rationale.
- **Top 3 improvements** — ranked, each with *why* it boosts AI citation.
- **What's already strong.**

## Rules
- Respect hard constraints: **no review schema on blog articles**; medical content
  needs **doctor sign-off**; **no Hindi**; rating is 3.9/399.
- Plan only — do **not** edit files or commit until the user approves.
