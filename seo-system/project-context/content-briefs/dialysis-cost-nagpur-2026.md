# Content Brief — Dialysis Cost in Nagpur (Ayushman Bharat 2026)

**Status:** Brief only — not written/published. Gated on doctor sign-off + a cash-cost figure
(both captured in `doctor-review/nephrology-dialysis-packet-2026-06-16.md`, Section C).
**Prepared:** 2026-06-18 · **Reviewer (proposed):** Dr. Milind Dekate (Nephrologist) — *verify*
**Format / URL:** blog post → `blog/dialysis-cost-nagpur-2026.html` (matches the cost-guide pattern:
rirs, kidney-transplant-cost, knee-replacement-cost).

## Target query + intent
- **Primary:** "dialysis cost in nagpur" (GSC pos 5.25)
- **Cluster:** "dialysis package in ayushman bharat" (6.05), "ayushman bharat dialysis rate" (10),
  "is dialysis covered under ayushman bharat" (9.1), "pmjay dialysis package" (7.8)
- **Intent:** transactional-informational — *what it costs + is it covered by Ayushman + where.*
- **AI-question form:** "How much does dialysis cost in Nagpur, and is it covered under Ayushman Bharat?"

## Answer-first lead (2 sentences, for AI extraction) — figures verify with doctor
> "Dialysis in Nagpur costs roughly **₹[X]–₹[Y] per session** privately, but is **covered cashless
> under Ayushman Bharat (PM-JAY) and MJPJAY** for eligible cardholders — with no waiting period for
> chronic kidney disease. At Hope Hospital's on-campus NephroPlus unit, hemodialysis is provided at
> standardized scheme rates."

## Canonical structure (GEO content model)
1. What is dialysis / who needs it (CKD stage 5, ESRD) — *verify with doctor*
2. Types — Hemodialysis vs Peritoneal (PD/CAPD) — ⚠️ gated on the "do we offer PD?" question (packet Section A)
3. Dialysis cost in Nagpur 2026 — table: private per-session & per-month **vs** under-scheme (₹0/covered) — *verify*
4. Is dialysis covered under Ayushman Bharat / MJPJAY? — eligibility, no waiting period — *verify*
5. How to get cashless dialysis at Hope — process + documents
6. NephroPlus unit at Hope — on-campus facility (true)
7. FAQ — built from the cluster queries above
8. When to start dialysis / warning signs — *verify with doctor*
9. CTA — Book / Call (no phone in body)

## Internal links
- **Inbound:** departments/nephrology (dialysis mention), services/kidney-transplant-nagpur,
  blog/kidney-transplant-cost-2026 (dialysis section), blog/rirs…, Ayushman surgery-list `#nephrology`.
- **Outbound:** → departments/nephrology (anchor "kidney specialists in Nagpur") · → Dr. Milind Dekate
  profile · → services/kidney-transplant-nagpur (transplant alternative) · → Ayushman surgery-list blog.
- **Cannibalization guard:** kidney-transplant-cost blog keeps *transplant* cost intent; this page owns
  *dialysis* cost. Cross-link, don't overlap.

## Schema (run /schema-generate after sign-off)
BlogPosting + MedicalWebPage + FAQPage + MedicalProcedure (Hemodialysis) + MedicalCondition (CKD/ESRD)
+ BreadcrumbList + reviewedBy Physician (Dr. Dekate). **No aggregateRating** (blog article — hard constraint).

## 🩺 Facts to confirm — doctor/hospital sign-off (all in packet Section C)
1. Private/cash dialysis cost at Hope — ₹___/session, ₹___/month (new figure)
2. Ayushman/MJPJAY dialysis package rate (~₹1,200–2,000/session) — confirm
3. "No waiting period for CKD/ESRD under PMJAY" — confirm
4. PD/CAPD offered on-site? — packet Section A
5. Dr. Dekate as named reviewer/byline — confirm

**YMYL:** every clinical statement is marked *verify with doctor*; nothing ships until signed.
