---
description: Create a GEO-structured, doctor-reviewable medical content brief
argument-hint: <topic, e.g. "free dialysis under Ayushman in Nagpur">
---

This is the **content-brief workflow** of the Hope Hospital SEO operating system.
Produce a brief for a new/expanded page that ranks in Google **and** is citable by
AI engines — built on topical authority, not thin content.

## Steps
1. Read `seo-system/project-context/master-context.md` (priorities + hard constraints).
2. Check existing pages for the topic (avoid cannibalization — if a page already
   targets it, recommend *expanding* that page instead of a new one).

## Output — the brief
- **Target query + intent** and the AI-question form ("Is X free under Ayushman?").
- **Canonical structure** (GEO content model): What is it · Who needs it · Symptoms
  · Treatment options · Recovery · Cost · Ayushman/PMJAY availability · FAQ ·
  Emergency signs.
- **Answer-first lead** — the 2-sentence direct answer for AI extraction.
- **Internal links** to add (from/to the cluster) and **schema** to include
  (run `/schema-generate` after).
- **Citable facts to confirm** — costs, eligibility, doctor names — flagged for
  **doctor sign-off**.

## Rules
- **YMYL:** all medical content is doctor-reviewed before publish — mark every
  clinical claim as "verify with doctor".
- **No new location/branch pages** without an explicit ask. **No Hindi.**
- Brief only — do not write or publish the page until approved.
