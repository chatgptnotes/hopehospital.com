# Learnings — what actually works for Hope Hospital SEO

Append verdicts here once a change in `change-ledger.md` has had ~1–3 weeks to show
up in GSC. The daily task list reads this so the system stops repeating what
doesn't work and doubles down on what does.

## Confirmed
- _(none yet — first outcomes expected early June 2026)_

## Working hypotheses (not yet proven)
- Ayushman/PMJAY title + meta optimization → ranking lift. **Early-positive (unconfirmed):**
  in the ~27-May snapshot the package-list queries rank well — "ayushman package list 2026" pos 4.5,
  "ayushman bharat rate list 2026" pos 2.6 (43% CTR), "pmjay package list 2026" pos 2.3. Data is
  too close to the 2026-05-20 change to confirm — re-judge with a fresh export.
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
