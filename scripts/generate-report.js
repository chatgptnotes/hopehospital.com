const puppeteer = require('puppeteer');
const path = require('path');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', Arial, sans-serif;
    color: #1a1a2e;
    line-height: 1.6;
    padding: 50px;
    background: #fff;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 3px solid #E8821A;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  .header-left h1 {
    font-size: 28px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  .header-left h2 {
    font-size: 16px;
    font-weight: 500;
    color: #E8821A;
  }

  .header-right {
    text-align: right;
    font-size: 13px;
    color: #666;
  }

  .header-right .date {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .meta-box {
    background: #f8f4ee;
    border-left: 4px solid #E8821A;
    padding: 15px 20px;
    margin-bottom: 30px;
    border-radius: 0 8px 8px 0;
  }

  .meta-box p {
    font-size: 13px;
    color: #444;
    margin-bottom: 4px;
  }

  .meta-box strong { color: #1a1a2e; }

  .section {
    margin-bottom: 28px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #E8821A;
    border-bottom: 2px solid #f0e6d6;
    padding-bottom: 6px;
    margin-bottom: 14px;
  }

  .task-card {
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 12px;
  }

  .task-card h3 {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6px;
  }

  .task-card p {
    font-size: 13px;
    color: #555;
    margin-bottom: 6px;
  }

  .badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    margin-right: 6px;
  }

  .badge-done { background: #d4edda; color: #155724; }
  .badge-deployed { background: #cce5ff; color: #004085; }
  .badge-local { background: #fff3cd; color: #856404; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 13px;
  }

  th {
    background: #E8821A;
    color: white;
    padding: 8px 12px;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    color: #333;
  }

  tr:nth-child(even) td { background: #fafafa; }

  .impact-box {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .impact-item {
    flex: 1;
    background: #f8f4ee;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }

  .impact-item .number {
    font-size: 28px;
    font-weight: 800;
    color: #E8821A;
  }

  .impact-item .label {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }

  .commit-box {
    background: #1a1a2e;
    color: #e0e0e0;
    padding: 14px 18px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .commit-hash { color: #E8821A; font-weight: 700; }
  .commit-msg { color: #fff; }

  .footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 2px solid #f0e6d6;
    text-align: center;
    font-size: 11px;
    color: #999;
  }

  .footer strong { color: #E8821A; }

  .checklist li {
    list-style: none;
    padding: 4px 0;
    font-size: 13px;
    color: #333;
  }

  .checklist li::before {
    content: "\\2713";
    color: #28a745;
    font-weight: 700;
    margin-right: 8px;
  }

  .pending li::before {
    content: "\\25CB";
    color: #E8821A;
  }

  .page-break { page-break-before: always; }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <h1>Hope Hospital Website</h1>
    <h2>Daily Development & Optimization Report</h2>
  </div>
  <div class="header-right">
    <div class="date">10 April 2026</div>
    <p>Prepared for: Himanshu</p>
    <p>Developer: Claude Code (AI Agent)</p>
    <p>Repository: chatgptnotes/hopehospital.com</p>
  </div>
</div>

<div class="meta-box">
  <p><strong>Project:</strong> hopehospital.com &nbsp;|&nbsp; <strong>Branch:</strong> main &nbsp;|&nbsp; <strong>Live URL:</strong> https://hopehospitalcom.vercel.app</p>
  <p><strong>Session Duration:</strong> ~3 hours &nbsp;|&nbsp; <strong>Files Changed:</strong> 18 &nbsp;|&nbsp; <strong>Commits:</strong> 3 &nbsp;|&nbsp; <strong>Deployments:</strong> 2</p>
</div>

<!-- SECTION 1 -->
<div class="section">
  <div class="section-title">1. Google Analytics Integration (GA4)</div>
  <div class="task-card">
    <h3>Added GA4 Tracking Tag (G-R4J5W7V2Z8) to All Pages</h3>
    <p>Integrated Google Analytics 4 measurement tag in the &lt;head&gt; section of all 8 HTML files across the website for site-wide traffic analytics.</p>
    <p><span class="badge badge-done">Completed</span><span class="badge badge-deployed">Deployed</span></p>
  </div>

  <table>
    <tr><th>File</th><th>Status</th></tr>
    <tr><td>index.html</td><td>GA4 tag added</td></tr>
    <tr><td>blog/index.html</td><td>GA4 tag added</td></tr>
    <tr><td>blog/choosing-best-hospital-in-nagpur.html</td><td>GA4 tag added</td></tr>
    <tr><td>blog/hip-replacement-when-do-you-need-it.html</td><td>GA4 tag added</td></tr>
    <tr><td>blog/knee-replacement-surgery-nagpur-guide.html</td><td>GA4 tag added</td></tr>
    <tr><td>diseases/arthritis.html</td><td>GA4 tag added</td></tr>
    <tr><td>diseases/diabetes.html</td><td>GA4 tag added</td></tr>
    <tr><td>diseases/hypertension.html</td><td>GA4 tag added</td></tr>
  </table>

  <p style="font-size:13px; color:#28a745; font-weight:600;">Verified: GA4 Realtime showed 1 active user within minutes of deployment.</p>
</div>

<!-- SECTION 2 -->
<div class="section">
  <div class="section-title">2. Image Optimization (WebP Conversion)</div>
  <div class="task-card">
    <h3>Converted All Images to WebP Format &mdash; 98% Size Reduction</h3>
    <p>Created a reusable Node.js script (scripts/optimize-images.js) using Sharp library. Converted 6 PNG/JPG images to WebP format, dramatically reducing page weight.</p>
    <p><span class="badge badge-done">Completed</span><span class="badge badge-deployed">Deployed</span></p>
  </div>

  <table>
    <tr><th>Image File</th><th>Before</th><th>After (WebP)</th><th>Savings</th></tr>
    <tr><td>phoenix-hero.png</td><td>4,206 KB</td><td>42 KB</td><td>-99.0%</td></tr>
    <tr><td>phoenix-services.png</td><td>4,307 KB</td><td>70 KB</td><td>-98.4%</td></tr>
    <tr><td>phoenix-logo.png</td><td>1,265 KB</td><td>21 KB</td><td>-98.4%</td></tr>
    <tr><td>dr-murali-bk.jpg</td><td>498 KB</td><td>38 KB</td><td>-92.4%</td></tr>
    <tr><td>hope-hospital-logo.png</td><td>202 KB</td><td>10 KB</td><td>-95.0%</td></tr>
    <tr><td>hope-hospital-og.png</td><td>217 KB</td><td>20 KB</td><td>-91.0%</td></tr>
    <tr><td style="font-weight:700;">TOTAL</td><td style="font-weight:700;">10,694 KB</td><td style="font-weight:700;">201 KB</td><td style="font-weight:700; color:#28a745;">-98.1%</td></tr>
  </table>

  <p style="font-size:13px; color:#555;"><strong>Additional optimizations applied:</strong> fetchpriority="high" on hero LCP image, loading="lazy" on below-fold images, explicit width/height attributes to prevent layout shift (CLS).</p>
</div>

<!-- SECTION 3 -->
<div class="section">
  <div class="section-title">3. SEO Optimization &mdash; Title &amp; Meta Description</div>
  <div class="task-card">
    <h3>Shortened Title Tag &amp; Meta Description for SERP Compliance</h3>
    <p>Google was truncating both the title (117 chars) and description (287 chars) in search results. Shortened both to optimal lengths with primary keyword front-loaded.</p>
    <p><span class="badge badge-done">Completed</span><span class="badge badge-deployed">Deployed</span></p>
  </div>

  <table>
    <tr><th>Element</th><th>Before</th><th>After</th></tr>
    <tr>
      <td><strong>Title Tag</strong></td>
      <td style="font-size:12px;">AI-Powered Best Hospital in Nagpur | Dr. B.K. Murali - Hope Hospital | AI Healthcare Pioneer & Top Orthopedic Surgeon <em>(117 chars)</em></td>
      <td style="font-size:12px; color:#28a745;">Best Hospital in Nagpur | Hope Hospital - Dr. B.K. Murali <em>(57 chars)</em></td>
    </tr>
    <tr>
      <td><strong>Meta Description</strong></td>
      <td style="font-size:12px;">AI-Powered Best Hospital in Nagpur - Hope Hospital uses artificial intelligence & machine learning... <em>(287 chars)</em></td>
      <td style="font-size:12px; color:#28a745;">Best Hospital in Nagpur - Hope Hospital, NABH-accredited super specialty center led by Dr. B.K. Murali. 24/7 emergency care. Call 1800-233-0000. <em>(158 chars)</em></td>
    </tr>
  </table>
</div>

<div class="page-break"></div>

<!-- SECTION 4 -->
<div class="section">
  <div class="section-title">4. Performance Impact Summary</div>
  <div class="impact-box">
    <div class="impact-item">
      <div class="number">-98%</div>
      <div class="label">Image Size Reduction</div>
    </div>
    <div class="impact-item">
      <div class="number">~1.2 MB</div>
      <div class="label">New Page Weight (was 11 MB)</div>
    </div>
    <div class="impact-item">
      <div class="number">57</div>
      <div class="label">Title Length (was 117)</div>
    </div>
    <div class="impact-item">
      <div class="number">158</div>
      <div class="label">Description Length (was 287)</div>
    </div>
  </div>

  <table>
    <tr><th>Metric</th><th>Before (Estimated)</th><th>After (Estimated)</th></tr>
    <tr><td>Total Page Weight</td><td>~11 MB</td><td>~1.2 MB</td></tr>
    <tr><td>Largest Contentful Paint (4G)</td><td>8&ndash;12 seconds</td><td>1.5&ndash;2.5 seconds</td></tr>
    <tr><td>Lighthouse Performance Score</td><td>25&ndash;40</td><td>85&ndash;95 (projected)</td></tr>
    <tr><td>Title Tag in SERP</td><td>Truncated by Google</td><td>Fully displayed</td></tr>
    <tr><td>Meta Description in SERP</td><td>Truncated by Google</td><td>Fully displayed</td></tr>
    <tr><td>Google Analytics</td><td>Not installed</td><td>Active &amp; tracking</td></tr>
  </table>
</div>

<!-- SECTION 5 -->
<div class="section">
  <div class="section-title">5. Vercel Deployments</div>

  <div class="commit-box">
    <span class="commit-hash">b9c3ad6</span> <span class="commit-msg">feat: add Google Analytics (gtag.js) to all pages</span><br>
    Deployed: https://hopehospitalcom.vercel.app &mdash; Status: READY
  </div>
  <div class="commit-box">
    <span class="commit-hash">6e57f29</span> <span class="commit-msg">perf: WebP image optimization (-98%) + SEO title/description fix</span><br>
    Deployed: https://hopehospitalcom.vercel.app &mdash; Status: READY
  </div>
</div>

<!-- SECTION 6 -->
<div class="section">
  <div class="section-title">6. Keyword Research Discussion</div>
  <div class="task-card">
    <h3>Google Ads Keyword Planner Analysis</h3>
    <p>Investigated why Google Keyword Planner was showing "Some keywords were removed" warning. Root cause identified:</p>
    <ul class="checklist" style="margin-top:8px;">
      <li>Google strips location words (e.g., "nagpur") from seeds when location targeting is already set</li>
      <li>Healthcare superlative terms ("best") may be restricted under Google Ads healthcare policy</li>
      <li>Recommended strategy: use factual, service-based keywords (knee replacement, orthopedic surgeon, NABH hospital) with Nagpur as location target</li>
      <li>Primary keyword decided: "best hospital in nagpur" for organic SEO ranking</li>
    </ul>
  </div>
</div>

<!-- SECTION 7 -->
<div class="section">
  <div class="section-title">7. Pending Tasks (Not Yet Done)</div>
  <ul class="checklist pending">
    <li>Shorten meta descriptions on 7 other HTML pages (blog + disease pages, all 192&ndash;213 chars)</li>
    <li>Extract inline CSS to external cacheable file (css/styles.css)</li>
    <li>Extract inline JS to external file with defer loading</li>
    <li>Add loading="lazy" to all gallery section images</li>
    <li>HTML/CSS/JS minification</li>
    <li>Create sitemap.xml and robots.txt</li>
    <li>Accessibility audit (WCAG 2.1 AA compliance)</li>
    <li>Browser compatibility testing</li>
    <li>Update Open Graph &amp; Twitter Card titles to match new title</li>
  </ul>
</div>

<!-- SECTION 8 -->
<div class="section">
  <div class="section-title">8. Files Modified Today</div>
  <table>
    <tr><th>#</th><th>File</th><th>Change Type</th></tr>
    <tr><td>1</td><td>index.html</td><td>GA4 tag + WebP refs + SEO title/description</td></tr>
    <tr><td>2</td><td>blog/index.html</td><td>GA4 tag added</td></tr>
    <tr><td>3</td><td>blog/choosing-best-hospital-in-nagpur.html</td><td>GA4 tag added</td></tr>
    <tr><td>4</td><td>blog/hip-replacement-when-do-you-need-it.html</td><td>GA4 tag added</td></tr>
    <tr><td>5</td><td>blog/knee-replacement-surgery-nagpur-guide.html</td><td>GA4 tag added</td></tr>
    <tr><td>6</td><td>diseases/arthritis.html</td><td>GA4 tag added</td></tr>
    <tr><td>7</td><td>diseases/diabetes.html</td><td>GA4 tag added</td></tr>
    <tr><td>8</td><td>diseases/hypertension.html</td><td>GA4 tag added</td></tr>
    <tr><td>9</td><td>images/phoenix-hero.webp</td><td>New file (optimized)</td></tr>
    <tr><td>10</td><td>images/phoenix-services.webp</td><td>New file (optimized)</td></tr>
    <tr><td>11</td><td>images/phoenix-logo.webp</td><td>New file (optimized)</td></tr>
    <tr><td>12</td><td>images/dr-murali-bk.webp</td><td>New file (optimized)</td></tr>
    <tr><td>13</td><td>images/hope-hospital-logo.webp</td><td>New file (optimized)</td></tr>
    <tr><td>14</td><td>images/hope-hospital-og.webp</td><td>New file (optimized)</td></tr>
    <tr><td>15</td><td>scripts/optimize-images.js</td><td>New file (build tool)</td></tr>
    <tr><td>16</td><td>package.json</td><td>Added sharp devDependency</td></tr>
    <tr><td>17</td><td>package-lock.json</td><td>Updated dependencies</td></tr>
    <tr><td>18</td><td>.vercel/project.json</td><td>Vercel CLI project link</td></tr>
  </table>
</div>

<div class="footer">
  <p><strong>Hope Hospital</strong> &mdash; hopehospital.com &nbsp;|&nbsp; Report generated on 10 April 2026 at 5:42 PM IST</p>
  <p>Prepared by Claude Code (AI Development Agent) for Himanshu</p>
  <p style="margin-top:8px; font-size:10px;">This report is auto-generated. For questions, refer to the git commit history or contact the development team.</p>
</div>

</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const outputPath = path.join(__dirname, '..', 'himanshuhopehospt.10april.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', bottom: '20px', left: '10px', right: '10px' }
  });
  await browser.close();
  console.log('PDF generated: ' + outputPath);
})();
