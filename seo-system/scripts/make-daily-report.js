#!/usr/bin/env node
/**
 * Generates the daily work report PDF for 21 May 2026.
 *   node seo-system/scripts/make-daily-report.js
 * Output: himanshuhopehospt.21May2026.pdf (repo root, gitignored)
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', '..');
const DATE = '21 May 2026';
const OUT = path.join(ROOT, 'himanshuhopehospt.21May2026.pdf');

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Segoe UI',Arial,sans-serif;color:#1f2937;line-height:1.5;font-size:12px;}
  .wrap{padding:0 4px;}
  .head{border-bottom:4px solid #C10D0D;padding-bottom:12px;margin-bottom:14px;}
  .head h1{font-size:22px;color:#1B365D;}
  .head .meta{color:#6b7280;font-size:12px;margin-top:6px;}
  h2{font-size:14px;color:#fff;background:#1B365D;padding:6px 11px;border-radius:5px;margin:18px 0 9px;}
  .sum{background:#EEF7FD;border-left:4px solid #3BA1D7;padding:9px 13px;border-radius:0 6px 6px 0;margin-bottom:6px;}
  ul{margin:0 0 4px 18px;} li{margin-bottom:4px;}
  .task{font-weight:600;color:#1B365D;}
  .out{color:#166534;font-weight:600;}
  table{width:100%;border-collapse:collapse;margin:6px 0 10px;font-size:11px;}
  th{background:#1B365D;color:#fff;text-align:left;padding:5px 9px;}
  td{padding:5px 9px;border-bottom:1px solid #e5e7eb;vertical-align:top;}
  tr:nth-child(2n) td{background:#f9fafb;}
  code{background:#eef2f7;color:#1B365D;padding:1px 4px;border-radius:3px;font-family:Consolas,monospace;font-size:10px;}
  .footer{margin-top:20px;padding-top:9px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:10px;text-align:center;}
</style></head><body><div class="wrap">

  <div class="head">
    <h1>Daily Work Report — Hope Hospital SEO</h1>
    <div class="meta">${DATE} &nbsp;·&nbsp; hopehospital.com &nbsp;·&nbsp; Prepared for Dr. B. K. Murali</div>
  </div>

  <div class="sum"><strong>Summary:</strong> Fixed several live accuracy/SEO issues, corrected the Google review data, strengthened the Ayushman (top growth) cluster, and built a complete 6-phase AI-assisted SEO automation system. All changes committed and pushed live.</div>

  <h2>1. Review Accuracy &amp; Trust Fixes</h2>
  <ul>
    <li><span class="task">Corrected the star rating site-wide.</span> The website's structured data claimed <strong>4.5★</strong> while Google actually shows <strong>3.9★</strong> — a mismatch that risked a Google penalty. Fixed across 24+ pages. <span class="out">→ Removed penalty risk; honest snippets.</span></li>
    <li><span class="task">Removed review schema from blog articles</span> (against Google policy on articles). <span class="out">→ Compliance risk cleared.</span></li>
    <li><span class="task">Updated review count 399 → 402</span> as new patient reviews arrived (Google now shows 402). <span class="out">→ Data stays accurate.</span></li>
  </ul>

  <h2>2. Cancer / Oncology Pages</h2>
  <ul>
    <li><span class="task">Fixed keyword cannibalization.</span> Three cancer pages were competing for the same search. Re-targeted them: the oncology department page now owns <em>"free cancer treatment in Nagpur"</em>; the services page now targets <em>"cancer surgery / surgical oncology"</em>. <span class="out">→ Ranking signals consolidated.</span></li>
    <li><span class="task">Corrected radiation-therapy wording</span> to "by referral" (accuracy on a medical claim). <span class="out">→ Trust / honesty.</span></li>
  </ul>

  <h2>3. Bugs Found &amp; Fixed (by the new audit tool)</h2>
  <ul>
    <li><span class="task">Broken "Services" link</span> (404 on all 9 service pages) — added a redirect. <span class="out">→ Fixed.</span></li>
    <li><span class="task">Stray "3.8/5" rating text</span> on a blog page — corrected to 3.9. <span class="out">→ Fixed.</span></li>
  </ul>

  <h2>4. Ayushman Bharat Cluster (Top Growth Driver)</h2>
  <ul>
    <li><span class="task">Found the Ayushman surgery-list page had only 1 incoming internal link</span> despite being the #1 growth page. Added links from the homepage, the empanelments page, and the sibling Ayushman blog. <span class="out">→ Inbound links 1 → 4; link equity now flows to the growth page.</span></li>
  </ul>

  <h2>5. Sitemap</h2>
  <ul>
    <li><span class="task">Auto-generated the sitemap</span> from the real pages (49 URLs), fixed 2 trailing-slash issues, refreshed dates. <span class="out">→ Always accurate, no manual editing.</span></li>
  </ul>

  <h2>6. Built: AI-Assisted SEO Operating System (main project)</h2>
  <p>A complete, modular system to manage SEO going forward — <strong>6 phases, 10 commands, 7 engines</strong> — kept under <code>seo-system/</code> (not on the public site).</p>
  <table>
    <tr><th style="width:30%">Phase</th><th>Delivered</th></tr>
    <tr><td>1 — Foundation</td><td><code>/daily-seo</code> + audit engine (scans all 49 pages)</td></tr>
    <tr><td>2 — Reporting</td><td><code>/weekly-report</code> + GSC data reader (no API)</td></tr>
    <tr><td>3 — GEO (AI search)</td><td><code>/geo-audit</code> + <code>/schema-generate</code></td></tr>
    <tr><td>4 — Automation</td><td>auto-sitemap + one-command morning run</td></tr>
    <tr><td>5 — AI workflows</td><td><code>/internal-link</code>, <code>/content-brief</code>, <code>/gbp-post</code></td></tr>
    <tr><td>6 — Scaling</td><td><code>/review-outcomes</code> + KPI trends (the learning loop)</td></tr>
  </table>

  <h2>7. Google Business Profile</h2>
  <ul>
    <li><span class="task">Drafted replies for 3 new 5★ reviews</span> (Suresh, Aarti, Shubham) — warm, distinct, no patient details. <span class="out">→ Ready to post in GBP.</span></li>
  </ul>

  <h2>8. Documentation</h2>
  <ul>
    <li><span class="task">Created a full system documentation PDF</span> explaining all phases, commands, and how it works.</li>
  </ul>

  <h2>Result &amp; Status</h2>
  <ul>
    <li>Technical audit now clean: <span class="out">0 urgent issues</span> (down from 10 found this morning).</li>
    <li>All work <strong>committed and pushed to the live site</strong> across the day.</li>
    <li>Google rating accurate at <strong>3.9★ / 415 reviews</strong> everywhere.</li>
  </ul>

  <h2>Next Steps</h2>
  <ul>
    <li>Post the 3 GBP review replies.</li>
    <li>Run <code>/daily-seo</code> each morning; add a weekly Search Console export for real ranking data.</li>
    <li>In ~2 weeks, measure whether today's changes (esp. Ayushman links) improved rankings via <code>/review-outcomes</code>.</li>
  </ul>

  <div class="footer">Hope Hospital — Daily SEO Work Report &nbsp;·&nbsp; ${DATE} &nbsp;·&nbsp; Internal document</div>

</div></body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: OUT, format: 'A4', printBackground: true, margin: { top: '14mm', right: '13mm', bottom: '14mm', left: '13mm' } });
  await browser.close();
  console.log('PDF written: ' + path.basename(OUT));
})();
