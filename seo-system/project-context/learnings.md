# Learnings — what actually works for Hope Hospital SEO

Append verdicts here once a change in `change-ledger.md` has had ~1–3 weeks to show
up in GSC. The daily task list reads this so the system stops repeating what
doesn't work and doubles down on what does.

## Confirmed
- ✅ **Ayushman/PMJAY package-list optimization WORKS — double down on this cluster.** Confirmed on the
  28-day export to 2026-06-14. The `ayushman-bharat-surgery-list-2026` blog is the site's top page by
  far: **1,715 clicks (~90% of all site clicks), pos 6.01, 68K impressions.** Targeted package-list
  queries climbed to top-of-page with strong CTR: "ayushman package list 2026" 4.5→**3.19** (13% CTR),
  "ayushman bharat rate list 2026" **2.38** (31% CTR), "pmjay package list 2026" **2.21** (28% CTR).
  The 2026-05-27 "Download PDF 2026" H2 → "ayushman bharat package list pdf 2026" is now the **#1 query
  sitewide (104 clicks, pos 4.94)** — targeting an exact named sub-query and adding the matching on-page
  section/anchor reliably converts to clicks. **Playbook: find adjacent package/PDF/rate/scheme/state
  sub-queries this page nearly ranks for, give each its own H2/anchor/FAQ.**
- ⚠️ **Concentration risk (corollary):** ~87–90% of site clicks ride on this one URL. Compounding it is
  high-ROI, but a second pillar (nephrology — now confirmed, see below) is needed to derisk.
- ✅ **Nephrology IS pillar #2 — CONFIRMED. The CTR-conversion playbook works on a page-1, low-CTR page.**
  GSC 28-day to 2026-06-19 (Insights): nephrology dept = **18 clicks, ↑1,700%**, up from ~0 clicks (it sat
  at 1,745 impressions / 0.8% CTR with the rankings already there). The 2026-06-16 pass — keyword-first
  title + brand/Ayushman-hook meta + named credentialed reviewer (Dr. Milind Dekate) + MedicalCondition
  schema — converted latent impressions into clicks **without new ranking work**. This is the proof of the
  "bottleneck is CTR, not ranking" thesis below: when a page is page-1 but barely clicked, a title/meta/
  reviewer/snippet pass is the lever. **Playbook: find page-1, sub-1.5% CTR pages with real impression
  volume and run this exact pass.** Next nephrology lever = the held depth content (now unblocked — doctor
  data available) + cross-linking the urologist (Dr. Nikose) into the kidney+stone cluster.
- ✅ **Real named doctor profiles (Physician schema + bio) rank and earn — repeatable lever.** 28-day
  export: dr-nikhil-khobragade **16 clicks / pos 5.24**, dr-bk-murali **12 / 4.87**, Gupta & Nikose ranking
  pos 5–9. Named, credentialed profiles are a reliable traffic + E-E-A-T play. **Keep building + cross-linking
  them**, and prefer a named `Physician` reviewer over a generic "Team" (validated: gastro→Khobragade,
  nephrology→Dekate). Now scaled to 23 profiles.
- 📌 **Emerging theme — the bottleneck is shifting from ranking to CTR.** Multiple pages now sit page-1 but
  barely clicked: nephrology dept (1,745 impr, 0.8% CTR), free-cancer blog (pos 5–7, 0 clicks), the Ayushman
  blog's section anchors (2,000+ impr each, ~0% CTR). Next-cycle lever = title/meta/snippet/FAQ CTR work on
  page-1/low-click pages, not chasing new rankings.
- 🔻 **Cancer head terms are not responding — deprioritize.** Despite retitles, a new blog, and cannibalization
  fixes, oncology dept sits pos ~17 and sub-terms (esophageal/ovarian cancer) pos 40+. Freeze further
  head-term investment here until there's a doctor-backed content plan; redirect effort to Ayushman + nephrology.
- 🏁 **Compete on INTENT, not PRESTIGE — "best hospital in nagpur" is a losing battle.** (2026-06-16 competitor
  scan.) The head term is dominated by domain authority Hope can't match: **Meditrina** (#6, stronger backlinks)
  and now **Max Super Speciality Hospital Nagpur** — a national listed chain (19 hospitals / 4,000 beds; it's
  the rebranded ex-**Alexis**, Byramji Town) whose single Nagpur page inherits maxhealthcare.in's national
  authority. A single local hospital cannot out-authority a national chain on a browse term. **Strategy:** stop
  chasing "best hospital in nagpur" (vanity, low-intent, slow); own the high-intent, scheme-specific, local
  long-tail national chains won't localize for — **Ayushman/PMJAY package & cost queries, named local doctors,
  dialysis/kidney cost, "free X under Ayushman"**. That's the durable moat (Hope ranks #1–6 there; Max/Meditrina
  templates don't target it). Hope's edge vs national chains = **speed + local focus**, not authority. Keep the
  homepage clean (de-stuffed 2026-06-16) and let `authority-building-checklist.md` grind in the background.

## Working hypotheses (not yet proven)
- **Nephrology as pillar #2 → NOW CONFIRMED (promoted to "Confirmed" above on 2026-06-19; dept = 18 clicks ↑1,700%).** 28-day export: "kidney specialist in nagpur" **16.8 → 10.8**
  (confirmed lift from the 2026-06-04 specialist-intent retitle). Broader cluster ("best nephrologist in
  nagpur" 11.4, "nephrologist in nagpur" 11.2) flat on 28-day avg but climbing hard in the trailing days
  (24h: best-neph **6.8**, kidney-specialist **10.05**) — real but too recent to confirm. The dept page
  has **1,745 impressions at 0.8% CTR** — high latent demand; the 2026-06-16 title/meta/reviewer/schema
  work targets exactly this. Re-judge ~2026-07-01; the held depth content (pending Dr. Murali) is the
  next lever.
- Resolving keyword cannibalization (distinct titles per page) should consolidate
  ranking signals on the cancer cluster. Note: the 2026-05-20 oncology "free cancer treatment" retitle
  showed **no positive signal** by ~27-May (dept still pos 23.6, query 0 clicks), so on 2026-06-04 it was
  superseded by a cleaner fix (blog = primary, dept = specialist intent). Re-judge with fresh data.

## Process notes
- **The learning loop is blocked without a fresh GSC export.** A stale snapshot (e.g. data from
  ~1 week after a change) can't judge a 14-day outcome — `/review-outcomes` will show changes as
  calendar-"ready" while the data underneath is too early. Refresh the export in `seo-system/data/`
  before trusting any verdict. (Hit on 2026-06-04: 8 changes were 14+ days old but the only export was
  the ~27-May snapshot.)
- **Accuracy/technical fixes have no ranking hypothesis — close them `n/a` immediately**, don't wait
  for data: rating corrections, reviewCount bumps, breadcrumb/404 redirects, rich-data risk fixes.
- Rating/consistency fixes are mechanical and low-risk — batch them.
- The audit's title/meta length thresholds (60/160) are **strict** and produce
  ~50 low-value 🟡 flags. Treat length flags as polish, not bugs; consider raising
  to ~65/165 if the noise gets in the way.
- `review.html` (and similar) are intentional `noindex` + instant-redirect pages —
  their missing meta/schema/sitemap flags were false positives. The audit now
  skips any `noindex` or meta-refresh page. Lesson: always check *intent* before
  "fixing" an audit flag.
