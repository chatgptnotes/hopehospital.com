# AEO Checklist — Hope Hospital

**AEO (Answer Engine Optimization)** = being the *cited answer* in AI/voice engines
(ChatGPT, Gemini, Perplexity, Google AI Overviews, voice assistants), not just a ranked link.
Closely overlaps with the `/geo-audit` workflow. Use this as the standing checklist.

---

## ✅ Foundation (already in place — keep it)
- [x] Answer-first leads on blogs (2-sentence direct answer up top)
- [x] Question-form headings ("Is X covered under Ayushman?", "How much does X cost?")
- [x] FAQ Q&A + `FAQPage` schema on key pages
- [x] Clear entities: Hope Hospital · Nagpur · NABH · Ayushman/PMJAY · department · doctor
- [x] Qualifier-safe citable facts ("covered / cashless for eligible cardholders")

## 🎯 Priority 1 — Named, credentialed doctor authority (biggest YMYL/AEO lever)
- [ ] Put the **real specialist** as named author/medical-reviewer on each page
      (cardiology → Dr. Akshay Dalal DM; neuro → Dr. Ritesh Nawghare MCh / Dr. Jivan Kinkar DM;
      ortho → Dr. B.K. Murali; gastro → Dr. Khobragade). Requires the doctors' sign-off.
- [ ] Add `Physician` schema + visible byline + credentials on each.
- [ ] Cancer/kidney: no in-house specialist → lean on NABH + Nagpur Cancer Institute / NephroPlus
      org-level credibility (do NOT name a mismatched doctor).

## 📍 Priority 2 — Off-site signals (local AEO lives here)
- [ ] **Google Business Profile**: complete, regular posts, reply to every review (voice/AI "near me" pulls from GBP).
- [ ] **Consistent NAP** across Practo, Justdial, Lybrate, hospital directories — exact name/address/phone
      (071-22980073 / 9823555053). Inconsistency = AI distrust.
- [ ] **Reviews**: keep volume + recency growing (currently 3.9★ / 415). AI summarizes review sentiment.

## 🧱 Priority 3 — Deepen on-page (incremental)
- [ ] Add an answer-first 2-sentence lead to every department / service / disease page (not just blogs).
- [ ] Expand "Is X / How much / Who" Q&A (e.g. the Ayushman coverage cluster brief).
- [ ] Keep facts specific + current (costs, package amounts, eligibility) — always doctor/PMJAY-desk verified.

## 📊 How to measure AEO (monthly — there is no Search Console for AI)
- [ ] Ask ChatGPT / Gemini / Perplexity the target questions ("free cancer treatment in Nagpur?",
      "best nephrologist in Nagpur?", "is knee replacement free under Ayushman?") → is **Hope named/cited**?
- [ ] In GA4, watch referral traffic from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`.
- [ ] Log findings; re-test after each authority/content change.

## 🚫 Don't over-invest in
- FAQ *rich snippets in Google* — mostly retired; FAQ value is now AI citation + topical depth, not stars.
- Endless schema tweaking on already-strong pages — diminishing returns.
- More content while data is stale — measure first (fresh GSC export), then expand.

---

## Hard constraints (always)
- YMYL: doctor sign-off on every clinical claim. No Hindi. Rating 3.9★ / 415 (never inflate).
- No new location/branch pages without explicit ask. No `aggregateRating`/`Review` schema on blog articles.
- Live-site edits: commit/push only on explicit instruction.

_Created 2026-06-04. Companion to `/geo-audit`. Review quarterly._
