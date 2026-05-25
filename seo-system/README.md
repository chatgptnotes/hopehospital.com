# Hope Hospital — SEO Operating System

An AI-assisted SEO operating system for https://www.hopehospital.com. Not a
"morning checklist" — a suite of workflows on a shared brain, with a learning
loop. Lives under `seo-system/` and is excluded from the public site via
`.vercelignore`.

## Philosophy
**Deterministic scripts find the facts · Claude makes the judgments · a human
(and a doctor, for medical claims) approves.** Build one workflow well before
scaling. It's a hospital (YMYL) — accuracy and doctor review beat speed and scale.

## Layout
```
seo-system/
├── project-context/   master-context.md (the brain), change-ledger.md, learnings.md
├── scripts/           deterministic engines (facts)
├── reports/           dated audit / GSC / KPI / outcome reports (history)
├── automation/        scheduling docs
├── gbp/               Google Business Profile drafts
└── data/              raw GSC exports (gitignored)
.claude/commands/      the slash-command workflows
```

## Commands (type in Claude Code chat)
| Command | Phase | Does |
|---|---|---|
| `/daily-seo` | 1 | daily plan across the full SEO surface (all pages) |
| `/weekly-report` | 2 | stakeholder report from real GSC data |
| `/geo-audit <page>` | 3 | AI-search citation readiness of a page |
| `/schema-generate <page>` | 3 | generate constraint-safe JSON-LD |
| `/internal-link <page>` | 5 | internal-link anchor + target suggestions |
| `/content-brief <topic>` | 5 | GEO-structured, doctor-reviewable brief |
| `/gbp-post` | 5 | GBP post + review-reply drafts |
| `/review-outcomes` | 6 | which past changes worked (learning loop) |

## Scripts (run in terminal)
| Command | Does |
|---|---|
| `npm run audit` | technical SEO audit → reports/seo-audit-<date>.md |
| `npm run gsc` | parse GSC export → striking-distance / low-CTR |
| `npm run geo -- <page>` | GEO fact sheet for a page |
| `npm run links [-- <page>]` | internal-link graph / orphan finder |
| `npm run sitemap [-- --check]` | regenerate sitemap.xml (--check = dry run) |
| `npm run kpi` | KPI trend from report history |
| `npm run outcome` | which logged changes are ready to evaluate |
| `npm run seo:morning` | audit + gsc in one go |

## Daily / weekly routine
- **Daily:** `/daily-seo` → work the top tasks → log each change to
  `change-ledger.md` → commit (push on approval).
- **Weekly:** drop a fresh GSC export in `data/` → `/weekly-report`; then
  `/review-outcomes` to update `learnings.md`. `npm run sitemap -- --check` if pages changed.

## Hard constraints (never break)
- Medical content is **doctor-reviewed** before publish (YMYL/EEAT).
- **No Hindi** on the website. **No new location/branch pages** without an ask.
- **No review/aggregateRating schema on blog articles.**
- Rating is **3.9★ / 406 reviews**. **No commit/push without explicit approval.**

## Phase status
1 Foundation ✅ · 2 Reporting ✅ · 3 GEO ✅ · 4 Automation ✅ · 5 AI workflows ✅ ·
6 Scaling/governance ✅

## Onboarding a teammate
Read this file, then `project-context/master-context.md`. Run `npm run audit` and
`/daily-seo` to see the system work. Everything is committed; nothing under
`seo-system/` is served publicly.
