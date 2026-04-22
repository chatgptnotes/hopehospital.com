const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Hope Hospital - Daily Work Report (13 April 2026)</title>
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
<div class="subtitle">Date: 13 April 2026 &nbsp;|&nbsp; Maintainer: Himanshu &nbsp;|&nbsp; Project: hopehospital.com</div>

<div class="meta">
<strong>Focus of the day:</strong> Performance optimization, email privacy, local-SEO fixes, and review of third-party SEO audit findings.
</div>

<h2>1. Performance Optimization (index.html)</h2>

<h3>1a. Font loading (render-blocking fixed)</h3>
<ul>
  <li>Converted Google Fonts (Cinzel + Inter) <code>&lt;link rel="stylesheet"&gt;</code> to async <code>preload + onload</code> swap pattern.</li>
  <li>Added <code>&amp;display=swap</code> to Material Icons URL to eliminate FOIT (flash of invisible text).</li>
  <li><span class="check">Result:</span> <em>render-blocking-insight</em> 0 &rarr; 1.0; <em>font-display-insight</em> 0 &rarr; 1.0.</li>
</ul>

<h3>1b. LCP image + fetchpriority</h3>
<ul>
  <li>Fixed mismatched preload: was preloading <code>phoenix-hero.webp</code> (CSS background), but real LCP element was <code>dr-murali-bk.webp</code>.</li>
  <li>Added correct <code>&lt;link rel="preload" as="image" fetchpriority="high"&gt;</code> for the hero doctor image.</li>
</ul>

<h3>1c. Image resizing (via sharp)</h3>
<table>
  <tr><th>Image</th><th>Before</th><th>After</th><th>Saved</th></tr>
  <tr><td>phoenix-logo.webp</td><td>256x256 / 21 KB</td><td>96x96 / 4 KB</td><td>~17 KB</td></tr>
  <tr><td>dr-murali-bk.webp</td><td>600x600 / 38 KB</td><td>500x500 / 22 KB</td><td>~16 KB</td></tr>
</table>

<h3>1d. CSS extraction + minification</h3>
<ul>
  <li>Extracted ~3,000 lines of inline <code>&lt;style&gt;</code> (two blocks) to external <code>css/styles.css</code>.</li>
  <li>Minified with clean-css: <strong>87 KB &rarr; 48 KB (-44%)</strong>.</li>
  <li>Linked as async non-blocking <code>preload + onload</code> stylesheet.</li>
  <li><code>scripts/build.js</code> already copies <code>css/</code> directory - no change needed.</li>
</ul>

<h3>1e. Lighthouse before / after</h3>
<table>
  <tr><th>Insight</th><th>Before</th><th>After</th></tr>
  <tr><td>Performance score</td><td>0.43</td><td>0.46 - 0.49</td></tr>
  <tr><td>Render-blocking requests</td><td class="cross">0</td><td class="check">1.0</td></tr>
  <tr><td>Font display</td><td class="cross">0</td><td class="check">1.0</td></tr>
  <tr><td>Image delivery</td><td class="warn">0.5</td><td class="check">1.0</td></tr>
  <tr><td>Unminified CSS</td><td class="warn">0.5</td><td class="check">1.0</td></tr>
  <tr><td>Accessibility / SEO / Best-Practices</td><td class="check">1.0</td><td class="check">1.0</td></tr>
</table>
<p class="note">Note: TBT / FCP numbers fluctuate run-to-run on Windows simulate-throttling; the insight-level scores above are the reliable signal.</p>

<h2>2. Build Script Fix (favicon on Vercel)</h2>
<ul>
  <li><strong>Bug:</strong> <code>/favicon.png</code> returned <code>index.html</code> on Vercel because <code>scripts/build.js</code> never copied root-level static files - the catch-all rewrite masked the 404.</li>
  <li><strong>Fix:</strong> Added copy logic for <code>favicon.png</code>, <code>favicon.ico</code>, <code>apple-touch-icon.png</code>, <code>manifest.json</code>, <code>site.webmanifest</code>.</li>
  <li>Verified locally: <code>build/favicon.png</code> now present after <code>npm run build</code>.</li>
</ul>

<h2>3. Email Privacy</h2>
<ul>
  <li>Removed <code>info@hopehospital.com</code> from JSON-LD Hospital schema (optional field).</li>
  <li>Obfuscated visible <code>ruby@drmhope.com</code>: replaced with a <code>&lt;span class="obf-email" data-user data-domain&gt;</code> pattern.</li>
  <li>Added a small JS block at end of <code>&lt;body&gt;</code> that rebuilds the mailto link client-side.</li>
  <li><span class="check">Result:</span> zero plain-text email addresses remain in HTML source. Scrapers see nothing; real users see a working clickable link.</li>
</ul>

<h2>4. Local SEO - Address Visibility</h2>
<ul>
  <li>Converted footer "Visit Us" block from <code>&lt;ul&gt;</code> to semantic <code>&lt;address&gt;</code> element.</li>
  <li>Added full NAP (Name-Address-Phone) as a single parseable block: Hope Hospital, Near Go-Gas Auto LPG-2, Teka Naka, Kamptee Road, Nagpur 440026, Maharashtra, India.</li>
  <li>Phone converted to <code>tel:</code> link for mobile tap-to-call.</li>
</ul>

<h2>5. Audit Items Reviewed &amp; Decisions</h2>
<table>
  <tr><th>Item</th><th>Decision</th><th>Reason</th></tr>
  <tr><td>AMP</td><td>Ignore</td><td>Deprecated by Google 2021</td></tr>
  <tr><td>JavaScript errors ("SyntaxError")</td><td>Ignore</td><td>False positive - audit tool can't parse ES2020 optional chaining; Lighthouse reports 0 console errors</td></tr>
  <tr><td>HTTP/2 usage</td><td>Ignore</td><td>Vercel already serves HTTP/2 (verified via ALPN = h2)</td></tr>
  <tr><td>Inline styles (434 attrs)</td><td>Ignore</td><td>No perf/SEO impact; matches existing tech-stack choice</td></tr>
  <tr><td>Facebook Pixel</td><td>Skip</td><td>Not running FB Ads; would add tracker overhead for zero benefit</td></tr>
  <tr><td>SPF record</td><td>Ignore (false positive)</td><td>Record exists: <code>v=spf1 include:secureserver.net -all</code></td></tr>
  <tr><td>DMARC record</td><td>Action needed (DNS)</td><td>Not set - user to add TXT <code>_dmarc</code> at Vercel DNS, start with <code>p=none</code></td></tr>
  <tr><td>Google Business Profile</td><td>Action needed (ops)</td><td>GBP ownership gap - user to claim/update on business.google.com</td></tr>
</table>

<h2>6. Files Changed (not yet committed)</h2>
<ul>
  <li><code>index.html</code> - font loading, LCP preload, CSS extraction, email obfuscation, footer address, image path updates</li>
  <li><code>css/styles.css</code> (new) - extracted from inline</li>
  <li><code>css/styles.min.css</code> (new) - minified output linked from HTML</li>
  <li><code>images/phoenix-logo-96.webp</code> (new)</li>
  <li><code>images/dr-murali-bk-500.webp</code> (new)</li>
  <li><code>scripts/build.js</code> - added root static file copy block</li>
  <li><code>audit-screens/after-fixes.json</code>, <code>after-fixes2.json</code>, <code>after-css-extract.json</code>, <code>after-async-css.json</code> (new Lighthouse runs)</li>
</ul>

<h2>7. Outstanding / Next Steps</h2>
<ul>
  <li>Visual regression check at <code>http://localhost:8080/</code> with new async CSS path.</li>
  <li>Stage changes and commit (push pending explicit user OK).</li>
  <li>Add DMARC TXT record at Vercel DNS (p=none to start, monitor, then tighten).</li>
  <li>Claim / verify Google Business Profile and set Website field to <code>https://hopehospital.com</code>.</li>
  <li>Optional future: tackle main-thread work / TBT (inherent cost of 7,000-line single-page site - would need restructuring).</li>
</ul>

<div class="footer">
Generated 13 April 2026 &nbsp;&middot;&nbsp; hopehospital.com &nbsp;&middot;&nbsp; himanshuhopehospt.13april.pdf
</div>

</body>
</html>`;

(async () => {
  const outPath = path.join(__dirname, '..', 'himanshuhopehospt.13april.pdf');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
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
