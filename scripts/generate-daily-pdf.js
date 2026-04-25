const puppeteer = require('puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #fff; padding: 40px 50px; }
  .header { border-bottom: 3px solid #1a4273; padding-bottom: 18px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end; }
  .header h1 { font-size: 22px; color: #1a4273; font-weight: 700; }
  .header .meta { font-size: 12px; color: #666; text-align: right; line-height: 1.8; }
  .badge { display: inline-block; background: #1a4273; color: #fff; font-size: 10px; padding: 3px 10px; border-radius: 12px; font-weight: 600; letter-spacing: .5px; }
  .section { margin-bottom: 26px; }
  .section-title { font-size: 13px; font-weight: 700; color: #1a4273; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #f4a623; padding-left: 10px; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { background: #1a4273; color: #fff; padding: 8px 12px; text-align: left; font-weight: 600; font-size: 11px; }
  td { padding: 7px 12px; border-bottom: 1px solid #e8ecf0; vertical-align: top; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .tag-done { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }
  .tag-waiting { background: #fef9c3; color: #854d0e; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }
  .tag-pushed { background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }
  .score-row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 10px; }
  .score-card { background: #f7f9fc; border: 1px solid #dde3ea; border-radius: 8px; padding: 10px 16px; min-width: 120px; text-align: center; }
  .score-card .label { font-size: 10px; color: #666; margin-bottom: 4px; }
  .score-card .val { font-size: 22px; font-weight: 700; color: #1a4273; }
  .score-card .old { font-size: 10px; color: #999; }
  .commit-box { background: #f0f4ff; border: 1px solid #c7d4f0; border-radius: 6px; padding: 10px 14px; font-family: monospace; font-size: 11px; color: #1a4273; margin-top: 8px; }
  .footer { margin-top: 36px; border-top: 1px solid #dde3ea; padding-top: 14px; font-size: 10px; color: #999; display: flex; justify-content: space-between; }
  ul { padding-left: 18px; }
  li { font-size: 12px; margin-bottom: 4px; line-height: 1.6; }
  .rank-box { background: linear-gradient(135deg, #1a4273, #2563eb); color: #fff; border-radius: 10px; padding: 14px 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 20px; }
  .rank-box .r-item { text-align: center; }
  .rank-box .r-val { font-size: 28px; font-weight: 700; }
  .rank-box .r-label { font-size: 10px; opacity: .8; }
  .rank-box .arrow { font-size: 28px; opacity: .6; }
</style>
</head>
<body>

<div class="header">
  <div>
    <h1>Hope Hospital — Daily Work Report</h1>
    <div style="margin-top:5px"><span class="badge">SEO &amp; Performance Sprint</span></div>
  </div>
  <div class="meta">
    <strong>Date:</strong> 24 April 2026<br>
    <strong>Prepared by:</strong> Himansh / Hope Hospital<br>
    <strong>Website:</strong> hopehospital.com
  </div>
</div>

<!-- Ranking -->
<div class="rank-box">
  <div class="r-item"><div class="r-val">#39</div><div class="r-label">Baseline (15 Apr)</div></div>
  <div class="arrow">→</div>
  <div class="r-item"><div class="r-val">#25</div><div class="r-label">Today (24 Apr)</div></div>
  <div class="arrow" style="opacity:.3">→</div>
  <div class="r-item"><div class="r-val">Top 10</div><div class="r-label">Target</div></div>
  <div style="margin-left:auto;font-size:12px;opacity:.85;max-width:200px;line-height:1.6">
    Keyword: "best hospital in Nagpur"<br>↑ Moved up 14 positions in 9 days
  </div>
</div>

<!-- PageSpeed -->
<div class="section">
  <div class="section-title">PageSpeed / Core Web Vitals Improvements</div>
  <div class="score-row">
    <div class="score-card"><div class="label">Homepage Desktop</div><div class="val">98</div><div class="old">was 56</div></div>
    <div class="score-card"><div class="label">Homepage Mobile</div><div class="val">84</div><div class="old">was 72</div></div>
    <div class="score-card"><div class="label">/departments Mobile</div><div class="val">80</div><div class="old">was 72</div></div>
  </div>
  <table>
    <tr><th>Fix Applied</th><th>Pages</th><th>Impact</th><th>Status</th></tr>
    <tr><td>font-display: swap → optional (eliminates FOUT/CLS)</td><td>All 27 pages</td><td>CLS 0.177 → 0.007</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Preloader removed (was masking FCP, Speed Index 8.7s)</td><td>All 27 pages</td><td>Speed Index 8.7s → fast</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>fetchpriority="high" removed from logo img (5 competing resources)</td><td>index.html</td><td>LCP improved</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Removed 3 unused image preloads</td><td>departments.html</td><td>Removed wasted requests</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Fixed hreflang URLs (was pointing to homepage instead of /departments)</td><td>departments.html</td><td>Correct hreflang signals</td><td><span class="tag-pushed">Pushed</span></td></tr>
  </table>
</div>

<!-- SEO -->
<div class="section">
  <div class="section-title">SEO — Title &amp; Meta Description Fixes</div>
  <table>
    <tr><th>Page</th><th>Change</th><th>Status</th></tr>
    <tr><td>Gastroenterology</td><td>Title includes Nagpur + Hope Hospital; meta leads with patient benefit + phone</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Oncology</td><td>Title: "Cancer Treatment Nagpur | Hope Hospital"; meta: Ayushman Bharat mention</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Neurosurgery</td><td>Title: "Brain &amp; Spine Neurosurgery | Hope Hospital Nagpur"</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Critical Care</td><td>Meta: "30-bed ICU, 24/7 emergency, ventilator support"</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Mother &amp; Child Care</td><td>Title + meta updated with Nagpur keyword</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Minimal Invasive Surgery</td><td>Title + meta updated</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>Colorectal Surgery</td><td>Title + meta updated with Dr Akshay Akulwar mention</td><td><span class="tag-pushed">Pushed</span></td></tr>
  </table>
</div>

<!-- Review Button -->
<div class="section">
  <div class="section-title">Review Velocity — Google Review Button</div>
  <table>
    <tr><th>Location</th><th>Placement</th><th>Status</th></tr>
    <tr><td>contact.html</td><td>Prominent mid-page CTA section "Happy With Your Care?"</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>index.html (homepage)</td><td>Strip above footer copyright bar</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>All 16 main/department pages</td><td>Strip above footer-bottom bar</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>4 blog pages</td><td>Strip before &lt;footer&gt;</td><td><span class="tag-pushed">Pushed</span></td></tr>
    <tr><td>3 disease pages</td><td>Strip before &lt;/body&gt;</td><td><span class="tag-pushed">Pushed</span></td></tr>
  </table>
  <div style="margin-top:8px;font-size:11px;color:#666">Review link: https://g.page/r/CXNeWp4Fw2cOEBM/review &nbsp;|&nbsp; Current: 391 reviews · 3.9 stars</div>
</div>

<!-- Schema Fixes -->
<div class="section">
  <div class="section-title">Schema.org Fixes (Homepage — 10 errors → 0)</div>
  <table>
    <tr><th>Schema Type</th><th>Fix</th></tr>
    <tr><td>Hospital</td><td>medicalSpecialty → schema.org enum URLs (e.g. https://schema.org/Orthopedic)</td></tr>
    <tr><td>Hospital</td><td>Removed invalid dateModified property</td></tr>
    <tr><td>Hospital</td><td>openingHours string → openingHoursSpecification object</td></tr>
    <tr><td>Hospital</td><td>reviewCount "389" (string) → 391 (integer); added bestRating: "5"</td></tr>
    <tr><td>Hospital</td><td>Flattened nested OfferCatalog; Service → MedicalProcedure</td></tr>
    <tr><td>Physician</td><td>medicalSpecialty → schema.org enum URLs</td></tr>
    <tr><td>Physician</td><td>reviewCount "389" (string) → 391 (integer)</td></tr>
  </table>
</div>

<!-- GBP -->
<div class="section">
  <div class="section-title">Google Business Profile</div>
  <table>
    <tr><th>Item</th><th>Status</th><th>Next Action</th></tr>
    <tr><td>GBP Ownership Appeal</td><td><span class="tag-waiting">Under Review</span></td><td>Check info@hopehospital.com by 29 Apr 2026</td></tr>
    <tr><td>Local Citations (Justdial, Practo, Sulekha, IndiaMart)</td><td><span class="tag-waiting">Pending</span></td><td>Submit with canonical NAP — next priority</td></tr>
    <tr><td>Patient WhatsApp review campaign</td><td><span class="tag-waiting">Pending</span></td><td>Send review link to every discharged patient</td></tr>
  </table>
</div>

<!-- Commits -->
<div class="section">
  <div class="section-title">Git Commits Today</div>
  <div class="commit-box">
    8373b19 — feat: add Google review button to all 25 site pages<br>
    a498c60 — perf: remove preloader from all pages + fix logo fetchpriority on homepage<br>
    2677bfa — perf: fix font-display swap → optional across all 27 pages<br>
    d670cba — seo: fix departments page (hreflang, unused preloads, stale schema)<br>
    a7d8ceb — seo: update titles and meta for 7 department pages<br>
    1bd2beb — seo: improve nephrology page title, meta description and FAQ schema
  </div>
</div>

<div class="footer">
  <span>Hope Hospital — hopehospital.com</span>
  <span>Report: himanshuhopehospt.24april &nbsp;|&nbsp; Confidential</span>
</div>

</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outPath = path.join(__dirname, '..', 'himanshuhopehospt.24april.pdf');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', bottom: '20px', left: '0px', right: '0px' }
  });
  await browser.close();
  console.log('PDF saved:', outPath);
})();
