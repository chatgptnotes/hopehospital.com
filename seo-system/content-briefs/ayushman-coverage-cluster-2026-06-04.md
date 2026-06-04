# Content Brief — Expand the Ayushman Hub: "Is [X] covered under Ayushman Bharat?" cluster
_Created 2026-06-04 · Status: brief only (not published) · YMYL: figures need doctor/PMJAY-desk sign-off_

**Page to expand (NOT a new page):** `blog/ayushman-bharat-surgery-list-2026.html`
Rationale: it already ranks ~pos 6 and is the #1 click earner. A new page would cannibalize it — so we
add a section + FAQs to the existing hub.

## Target queries + intent
Informational / scheme-coverage intent — people checking if a *specific* procedure is free before
visiting. All show impressions in the GSC export, mostly pos 1–10:

| Query | GSC pos | Already answered on page? |
|---|---|---|
| is endoscopy covered in ayushman card | 9.0 | ❌ add |
| laparoscopic surgery covered in ayushman card | 1.0 | ❌ add |
| c section delivery under ayushman bharat scheme | 9.0 | ❌ add |
| hysterectomy package in ayushman bharat | 10 | ❌ add |
| pmjay cataract surgery | — | ❌ add |
| is knee replacement covered under ayushman bharat | 9.3 | ✅ keep (already in FAQ) |

**AI-question forms to own:** "Is endoscopy covered under Ayushman Bharat?", "Is C-section free under
Ayushman in Nagpur?", "Is cataract surgery covered under PMJAY?"

Existing FAQ (14) already covers: how many surgeries, free surgeries at Hope, package amounts, eligibility,
documents, CABG, kidney transplant, verification time, PDF, MJPJAY list, angioplasty, RIRS, knee package,
orthopedic package list. **Do not duplicate these.**

## What to add — one new section + FAQ block

**New on-page section** (insert after the per-specialty sections, before "Download PDF"):

### H2: "Is Your Procedure Covered Under Ayushman Bharat? — Quick Checker"

**Answer-first lead (2 sentences, for AI extraction):**
> "Most planned and emergency surgeries are covered under Ayushman Bharat (PM-JAY) and MJPJAY — including
> endoscopy, laparoscopic gallbladder and hernia surgery, normal and C-section delivery, hysterectomy,
> cataract surgery, dialysis, and cancer treatment. At Hope Hospital, Nagpur, eligible cardholders pay ₹0
> for covered procedures."

- **Coverage table** (Procedure · Covered? · Indicative package) — reuse figures already on this page / the
  service pages.
- **6 new Q&A** as question-form H3s (these also become FAQPage schema):
  1. Is **endoscopy / colonoscopy / ERCP** covered under Ayushman Bharat?
  2. Is **laparoscopic (gallbladder / hernia / appendix) surgery** covered?
  3. Is **normal delivery and C-section** covered under Ayushman / MJPJAY?
  4. Is **hysterectomy (uterus removal)** covered?
  5. Is **cataract surgery** covered under PMJAY?
  6. Is **dialysis** covered under Ayushman Bharat?

Note: these procedures are already listed as covered + priced elsewhere on this page and on the service
pages — so this is reformatting existing facts into Q&A, **not new medical claims**.

## Internal links to add (cluster reinforcement)
- From new section → `/services/gastroenterology-nagpur` (endoscopy/ERCP), `/services/laparoscopic-surgery-nagpur`
  (gallbladder/hernia), `/services/maternity-hospital-nagpur` (delivery), `/departments/nephrology` (dialysis).
- From those service pages' Ayushman lines → back to this hub anchor (bidirectional).

## Schema (run `/schema-generate` after content approved)
- **6 new `FAQPage` Question entries** appended to the existing FAQ block (14 → 20).
- No new `aggregateRating`/`Review` (blog rule). Bump `dateModified` to publish date.

## 🩺 Citable facts to confirm (doctor / PMJAY-desk sign-off)
- Endoscopy ₹3–6k · Colonoscopy ₹5–10k · ERCP ₹25–60k (from gastro service page — confirm these are the
  PMJAY package rates, not self-pay).
- Cataract ₹6,500–25,000 · Hysterectomy ₹25k–50k · Lap. gallbladder ₹20–35k · Dialysis ₹1,200–2,000/session
  (already on this page's table — confirm still current).
- Coverage yes/no per scheme is admin/insurance fact (low clinical risk), but **confirm each procedure is
  genuinely empaneled at Hope under PM-JAY and MJPJAY**.

## Constraints honored
- Expanding existing page (no cannibalization, no new page). No new location pages. No Hindi. Rating 3.9★/415.
- YMYL: all package figures + coverage claims marked "verify with doctor / PMJAY desk" before publish.

## Next steps
1. Confirm the figures above with Dr. Murali / insurance desk.
2. Run `/schema-generate` for the 6 new FAQ entries.
3. Draft the section for approval → publish → log to `change-ledger.md` → re-check GSC ~3 weeks later.
