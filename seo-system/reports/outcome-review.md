# Outcome Review — Hope Hospital — 2026-05-27

GSC data: Pages.csv — match changed pages against it to read current clicks/position.

| Change date | Days ago | Ready? | Page(s) | Change |
|---|--:|:--:|---|---|
| 2026-05-27 | 0 | ⏳ | blog/ayushman-bharat-surgery-list-2026 | added "Download official package list (PDF, 2026)" H2 + dedicated "MJPJAY (Maharashtra)" H2 + 2 FAQ entries (PDF + MJPJAY, schema+visible) + TOC links; bumped dateModified 2026-05-15→2026-05-27 |
| 2026-05-26 | 1 | ⏳ | doctors/index (NEW), index (home), sitemap, departments/gastroenterology, services/gastroenterology-nagpur | created /doctors directory page (ItemList schema) + "Meet Our Doctors" homepage section linking 3 profiles + added /doctors & both profiles to sitemap; switched gastro dept+service reviewer from generic "Gastroenterology Team" to named Physician Dr. Nikhil Khobragade (schema reviewedBy + visible linked byline) |
| 2026-05-26 | 1 | ⏳ | doctors/dr-nikhil-khobragade (NEW), doctors/dr-dheeraj-gupta (NEW) | built 2 real doctor profiles (Gastroenterology + Orthopedics) modeled on dr-bk-murali; Physician + FAQ + Breadcrumb schema, no per-doctor rating; photos sourced from theayushmanhospital.com (user-approved) + hosted locally; added to sitemap |
| 2026-05-25 | 2 | ⏳ | footer layout, sitewide (split Treatments into its own column across 46 pages; footer-grid 4→5 col in styles.min.css + 11 inline copies; added `.footer-col h3` to heading rule; injected the footer CSS block into 9 orphan pages that had footer markup but no styles — blog/index, press-release, 8 diseases; added `text-align:left` to `.footer-main` across 22 files to override an inherited `footer{text-align:center}` that centered the columns; added a flush navy `footer{background:#1B365D;margin:0;padding:0}` reset on 20 pages to neutralize the old `footer{background:dark-gray;padding:2rem 0;margin-top:4-5rem}` that wrapped the navy footer in a gray band + gap — synced `.footer-map-link` (Get Directions button: .45rem/1rem → .75rem/1.25rem + min-height:48px) & `.footer-brand img` (max-width/height) to homepage values, and added responsive @media collapse — all 20 inline-footer pages now match the homepage on desktop & mobile; ROOT CAUSE of the lingering "not matching": non-homepage pages declare `font-family:Inter` but never load Inter → footer text fell back to system font, while homepage uses loaded `Open Sans` — set footer `font-family:'Open Sans',…` on all 20 pages to match) | fixes unbalanced footer (Departments+Treatments crammed in one tall column), h3/h4 heading inconsistency, pre-existing unstyled/stacked footers on blog-index & diseases pages, and centered footer text on blog/diseases pages |
| 2026-05-25 | 2 | ⏳ | reviewCount 402 → 406, sitewide (37 files: all HTML schema + visible "402+" stats, master-context, README, gbp SOPs, .claude/commands, report scripts, audit EXPECTED_REVIEWS) | bumped review count to match live GBP (now 3.9★/406); historical records (ledger, dated reports, 21-May reply log) deliberately left unchanged |
| 2026-05-25 | 2 | ⏳ | departments: nephrology, colorectal-surgery, gastroenterology, minimal-invasive-surgery, mother-child-care | added `MedicalClinic` mainEntity schema (was 5/10, now 10/10) with dept-appropriate availableService + NAP |
| 2026-05-25 | 2 | ⏳ | blog/best-maternity-hospital-nagpur (DELETED) | removed page + sitemap entry + blog cards on home & /blog; added 301 → /services/maternity-hospital-nagpur |
| 2026-05-25 | 2 | ⏳ | blog/choosing-best-hospital-in-nagpur (ranks #7 for best-hospital intent) | fixed stale NAP/E-E-A-T: "50+ Google reviews" ×2 → 402; "established 2005" → 2004; pincode 440017 → 440026; added homepage link in conclusion |
| 2026-05-25 | 2 | ⏳ | index (home) | keyword-first title (`Best Hospital in Nagpur \ |
| 2026-05-21 | 6 | ⏳ | review schema + body, 25 pages | reviewCount 399 → 402 (Google now shows 402); EXPECTED_REVIEWS in audit also bumped |
| 2026-05-21 | 6 | ⏳ | empanelments, index (home), blog/ayushman-bharat-hospitals-nagpur | +3 internal links → ayushman-bharat-surgery-list-2026 (inbound 1 → 4) |
| 2026-05-21 | 6 | ⏳ | blog/knee-replacement-cost-nagpur-2026 | "3.8/5" → "3.9/5" rating text |
| 2026-05-21 | 6 | ⏳ | all 9 service pages (via vercel.json) | added `/services` → `/departments` redirect (breadcrumb was 404) |
| 2026-05-21 | 6 | ⏳ | 24 pages | review rating corrected 4.5★/384 → 3.9★/399 sitewide |
| 2026-05-20 | 7 | ⏳ | departments/oncology | retitled to own "free cancer treatment in nagpur" + free section H2 |
| 2026-05-20 | 7 | ⏳ | services/cancer-treatment-nagpur | retargeted to "cancer surgery / surgical oncology" |
| 2026-05-20 | 7 | ⏳ | blog/ayushman-bharat-surgery-list-2026 | title/meta optimized for "package list" queries |

✅ = 14+ days passed, safe to judge the SEO effect. ⏳ = still too early.

Next: for each ✅ row, read its current GSC metrics, write the result in change-ledger.md's Outcome column, and append the lesson to learnings.md.
