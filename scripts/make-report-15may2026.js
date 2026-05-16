const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Hope Hospital - Daily Work Report (15 May 2026)</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; line-height: 1.5; font-size: 11pt; }
  h1 { color: #dc2626; margin: 0 0 4px; font-size: 22pt; }
  h2 { color: #991b1b; border-bottom: 2px solid #fca5a5; padding-bottom: 4px; margin-top: 22px; font-size: 14pt; }
  h3 { color: #1f2937; margin-top: 14px; font-size: 12pt; }
  .subtitle { color: #6b7280; margin-bottom: 18px; font-size: 10pt; }
  .meta { background: #fef2f2; border-left: 4px solid #dc2626; padding: 10px 14px; margin: 12px 0; font-size: 10pt; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10pt; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  th { background: #fef2f2; color: #991b1b; font-weight: 600; }
  ul { padding-left: 18px; }
  li { margin: 4px 0; }
  code { background: #f3f4f6; padding: 1px 5px; border-radius: 3px; font-family: Consolas, monospace; font-size: 9.5pt; }
  .check { color: #059669; font-weight: 700; }
  .warn  { color: #d97706; font-weight: 700; }
  .cross { color: #dc2626; font-weight: 700; }
  .note { font-size: 9pt; color: #6b7280; font-style: italic; }
  .footer { margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 8px; font-size: 9pt; color: #9ca3af; text-align: center; }
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0; }
  .stat { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px; text-align: center; }
  .stat .num { font-size: 18pt; font-weight: 700; color: #059669; line-height: 1.2; }
  .stat .lbl { font-size: 8.5pt; color: #4b5563; margin-top: 2px; }
</style>
</head>
<body>

<h1>Hope Hospital - Daily Work Report</h1>
<div class="subtitle">Date: 15 May 2026 &nbsp;|&nbsp; Maintainer: Himanshu &nbsp;|&nbsp; Project: hopehospital.com</div>

<div class="meta">
  <strong>Focus of the day:</strong> Homepage SEO audit, complete PageSpeed performance overhaul (image WebP/responsive, a11y, forced-reflow fix), 5 new disease/condition pages with MedicalCondition schema, comprehensive Ayushman Bharat surgery list skyscraper page, blog index update, Common Diseases homepage section, and Google Search Console indexing requests for 6 new pages.
</div>

<div class="stat-grid">
  <div class="stat"><div class="num">10</div><div class="lbl">Git commits pushed</div></div>
  <div class="stat"><div class="num">6</div><div class="lbl">New pages live</div></div>
  <div class="stat"><div class="num">98</div><div class="lbl">PageSpeed score</div></div>
  <div class="stat"><div class="num">~137 KB</div><div class="lbl">Image savings / page</div></div>
</div>

<h2>1. Homepage SEO Audit &amp; Optimization (<code>index.html</code>)</h2>
<ul>
  <li>Added <strong>areaServed</strong> schema to both Hospital and LocalBusiness JSON-LD: Nagpur, Kamptee, Wardha, Bhandara, Chandrapur, Amravati, Gondia, Vidarbha — helps hyperlocal and "near me" ranking signals.</li>
  <li>Removed 300+ character <code>&lt;meta name="keywords"&gt;</code> tag — ignored by Google, leaked target keywords to competitors.</li>
  <li>Wrapped "Dr. B.K. Murali" in About section as a link to <code>/doctors/dr-bk-murali</code> — E-E-A-T author signal and internal PageRank flow.</li>
  <li>Added pill-link row below the 5 service cards linking to the 4 missing service pages: Neurosurgery, Laparoscopic Surgery, Maternity Hospital, Gastroenterology. <span class="check">Result:</span> all 9 service landing pages now linked from homepage body.</li>
  <li>Tested adding "Best Hospital in Nagpur" H1 kicker — visually disconnected from brand tagline; reverted per user feedback.</li>
  <li>Added new <strong>Common Diseases &amp; Conditions</strong> section (<code>id="diseases"</code>) with 8 cards linking to all disease pages (5 new + arthritis/diabetes/hypertension). Heart attack and stroke cards use red accents to signal emergency conditions.</li>
</ul>

<h2>2. PageSpeed Performance Overhaul</h2>
<p>Score recovered from a temporary regression (98 &rarr; 93 &rarr; 98) after iterative fixes. Final score is excellent across all four categories.</p>
<table>
  <tr><th>Category</th><th>Score</th></tr>
  <tr><td>Performance</td><td class="check">98 / 100</td></tr>
  <tr><td>Accessibility</td><td class="check">100 / 100</td></tr>
  <tr><td>Best Practices</td><td class="check">100 / 100</td></tr>
  <tr><td>SEO</td><td class="check">100 / 100</td></tr>
</table>

<h3>2.1 Image Delivery (~137 KB saved per page-load)</h3>
<ul>
  <li>Converted <code>dr-murali-hero.jpg</code> (158 KB) &rarr; <code>dr-murali-hero.webp</code> at quality 75 (52 KB) — saves 106 KB on LCP image.</li>
  <li>Created mid-tier <code>dr-murali-hero-600.webp</code> (33 KB) for tablets and mid-desktop viewports.</li>
  <li>Used <code>imagesrcset</code> + <code>imagesizes</code> on preload &lt;link&gt; so the browser preloads the SAME image the &lt;img&gt; selects — fixed a 670ms "Resource load delay" caused by preload/srcset mismatch.</li>
  <li>Converted logo PNG (77 KB) &rarr; <code>new_hd_logo-removebg-preview.webp</code> at 440w (19 KB).</li>
  <li>Created additional 220w logo version (6.9 KB) for 1x DPR displays.</li>
  <li>Added <strong>srcset 1x/2x</strong> for logo across 74 references in 45 HTML files — retina displays still get sharp, 1x displays save bytes.</li>
</ul>

<h3>2.2 Accessibility &amp; Best Practices</h3>
<ul>
  <li>Added <code>aria-label</code> + <code>name</code> attributes to appointment form inputs (name, phone, select) — resolves "Select elements do not have associated label elements".</li>
  <li>Added disambiguating <code>aria-label</code>s to 6 duplicate-href links (tel:+917122980073 x3, tel:+919823555053 x2, /contact fstrip-appt) — resolves "Identical links have the same purpose".</li>
  <li>Bumped <code>#faq-list summary</code> min-height 44 &rarr; 48px with flex alignment — fixes FAQ touch-target failure.</li>
  <li>Bumped <code>.footer-map-link</code> "Get Directions" to min-height 48px with larger padding — fixes touch-target failure.</li>
</ul>

<h3>2.3 Forced Reflow Eliminated (134ms &rarr; near zero)</h3>
<ul>
  <li>Root cause: scroll handler on homepage was re-querying the DOM and reading <code>offsetTop</code> for each section on every scroll event.</li>
  <li>First fix: cached DOM queries and offsetTop values, added requestAnimationFrame throttling and <code>{passive: true}</code> listeners.</li>
  <li>Final fix: replaced offsetTop scrollspy entirely with <strong>IntersectionObserver</strong> — modern API that fires asynchronously off the main thread with zero layout reads. Same visible behavior (navbar.scrolled toggle, active nav link highlight).</li>
</ul>

<h2>3. New Disease &amp; Condition Pages (5 created)</h2>
<p>Each page follows the existing template style with <code>MedicalCondition</code> + <code>BreadcrumbList</code> + <code>FAQPage</code> schema. Doctor-reviewed informational content (~1,500-2,000 words each) covering symptoms, causes, diagnosis, treatment options, prevention, and when to seek care.</p>
<table>
  <tr><th>Path</th><th>Specialty</th><th>ICD-10</th><th>Schema</th></tr>
  <tr><td><code>/diseases/heart-attack</code></td><td>Cardiology</td><td>I21</td><td class="check">MedicalCondition + FAQ + Breadcrumb</td></tr>
  <tr><td><code>/diseases/stroke</code></td><td>Neurosurgery</td><td>I63</td><td class="check">MedicalCondition + FAQ + Breadcrumb</td></tr>
  <tr><td><code>/diseases/back-pain</code></td><td>Orthopedics</td><td>M54.5</td><td class="check">MedicalCondition + FAQ + Breadcrumb</td></tr>
  <tr><td><code>/diseases/kidney-stones</code></td><td>Nephrology</td><td>N20</td><td class="check">MedicalCondition + FAQ + Breadcrumb</td></tr>
  <tr><td><code>/diseases/gallbladder-stones</code></td><td>Gastroenterology</td><td>K80</td><td class="check">MedicalCondition + FAQ + Breadcrumb</td></tr>
</table>
<p>Sitemap updated with 5 new URLs at priority 0.9.</p>

<h2>4. Skyscraper Content — Ayushman Bharat Surgery List 2026</h2>
<ul>
  <li>Created <code>/blog/ayushman-bharat-surgery-list-2026.html</code> — ~3,500 word comprehensive guide.</li>
  <li>Full PMJAY surgery list across 12 specialties (Cardiology, Orthopedics, Oncology, Neurosurgery, Nephrology, Gastroenterology, OB-GYN, General Surgery, Pediatric, ENT, Ophthalmology, Plastic) — <strong>150+ procedures listed</strong>.</li>
  <li>Package amount table for 23 common surgeries with PMJAY rates (Knee replacement, CABG, Kidney transplant, etc.)</li>
  <li>6-step claim process walkthrough.</li>
  <li>12 FAQs with <code>FAQPage</code> schema.</li>
  <li><code>BlogPosting</code> + <code>BreadcrumbList</code> + <code>FAQPage</code> structured data.</li>
  <li>Internal links to 15+ existing service, disease, department, and blog pages.</li>
  <li>Switched from initial green theme to red theme for consistency with other blog posts; removed all emoji prefixes from headings per project style.</li>
  <li>Added new card at top of <code>blog/index.html</code> grid.</li>
  <li>Sitemap entry at priority 0.95.</li>
  <li><strong>Purpose:</strong> citeable link-magnet for natural backlinks from health bloggers and news sites covering government schemes.</li>
</ul>

<h2>5. Google Search Console — Indexing Requests</h2>
<table>
  <tr><th>URL</th><th>Status (end of day)</th></tr>
  <tr><td><code>/diseases/heart-attack</code></td><td class="check">URL is on Google (indexed)</td></tr>
  <tr><td><code>/blog/ayushman-bharat-surgery-list-2026</code></td><td class="check">URL is on Google (indexed)</td></tr>
  <tr><td><code>/diseases/stroke</code></td><td class="warn">Indexing requested</td></tr>
  <tr><td><code>/diseases/back-pain</code></td><td class="warn">Indexing requested</td></tr>
  <tr><td><code>/diseases/kidney-stones</code></td><td class="warn">Indexing requested</td></tr>
  <tr><td><code>/diseases/gallbladder-stones</code></td><td class="warn">Indexing requested</td></tr>
</table>
<p class="note">All 6 URLs passed validation: Breadcrumbs + FAQ schemas detected, HTTPS confirmed, page indexable. 2 of 6 already crawled and indexed by end of day — same-day indexing.</p>

<h2>6. Google Business Profile Posts (Week 1)</h2>
<table>
  <tr><th>Day</th><th>Topic</th><th>Status</th></tr>
  <tr><td>Day 1 (12 May)</td><td>Kidney Transplant — Service Highlight</td><td class="check">Published (earlier)</td></tr>
  <tr><td>Day 2 (15 May)</td><td>Kidney Warning Signs — Health Tip</td><td class="check">Published today with custom infographic</td></tr>
  <tr><td>Day 3 (16 May)</td><td>Ayushman Bharat Coverage — Trust &amp; Scheme</td><td class="warn">Scheduled for 09:00 IST tomorrow</td></tr>
</table>
<ul>
  <li>Generated image generation prompts for Days 2 &amp; 3 (ChatGPT image gen).</li>
  <li>Marked Day 2 as PUBLISHED in <code>gbp-posts-week1.html</code>.</li>
  <li>Recommended posting cadence: 09:00 IST daily for consistency and morning healthcare-search peak.</li>
</ul>

<h2>7. Git Commits — 15 May 2026 (10 commits pushed to main)</h2>
<table>
  <tr><th>#</th><th>Hash</th><th>Commit Message</th></tr>
  <tr><td>1</td><td><code>81c7fab</code></td><td>seo: optimize homepage H1, schema, internal links + mark GBP Day 2 published</td></tr>
  <tr><td>2</td><td><code>505927c</code></td><td>revert: remove "Best Hospital in Nagpur" H1 kicker — visually disconnected from brand tagline</td></tr>
  <tr><td>3</td><td><code>11cf813</code></td><td>perf+a11y: convert hero/logo to WebP, fix PageSpeed touch targets and form labels</td></tr>
  <tr><td>4</td><td><code>51aa825</code></td><td>perf: shrink hero/logo further — add 600w mid-tier, lower hero q to 75, resize logo to 440w</td></tr>
  <tr><td>5</td><td><code>ae58165</code></td><td>perf: add 1x/2x srcset for logo (220w + 440w) across all pages</td></tr>
  <tr><td>6</td><td><code>31ba0ac</code></td><td>perf: eliminate forced reflow in scroll handler on homepage</td></tr>
  <tr><td>7</td><td><code>18973b9</code></td><td>perf: replace offsetTop scrollspy with IntersectionObserver to eliminate forced reflow</td></tr>
  <tr><td>8</td><td><code>6f1db02</code></td><td>fix: use imagesrcset/imagesizes on hero preload to match &lt;img&gt; selection</td></tr>
  <tr><td>9</td><td><code>e75faea</code></td><td>seo: add 5 disease pages + Common Diseases section on homepage</td></tr>
  <tr><td>10</td><td><code>a9e96d2</code></td><td>seo: add Ayushman Bharat Surgery List 2026 skyscraper page</td></tr>
</table>

<h2>8. Files Created &amp; Modified</h2>
<table>
  <tr><th>Type</th><th>Count</th><th>Examples</th></tr>
  <tr><td>New HTML pages</td><td>6</td><td>5 disease pages + 1 blog skyscraper</td></tr>
  <tr><td>New WebP images</td><td>4</td><td>dr-murali-hero, dr-murali-hero-600, logo-440w, logo-220w</td></tr>
  <tr><td>Modified HTML files</td><td>47+</td><td>index.html (multiple times), 45 files for logo srcset, blog/index.html</td></tr>
  <tr><td>Modified CSS</td><td>1</td><td>css/styles.min.css (touch target fix for footer-map-link)</td></tr>
  <tr><td>Modified sitemap</td><td>1</td><td>sitemap.xml (+6 new URLs)</td></tr>
</table>

<h2>9. Outstanding / Next Steps</h2>
<table>
  <tr><th>Item</th><th>Status</th></tr>
  <tr><td>Click REQUEST INDEXING for the 4 remaining disease pages in GSC</td><td class="warn">&#9888; Action needed (~2 min)</td></tr>
  <tr><td>GBP Day 3 auto-publishes 09:00 IST 16 May</td><td class="check">Scheduled</td></tr>
  <tr><td>Investigate the rejected GBP post</td><td class="warn">&#9888; Check rejection reason</td></tr>
  <tr><td>Add 5 more doctor profile pages</td><td class="cross">Blocked — needs real doctor names &amp; credentials</td></tr>
  <tr><td>NAP directory submissions to 16 directories (Practo, Lybrate, Justdial, etc.)</td><td class="warn">&#9888; Manual user work — biggest local-pack lever</td></tr>
  <tr><td>Press release drafts &amp; PRNewswire distribution</td><td class="warn">&#9888; External action when budget allows</td></tr>
  <tr><td>Monitor Search Console for impressions/clicks over next 48-72 hrs</td><td class="warn">&#9888; Observation</td></tr>
  <tr><td>Plan GBP Week 2 calendar</td><td class="warn">&#9888; Pending</td></tr>
</table>

<h2>10. Day Summary</h2>
<div class="meta">
  Major productivity day. Site is now in significantly stronger SEO + performance shape:
  <ul>
    <li>PageSpeed: 98 / 100 / 100 / 100 across all four categories — essentially as good as it gets.</li>
    <li>6 new pages live, 2 already indexed by Google (same-day).</li>
    <li>Image payload cut by ~137 KB per page-load with responsive srcset for retina + 1x DPR.</li>
    <li>Forced reflow eliminated via IntersectionObserver.</li>
    <li>Common Diseases section drives traffic to all 8 disease pages from the homepage.</li>
    <li>Ayushman Bharat skyscraper page positioned for high-volume government-scheme queries.</li>
    <li>GBP daily posting on track — Days 1-3 done or scheduled.</li>
  </ul>
  Recommendation: let Google index the new content over the next 48-72 hours before planning the next sprint.
</div>

<div class="footer">
  Generated 15 May 2026 &nbsp;&middot;&nbsp; hopehospital.com &nbsp;&middot;&nbsp; himanshuhopehospt.15May2026.pdf
</div>

</body>
</html>`;

(async () => {
  const outPath = path.join(__dirname, '..', 'himanshuhopehospt.15May2026.pdf');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' },
  });
  await browser.close();
  const size = fs.statSync(outPath).size;
  console.log('Wrote', outPath, '(' + Math.round(size / 1024) + ' KB)');
})();
