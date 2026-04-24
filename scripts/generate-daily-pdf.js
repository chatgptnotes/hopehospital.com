const puppeteer = require('puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; margin: 40px; color: #222; font-size: 13px; }
  h1 { color: #1a56a4; font-size: 20px; border-bottom: 2px solid #1a56a4; padding-bottom: 8px; }
  h2 { color: #1a56a4; font-size: 15px; margin-top: 24px; margin-bottom: 6px; }
  h3 { color: #333; font-size: 13px; margin: 12px 0 4px; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  th { background: #1a56a4; color: #fff; padding: 7px 10px; text-align: left; font-size: 12px; }
  td { padding: 6px 10px; border-bottom: 1px solid #e0e0e0; font-size: 12px; }
  tr:nth-child(even) td { background: #f5f8ff; }
  .badge-green { background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
  .badge-yellow { background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
  .badge-red { background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
  .section { margin-bottom: 20px; }
  ul { margin: 4px 0; padding-left: 20px; }
  li { margin: 3px 0; }
  .header-meta { color: #666; font-size: 12px; margin-top: 4px; }
  .commit { font-family: monospace; font-size: 11px; background: #f3f4f6; padding: 2px 5px; border-radius: 3px; }
  .score-box { display: inline-block; background: #d1fae5; border-radius: 50%; width: 38px; height: 38px; line-height: 38px; text-align: center; font-weight: bold; color: #065f46; font-size: 15px; margin: 0 4px; }
  .score-row { margin: 10px 0; }
  footer { margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; color: #888; font-size: 11px; }
</style>
</head>
<body>

<h1>Hope Hospital Website — Daily Work Report</h1>
<div class="header-meta">
  Date: 23 April 2026 &nbsp;|&nbsp; Site: www.hopehospital.com &nbsp;|&nbsp; Prepared by: Himanshu / Hope Hospital Team
</div>

<div class="section">
<h2>1. PageSpeed Score Summary</h2>
<table>
  <tr>
    <th>Device</th><th>Performance</th><th>Accessibility</th><th>Best Practices</th><th>SEO</th><th>Status</th>
  </tr>
  <tr>
    <td>Desktop</td>
    <td><span class="badge-green">97</span></td>
    <td><span class="badge-green">100</span></td>
    <td><span class="badge-green">100</span></td>
    <td><span class="badge-green">100</span></td>
    <td><span class="badge-green">All Green ✓</span></td>
  </tr>
  <tr>
    <td>Mobile</td>
    <td><span class="badge-yellow">74</span></td>
    <td>–</td><td>–</td><td>–</td>
    <td><span class="badge-yellow">In Progress</span></td>
  </tr>
</table>
<p style="font-size:11px;color:#555;">Starting score before today's work: 41/100 (Desktop). All scores measured via Google PageSpeed Insights / Lighthouse CLI.</p>
</div>

<div class="section">
<h2>2. Core Web Vitals — Desktop (After Fixes)</h2>
<table>
  <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
  <tr><td>LCP (Largest Contentful Paint)</td><td>~1.8s</td><td><span class="badge-green">Good</span></td></tr>
  <tr><td>TBT (Total Blocking Time)</td><td>0 ms</td><td><span class="badge-green">Good</span></td></tr>
  <tr><td>CLS (Cumulative Layout Shift)</td><td>0.001</td><td><span class="badge-green">Good</span></td></tr>
  <tr><td>FCP (First Contentful Paint)</td><td>~1.0s</td><td><span class="badge-green">Good</span></td></tr>
  <tr><td>Speed Index</td><td>~1.4s</td><td><span class="badge-green">Good</span></td></tr>
</table>
</div>

<div class="section">
<h2>3. Performance Fixes Applied</h2>
<table>
  <tr><th>Fix</th><th>Impact</th><th>Status</th></tr>
  <tr><td>Eliminated www→non-www redirect chain</td><td>Saved ~1900ms on first load</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Fixed CSS background image 404 (phoenix-hero, services)</td><td>Images now load correctly</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Preloaded LCP images with fetchpriority="high"</td><td>Faster LCP discovery</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Resized DR Murali image 800×1200 → 500×500</td><td>53KB → 19KB (-64%)</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Compressed logo 530×115 → 300×65</td><td>29KB → 9KB (-69%)</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Inlined Material Icons base styles</td><td>Eliminated icon CLS</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Trimmed Google Fonts weights</td><td>Reduced font payload</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Asset Cache-Control headers in vercel.json</td><td>max-age=31536000 immutable</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Minified all HTML pages</td><td>Reduced HTML payload</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>Added DR-MURALI-2-350.webp srcset for mobile</td><td>19KB → 12KB on mobile (-37%)</td><td><span class="badge-green">Done ✓</span></td></tr>
</table>
</div>

<div class="section">
<h2>4. SEO Fixes Applied</h2>
<table>
  <tr><th>Page</th><th>Fix</th><th>Status</th></tr>
  <tr><td>about.html</td><td>Added H1 tag + fixed title to 55 chars (was duplicate)</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>contact.html</td><td>Added H1 tag</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>departments.html</td><td>Added H1 tag</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>empanelments.html</td><td>Added H1 tag</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>gallery.html</td><td>Added H1 tag</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>hospitals.html</td><td>Added H1 tag</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>nagpur/index.html</td><td>Fixed title length 64 → 47 chars</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>blog/choosing-best-hospital-in-nagpur.html</td><td>Added BlogPosting JSON-LD schema</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>blog/hip-replacement-when-do-you-need-it.html</td><td>Added BlogPosting JSON-LD schema</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>blog/knee-replacement-surgery-nagpur-guide.html</td><td>Added BlogPosting JSON-LD schema</td><td><span class="badge-green">Done ✓</span></td></tr>
  <tr><td>blog/knee-replacement-cost-nagpur-2026.html</td><td>Added BlogPosting JSON-LD schema</td><td><span class="badge-green">Done ✓</span></td></tr>
</table>
</div>

<div class="section">
<h2>5. Issues Investigated &amp; Resolved</h2>
<table>
  <tr><th>Issue</th><th>Root Cause</th><th>Resolution</th></tr>
  <tr><td>CLS 0.133 → 0.001</td><td>Async CSS caused page to render unstyled then shift; Material Icons FOUT</td><td>Reverted to synchronous CSS; inlined Material Icons base styles</td></tr>
  <tr><td>CSS background images 404</td><td>Path <code>url('images/...')</code> resolved relative to /css/ folder</td><td>Fixed to <code>url('../images/...')</code></td></tr>
  <tr><td>LCP not discovered on desktop</td><td>phoenix-hero.webp used as CSS background (invisible to preload scanner)</td><td>Added explicit <code>&lt;link rel="preload"&gt;</code></td></tr>
  <tr><td>Vercel redirect chain</td><td>Incorrect <code>source:"/(.*)"</code> syntax for host-based redirect</td><td>Fixed to <code>source:"/:path*"</code></td></tr>
  <tr><td>CSS preload caused TBT regression</td><td>Early CSS load triggered expensive style recalculation (0ms → 680ms TBT)</td><td>Reverted CSS preload, kept srcset fix</td></tr>
</table>
</div>

<div class="section">
<h2>6. Git Commits Today</h2>
<table>
  <tr><th>Commit</th><th>Description</th></tr>
  <tr><td><span class="commit">756a037</span></td><td>revert: remove CSS preload — caused TBT regression (0ms→680ms)</td></tr>
  <tr><td><span class="commit">aff4951</span></td><td>perf(mobile): preload CSS early, add responsive srcset for mobile LCP</td></tr>
  <tr><td><span class="commit">bd87e1d</span></td><td>seo: add H1 tags, fix titles, add BlogPosting schema to all blog pages</td></tr>
  <tr><td><span class="commit">7efc197</span></td><td>revert: CSS back to synchronous — async CSS caused TBT 0ms→710ms</td></tr>
  <tr><td><span class="commit">b3ac6de</span></td><td>chore: untrack audit JSONs + PDFs, add to .gitignore</td></tr>
  <tr><td><span class="commit">b8bb759</span></td><td>perf: minify all HTML + make CSS async (render-blocking removal)</td></tr>
  <tr><td><span class="commit">9e5caab</span></td><td>perf(logo): resize logo 530×115→300×65, 18KB→9KB (-50%)</td></tr>
  <tr><td><span class="commit">46d698c</span></td><td>perf: fix LCP discovery + compress images further</td></tr>
  <tr><td><span class="commit">164320e</span></td><td>fix: resolve 404 image paths in CSS + accessibility contrast</td></tr>
  <tr><td><span class="commit">6f23e9d</span></td><td>chore: serve from root (no build step) + commit pending page updates</td></tr>
  <tr><td><span class="commit">57eb07e</span></td><td>perf(images): resize hero + logo WebP to cut LCP image download by 47%</td></tr>
  <tr><td><span class="commit">27f58a8</span></td><td>fix(vercel): correct redirect source to use :path* named param</td></tr>
  <tr><td><span class="commit">ae7994e</span></td><td>perf: fix CLS, load CSS sync, add asset caching + www redirect</td></tr>
  <tr><td><span class="commit">5fcbd7a</span></td><td>perf: defer main CSS, remove GTM auto-load timer, trim font weights</td></tr>
  <tr><td><span class="commit">4d0e22f</span></td><td>perf(images): convert DR Murali JPGs to WebP + fix LCP and feature box alignment</td></tr>
</table>
</div>

<div class="section">
<h2>7. Pending / Next Steps</h2>
<ul>
  <li>Mobile performance score: currently 74 — LCP 4.6s is network-bound under 4G throttle simulation; real-user CrUX data expected to be better</li>
  <li>Push revert commit to git main and deploy to Vercel</li>
  <li>Monitor Google Search Console for structured data (BlogPosting) indexing</li>
  <li>Monitor Google Business Profile ownership resolution for local SEO</li>
  <li>Track keyword rankings for "best hospital in Nagpur" and "knee replacement Nagpur"</li>
</ul>
</div>

<footer>
  Generated: 23 April 2026 &nbsp;|&nbsp; hopehospital.com &nbsp;|&nbsp; Confidential — Internal Use Only
</footer>

</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outPath = path.join(__dirname, '..', 'himanshuhopehospt.23april.pdf');
  await page.pdf({
    path: outPath,
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    printBackground: true,
  });
  await browser.close();
  console.log('PDF saved:', outPath);
})();
