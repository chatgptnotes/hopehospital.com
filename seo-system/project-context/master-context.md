# Hope Hospital — SEO Master Context (Claude's brain)

Every SEO workflow reads this file first. It is the single source of truth for
who Hope Hospital is, what matters, and the rules that must never be broken.

## The hospital
- **Hope Hospital**, Teka Naka, Kamptee Road, Nagpur – 440026, Maharashtra.
- Central India's first **NABH-accredited** super-specialty hospital. Est. 2004,
  NABH since 2012. 200+ beds, 30 ICU beds, 3 modular OTs.
- Phone: 071-22980073 / +91-9823555053. Site: https://www.hopehospital.com
- **Google rating: 3.9★ / 402 reviews** (the true figure — never overstate it).
- Led by **Dr. B.K. Murali** (MS Ortho, founder, 5000+ surgeries). Other named
  doctors include Dr. Akshay Akulwar (colorectal).

## Departments & service pages
- Departments: orthopedics, neurosurgery, cardiology, critical-care, oncology,
  nephrology, gastroenterology, colorectal-surgery, minimal-invasive-surgery,
  mother-child-care.
- Service landing pages: cancer-treatment (now "cancer surgery"), cardiac-surgery,
  knee/hip-replacement, kidney-transplant, gastroenterology, neurosurgery,
  maternity, laparoscopic.
- Sub-brands referenced on site: Zion Cardiac Centre, Nagpur Cancer Institute,
  NephroPlus (dialysis/transplant), Hope Neurology.

## Priorities (from the May 2026 Google Search Console review)
1. **Branded search ("hope hospital nagpur") = #1**, ~33% of clicks. Protect it.
2. **Ayushman Bharat / PMJAY cluster = top growth driver** (free-treatment,
   package-list, surgery-list queries). Highest business value.
3. **Nephrology = striking distance** (pos ~9–12 for "nephrologist nagpur" etc.) —
   needs content depth + internal links, not title tweaks.
4. **"free cancer treatment in nagpur"** — page-1, 0 clicks → snippet/intent work
   (the oncology page now targets this).
5. Generic head terms like "best hospital in nagpur" are page-2 and low-priority
   (long, slow, low-intent) — do not over-invest.

## Prioritization model — SEO-RICE
Score every candidate task:
`score = (search_demand × position_opportunity × business_value) ÷ effort`
- **business_value** weights Ayushman/PMJAY and branded highest, then
  striking-distance departments (nephrology, ortho, oncology), then the rest.
- Always show the score + a one-line reason so the ranking is explainable.

## HARD CONSTRAINTS (never violate)
- **YMYL/medical:** never finalise a medical claim without doctor review.
- **No Hindi/Devanagari** anywhere on the website (even for Hindi queries).
- **No new location/branch pages** (Ramdaspeth, Pandurna, etc.) without an
  explicit ask — even if an audit suggests it.
- **No review/aggregateRating schema on blog articles** (Google self-serving-review
  policy). Articles legitimately show no stars.
- **Rating is 3.9★ / 402 reviews** everywhere — never inflate.
- **No commit or push without the user's explicit instruction** (site is live).

## How the daily workflow runs
1. `npm run audit` → `seo-system/reports/seo-audit-<date>.md` (the facts).
2. Read this file + `learnings.md` (what has worked before).
3. Produce an SEO-RICE-ranked task list (see `.claude/commands/daily-seo.md`).
4. After making approved changes, log them to `change-ledger.md` so outcomes can
   be measured weeks later and fed back into `learnings.md`.
