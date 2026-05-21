# Learnings — what actually works for Hope Hospital SEO

Append verdicts here once a change in `change-ledger.md` has had ~1–3 weeks to show
up in GSC. The daily task list reads this so the system stops repeating what
doesn't work and doubles down on what does.

## Confirmed
- _(none yet — first outcomes expected early June 2026)_

## Working hypotheses (not yet proven)
- Ayushman/PMJAY title + meta optimization → ranking lift (testing via the
  surgery-list page; re-check ~2026-06-03).
- Resolving keyword cannibalization (distinct titles per page) should consolidate
  ranking signals on the cancer cluster.

## Process notes
- Rating/consistency fixes are mechanical and low-risk — batch them.
- The audit's title/meta length thresholds (60/160) are **strict** and produce
  ~50 low-value 🟡 flags. Treat length flags as polish, not bugs; consider raising
  to ~65/165 if the noise gets in the way.
- `review.html` (and similar) are intentional `noindex` + instant-redirect pages —
  their missing meta/schema/sitemap flags were false positives. The audit now
  skips any `noindex` or meta-refresh page. Lesson: always check *intent* before
  "fixing" an audit flag.
