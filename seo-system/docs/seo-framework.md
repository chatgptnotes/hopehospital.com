# Hope Hospital SEO Framework

## Purpose

This framework turns SEO into a repeatable operating process for Hope Hospital. It prioritises qualified patient demand, local trust, and medically accurate information over traffic for its own sake.

## Non-negotiable guardrails

- A doctor must approve new or materially changed medical claims before publication.
- Use the verified rating only: **4.0★ / 434 reviews**. Never add review or `aggregateRating` schema to articles.
- Do not create location/branch pages or use Hindi content without explicit approval.
- Do not commit or deploy without explicit approval.
- Treat Search Console, Google Business Profile, and conversion data as evidence; do not claim performance improvements without data.

## The six pillars

| Pillar | Objective | Standard | Primary evidence |
|---|---|---|---|
| 1. Technical health | Make every important page accessible, indexable, and unambiguous. | Valid self-canonical, one H1, unique title/meta, schema where appropriate, no broken internal links, sitemap coverage. | `npm run audit`, `npm run sitemap -- --check` |
| 2. Information architecture | Make priority services and patient journeys easy for people and crawlers to navigate. | Clear department → service → condition/article pathways; no orphan priority pages. | `npm run links` |
| 3. Content quality | Answer high-intent questions with accurate, doctor-reviewed information. | One clear search intent per page, expert review, dated sources where appropriate, useful FAQs, no unsupported outcomes or guarantees. | Content brief + doctor sign-off |
| 4. Local trust | Be the obvious, consistent choice for local searchers. | Accurate NAP, maintained GBP, real photos/posts, review-response process, authoritative citations. | GBP/dashboard checks |
| 5. Authority & discovery | Earn relevant references and improve discoverability. | Helpful resources, credible local/medical citations, natural internal anchors; no link schemes. | Referring-domain and link review |
| 6. Measurement & learning | Invest effort only where evidence supports it. | Weekly GSC review, change log, outcome review after at least 14 days. | `npm run gsc`, `npm run kpi`, `npm run outcome` |

## Prioritisation: SEO-RICE

Score each candidate task before work begins:

`priority = (search demand × position opportunity × business value) ÷ effort`

Use a 1–5 scale for each input. Business value is highest for branded search and Ayushman/PMJAY patient journeys, followed by nephrology, orthopaedics, and oncology opportunities. A task must include the target page, intended query/need, owner, approval requirement, and measurement date.

## Operating cadence

### Daily — 15 minutes

1. Run `npm run audit` and `npm run sitemap -- --check`.
2. Resolve critical technical issues first.
3. Review one growth opportunity: internal link, snippet improvement, content gap, or GBP item.
4. Log any approved site change in `seo-system/project-context/change-ledger.md`.

### Weekly — 60 minutes

1. Export fresh Google Search Console data to `seo-system/data/` and run `npm run gsc`.
2. Review pages/queries with high impressions and low CTR, plus queries ranking in positions 8–20.
3. Run `npm run links`, select 1–3 high-value under-linked pages, and propose contextual links.
4. Publish only doctor-approved content or medical edits.
5. Review GBP posts, questions, photos, and review replies.

### Monthly — 90 minutes

1. Run `npm run kpi` and `npm run outcome`.
2. Compare results with the measurement date recorded in the change log.
3. Update `learnings.md`: retain successful patterns, stop ineffective work, and revise priorities.
4. Set the next month’s three highest-value initiatives.

## Page lifecycle

| Stage | Required output | Exit criteria |
|---|---|---|
| Discover | Query/theme, intent, business value, competing page check | SEO-RICE score approved |
| Plan | Content or optimisation brief, internal-link targets, schema need | Medical-review requirement identified |
| Create | Draft page/edit with titles, headings, FAQs, links, and metadata | Quality checklist complete |
| Review | Medical, legal/trust, and technical review | Doctor approval recorded when required |
| Publish | Approved deploy, sitemap check, change-log entry | URL is live and indexable |
| Measure | GSC and conversion review after 14+ days | Learning captured and next action decided |

## Core playbooks

### Technical issue

1. Confirm the issue with the audit or browser inspection.
2. Fix the smallest safe scope.
3. Re-run the relevant check.
4. Record the issue, fix, and verification in the change log.

### Low-CTR page

1. Confirm recent impressions and average position in GSC.
2. Match the title and meta description to the searcher’s actual intent; do not overpromise.
3. Preserve the page’s main target topic and canonical URL.
4. Record the baseline, publish date, and 14-day measurement date.

### Striking-distance query (positions 8–20)

1. Check for an existing page that already best serves the intent.
2. Improve the relevant section, evidence, FAQ, and internal links rather than creating duplicate pages.
3. Add no new medical claim without doctor review.
4. Measure ranking, clicks, and impressions after 14+ days.

### Under-linked priority page

1. Use `npm run links` to identify it.
2. Add 2–4 contextual links from relevant, indexable pages using descriptive natural anchors.
3. Do not add sitewide or boilerplate links solely for SEO.
4. Verify the target and rerun the link graph.

## KPI scorecard

| KPI | Cadence | Decision use |
|---|---|---|
| Critical/review technical issues | Daily | Release readiness |
| Indexed sitemap URLs | Weekly | Crawl/indexation coverage |
| Organic clicks, impressions, CTR, average position | Weekly | Opportunity selection |
| Queries in positions 8–20 | Weekly | Optimisation pipeline |
| Priority-page inbound internal links | Weekly | Architecture improvements |
| Calls, appointment requests, and direction actions | Monthly | Business impact |
| GBP reviews, rating, response time | Monthly | Local trust |

## Definition of done

An SEO task is complete only when it has: a documented baseline, approval where required, a verified implementation, a change-log entry, and a scheduled measurement date. Ranking or traffic uplift is an outcome to validate—not an assumption.

## Existing tools

- `npm run audit` — sitewide technical checks.
- `npm run sitemap -- --check` — sitemap validation without writing changes.
- `npm run links` — internal-link graph and under-linked pages.
- `npm run gsc` — Search Console export analysis.
- `npm run kpi` — trend view across reports.
- `npm run outcome` — changes ready for evaluation.
