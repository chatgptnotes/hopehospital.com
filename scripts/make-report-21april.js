const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Hope Hospital - Daily Work Report (21 April 2026)</title>
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
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #e5e7eb; }
  th { background: #fef2f2; color: #991b1b; font-weight: 600; }
  ul { padding-left: 18px; }
  li { margin: 4px 0; }
  code { background: #f3f4f6; padding: 1px 5px; border-radius: 3px; font-family: Consolas, monospace; font-size: 9.5pt; }
  .check { color: #059669; font-weight: 700; }
  .warn  { color: #d97706; font-weight: 700; }
  .cross { color: #dc2626; font-weight: 700; }
  .note { font-size: 9pt; color: #6b7280; font-style: italic; }
  .footer { margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 8px; font-size: 9pt; color: #9ca3af; text-align: center; }
</style>
</head>
<body>

<h1>Hope Hospital - Daily Work Report</h1>
<div class="subtitle">Date: 21 April 2026 &nbsp;|&nbsp; Maintainer: Himanshu &nbsp;|&nbsp; Project: hopehospital.com</div>

<div class="meta">
  <strong>Focus of the day:</strong> Dr. B.K. Murali doctor profile page, hero section polish, spacing fixes across all pages, preloader additions, department card links, FAQ schema visible section, and Google Search Console indexing requests.
</div>

<h2>1. Preloader Added to Disease &amp; Nagpur Pages</h2>
<ul>
  <li>Added preloader animation to all disease pages and the Nagpur city page.</li>
  <li><span class="check">Result:</span> Consistent loading experience across the entire site.</li>
</ul>

<h2>2. Dr. B.K. Murali Doctor Profile Page</h2>
<ul>
  <li>Created new page: <code>doctors/dr-bk-murali.html</code></li>
  <li>Added full profile — qualifications (M.S. Ortho), 19+ years experience, specializations, awards, and contact details.</li>
  <li>Added entry to <code>sitemap.xml</code>.</li>
  <li>Added hero photo using <code>DR MURALI-5.jpg</code>, later updated size to 320&times;380px.</li>
</ul>

<h2>3. Department Cards — Learn More &amp; Doctor Links</h2>
<ul>
  <li>Added <strong>Learn More</strong> links to all 10 department cards on <code>departments.html</code>.</li>
  <li>Added <strong>Meet Dr. B.K. Murali</strong> link specifically on the Orthopedics card.</li>
  <li><span class="check">Result:</span> Better internal linking and user navigation.</li>
</ul>

<h2>4. Homepage Hero Section Polish</h2>
<ul>
  <li>Replaced hero doctor image with <code>DR MURALI-2.jpg</code>.</li>
  <li>Removed Call / WhatsApp / Directions chips from hero — tightened layout.</li>
  <li>Iterated image box positioning: tested -60px, -140px, -20px, -30px, -40px margin-top to achieve best fit.</li>
  <li>Final result: image box correctly positioned and proportional on all screen sizes.</li>
</ul>

<h2>5. Spacing &amp; Layout Fixes — All Pages</h2>
<table>
  <tr><th>Change</th><th>Before</th><th>After</th></tr>
  <tr><td>Section padding (global)</td><td>6rem</td><td>3rem</td></tr>
  <tr><td>Paragraph margin-bottom</td><td>1.5rem</td><td>0.75rem</td></tr>
  <tr><td>H2 margin-top</td><td>Default (large)</td><td>Removed / tightened</td></tr>
  <tr><td>Department &amp; doctor pages gaps</td><td>Large section gaps</td><td>Tighter, consistent spacing</td></tr>
</table>
<ul>
  <li>Removed duplicate Dr. Murali intro paragraph on homepage.</li>
  <li>Restored H2 font properties after margin fix to prevent style regression.</li>
</ul>

<h2>6. New Dr. Murali Photos Added</h2>
<ul>
  <li>Added 3 new photos to <code>images/</code> folder:</li>
  <li><code>DR MURALI-3.jpg</code>, <code>DR MURALI-12.jpg</code>, <code>DR MURALI-21.jpg</code></li>
  <li>Used in hero section and doctor profile page.</li>
</ul>

<h2>7. Build Script Fix — doctors/ Directory</h2>
<ul>
  <li>Added <code>doctors/</code> folder to <code>scripts/build.js</code> copy list.</li>
  <li><strong>Root cause:</strong> The new doctor pages were not being deployed to Vercel because the build script didn't include the <code>doctors/</code> directory.</li>
  <li><span class="check">Result:</span> Dr. Murali profile page now deploys correctly on every Vercel build.</li>
</ul>

<h2>8. FAQ Visible Section — Homepage</h2>
<ul>
  <li>Added a visible HTML FAQ accordion section to <code>index.html</code> just above the footer.</li>
  <li>Uses native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> — no JavaScript required.</li>
  <li>8 questions covering: best hospital claim, Dr. Murali credentials, OPD timings, Ayushman Bharat empanelment, insurance/TPAs, medical equipment, appointment booking, and locations.</li>
  <li><strong>Why:</strong> Google's FAQPage schema requires matching visible content on the page — schema was already present but had no visible counterpart.</li>
  <li><span class="check">Result:</span> FAQPage rich result now eligible to appear in Google Search.</li>
</ul>

<h2>9. Google Search Console — Indexing Requests</h2>
<table>
  <tr><th>URL</th><th>Status</th><th>Action</th></tr>
  <tr><td>/departments/oncology</td><td class="check">URL available to Google</td><td>Indexing requested</td></tr>
  <tr><td>/departments/critical-care</td><td class="check">URL available to Google</td><td>Indexing requested</td></tr>
  <tr><td>/departments/neurosurgery</td><td class="warn">Unknown to Google (no sitemap ref at time of check)</td><td>Indexing requested</td></tr>
  <tr><td>/departments/cardiology</td><td class="check">URL available to Google</td><td>Indexing requested</td></tr>
  <tr><td>/departments/orthopedics</td><td class="check">URL available to Google</td><td>Indexing requested</td></tr>
</table>
<p class="note">Note: /departments/neurosurgery IS present in sitemap.xml — GSC message was a timing issue. Will clear once Google recrawls the sitemap.</p>

<h2>10. Git Commits — 21 April 2026</h2>
<table>
  <tr><th>#</th><th>Commit Message</th></tr>
  <tr><td>1</td><td>feat(preloader): add preloader to disease pages and nagpur page</td></tr>
  <tr><td>2</td><td>feat(doctors): add Dr. B.K. Murali profile page + sitemap entry</td></tr>
  <tr><td>3</td><td>fix(departments): add Learn More links to all 10 department cards</td></tr>
  <tr><td>4</td><td>fix(departments): add Meet Dr. B.K. Murali link on orthopedics card</td></tr>
  <tr><td>5</td><td>fix(doctors): update Dr. Murali hero photo to DR MURALI-5.jpg</td></tr>
  <tr><td>6</td><td>fix(doctors): increase Dr. Murali hero photo size to 320x380px</td></tr>
  <tr><td>7</td><td>fix(spacing): reduce section gaps across all department and doctor pages</td></tr>
  <tr><td>8</td><td>fix(spacing): further tighten section gaps on all department/doctor pages</td></tr>
  <tr><td>9</td><td>fix(spacing): remove default h2 margin-top causing large section gaps</td></tr>
  <tr><td>10</td><td>fix(spacing): restore h2 font props + fix inline-block spacing gap</td></tr>
  <tr><td>11</td><td>fix(spacing): reduce global p margin-bottom from 1.5rem to 0.75rem</td></tr>
  <tr><td>12</td><td>fix(spacing): reduce section padding from 6rem to 3rem across all pages</td></tr>
  <tr><td>13</td><td>fix(content): remove duplicate Dr. Murali intro on homepage</td></tr>
  <tr><td>14</td><td>fix(hero): replace hero doctor image with DR MURALI-2.jpg</td></tr>
  <tr><td>15</td><td>fix(hero): move doctor image box higher to -140px margin-top</td></tr>
  <tr><td>16</td><td>fix(hero): remove Call/WhatsApp/Directions chips, tighten hero spacing</td></tr>
  <tr><td>17</td><td>fix(hero): revert image box to previous working state (-140px, 520px)</td></tr>
  <tr><td>18</td><td>fix(hero): adjust image margin-top to -60px to match reduced hero height</td></tr>
  <tr><td>19</td><td>fix(hero): lower image box to -20px margin-top</td></tr>
  <tr><td>20</td><td>fix(hero): move image up 10px to -30px margin-top</td></tr>
  <tr><td>21</td><td>fix(hero): move image up to -40px margin-top</td></tr>
  <tr><td>22</td><td>feat(images): add Dr. Murali photos used in hero and doctor profile pages</td></tr>
  <tr><td>23</td><td>fix(build): add doctors/ to build script so it deploys to Vercel</td></tr>
  <tr><td>24</td><td>feat(seo): add visible FAQ section to homepage matching FAQPage schema</td></tr>
</table>

<h2>11. Outstanding / Next Steps</h2>
<table>
  <tr><th>Item</th><th>Status</th></tr>
  <tr><td>Re-inspect homepage in GSC after FAQ deploy</td><td class="warn">&#9888; Action needed — Request Indexing for homepage</td></tr>
  <tr><td>Request indexing for Dr. Murali doctor page in GSC</td><td class="warn">&#9888; Action needed</td></tr>
  <tr><td>Check back in 3–5 days to confirm department pages indexed</td><td class="warn">&#9888; Pending</td></tr>
  <tr><td>Google Business Profile ownership</td><td class="warn">&#9888; Action needed (ops)</td></tr>
  <tr><td>DMARC TXT DNS record</td><td class="warn">&#9888; Action needed (DNS)</td></tr>
</table>

<div class="footer">
  Generated 21 April 2026 &nbsp;&middot;&nbsp; hopehospital.com &nbsp;&middot;&nbsp; himanshuhopehospt.21april.pdf
</div>

</body>
</html>`;

(async () => {
  const outPath = path.join(__dirname, '..', 'himanshuhopehospt.21april.pdf');
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
