#!/usr/bin/env node
/**
 * Generates the SEO Operating System documentation PDF.
 *   node seo-system/scripts/make-system-doc.js
 * Output: seo-system/docs/Hope-Hospital-SEO-Automation-System.pdf
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const DATE = '21 May 2026';
const OUT_DIR = path.join(__dirname, '..', 'docs');
const OUT = path.join(OUT_DIR, 'Hope-Hospital-SEO-Automation-System.pdf');

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI',Arial,sans-serif; color:#1f2937; line-height:1.55; font-size:12px; }
  .page { padding:0 4px; }
  h1 { font-size:26px; color:#1B365D; line-height:1.2; }
  h2 { font-size:16px; color:#fff; background:#1B365D; padding:7px 12px; border-radius:6px; margin:22px 0 12px; }
  h3 { font-size:13px; color:#C10D0D; margin:14px 0 5px; }
  p { margin-bottom:8px; }
  ul { margin:0 0 8px 18px; } li { margin-bottom:3px; }
  .cover { text-align:center; padding:40px 0 22px; border-bottom:4px solid #C10D0D; margin-bottom:6px; }
  .cover .sub { color:#6b7280; font-size:13px; margin-top:10px; }
  .cover .meta { color:#9ca3af; font-size:11px; margin-top:14px; }
  .lead { background:#EEF7FD; border-left:4px solid #3BA1D7; padding:10px 14px; border-radius:0 6px 6px 0; margin:10px 0; }
  .box { background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:10px 14px; margin:8px 0; }
  .loop { background:#1B365D; color:#fff; text-align:center; padding:12px; border-radius:8px; font-size:13px; font-weight:600; letter-spacing:.5px; margin:10px 0; }
  table { width:100%; border-collapse:collapse; margin:8px 0 14px; font-size:11px; }
  th { background:#1B365D; color:#fff; text-align:left; padding:6px 9px; }
  td { padding:6px 9px; border-bottom:1px solid #e5e7eb; vertical-align:top; }
  tr:nth-child(2n) td { background:#f9fafb; }
  code { background:#eef2f7; color:#1B365D; padding:1px 5px; border-radius:4px; font-family:Consolas,monospace; font-size:10.5px; }
  .ok { color:#166534; font-weight:700; }
  .pagebreak { page-break-before:always; }
  .footer { margin-top:24px; padding-top:10px; border-top:1px solid #e5e7eb; color:#9ca3af; font-size:10px; text-align:center; }
</style></head><body><div class="page">

  <div class="cover">
    <h1>Hope Hospital<br>AI-Assisted SEO Operating System</h1>
    <div class="sub">A complete, modular SEO automation system — phases, workflows, commands, and how it works</div>
    <div class="meta">hopehospital.com &nbsp;·&nbsp; Built &amp; documented ${DATE} &nbsp;·&nbsp; Built with VS Code + Claude</div>
  </div>

  <h2>1. What This Is</h2>
  <p>This is <strong>not</strong> a one-off "morning SEO checklist." It is a modular <strong>operating system</strong> for managing the hospital's entire search presence: technical SEO, GEO (Generative Engine Optimization / AI-search), local SEO, Google Search Console analysis, Google Business Profile, content strategy, internal linking, schema, topical authority, the Ayushman Bharat cluster, reporting, and automation.</p>
  <p>The whole system lives under the <code>seo-system/</code> folder and is excluded from the public website via <code>.vercelignore</code> — so internal SEO operations files are <strong>never served</strong> at hopehospital.com.</p>

  <h2>2. Core Philosophy</h2>
  <div class="lead"><strong>Deterministic scripts find the facts &nbsp;·&nbsp; Claude makes the judgments &nbsp;·&nbsp; a human (and a doctor, for medical claims) approves.</strong></div>
  <ul>
    <li><strong>Right tool for each job.</strong> Scripts do exact, repetitive checks reliably and free; the AI does prioritisation and content judgment.</li>
    <li><strong>One workflow at a time.</strong> Build and trust one workflow before scaling — no random tools.</li>
    <li><strong>YMYL discipline.</strong> It is a hospital. Accuracy and doctor review beat speed and scale. Nothing medical ships without sign-off.</li>
    <li><strong>Single source of truth.</strong> <code>master-context.md</code> holds the hospital profile, priorities, and hard constraints — every workflow reads it.</li>
    <li><strong>Measure &amp; learn.</strong> Every change is logged and later checked against real Search Console results.</li>
  </ul>

  <h2>3. How It Works — The Loop</h2>
  <div class="loop">FIND &nbsp;→&nbsp; FIX &nbsp;→&nbsp; MEASURE &nbsp;→&nbsp; LOG &nbsp;→&nbsp; SHIP</div>
  <p>The system is built in thin layers, each wrapping the one below:</p>
  <ul>
    <li><strong>Layer 1 — Engine.</strong> A plain Node script (e.g. <code>npm run audit</code>) reads the site files and writes a report. No AI, no internet, runs in ~1 second.</li>
    <li><strong>Layer 2 — Command.</strong> A Claude slash command (e.g. <code>/daily-seo</code>) runs the engine, reads the report + the brain, and returns a prioritised task list.</li>
    <li><strong>Layer 3 — Schedule.</strong> A morning routine (Claude routine or Windows Task Scheduler) runs it hands-off, so the report is waiting for you.</li>
    <li><strong>Layer 4 — Data in.</strong> A Search Console export dropped into <code>seo-system/data/</code> feeds real ranking data — no API needed.</li>
  </ul>

  <h2>4. The Six Phases</h2>
  <table>
    <tr><th style="width:18%">Phase</th><th style="width:44%">What it does</th><th>Outcome</th></tr>
    <tr><td><strong>1 — Foundation</strong></td><td>Deterministic technical-SEO audit engine + the shared "brain"</td><td>A trustworthy daily issue list every morning</td></tr>
    <tr><td><strong>2 — Reporting &amp; GSC</strong></td><td>Reads your Search Console export (no API) for striking-distance &amp; low-CTR opportunities</td><td>Data-driven reports; ends hand-writing reports</td></tr>
    <tr><td><strong>3 — GEO</strong></td><td>Audits AI-search citation readiness and generates structured data</td><td>Pages more likely to be cited by ChatGPT / Gemini / Perplexity</td></tr>
    <tr><td><strong>4 — Automation</strong></td><td>Auto-regenerates the sitemap; one-command morning run; scheduling docs</td><td>Sitemap never stale; checks run hands-off</td></tr>
    <tr><td><strong>5 — AI Workflows</strong></td><td>Internal-link finder, content briefs, Google Business Profile drafts</td><td>Topical authority, internal-link coverage, local SEO</td></tr>
    <tr><td><strong>6 — Scaling &amp; Governance</strong></td><td>KPI trends, outcome measurement (the learning loop), runbook</td><td>Knows what actually works; handoff-ready</td></tr>
  </table>

  <div class="pagebreak"></div>

  <h2>5. All Commands</h2>
  <p>Typed in the Claude Code chat box (not the terminal). New commands load when Claude Code starts.</p>
  <table>
    <tr><th style="width:26%">Command</th><th style="width:10%">Phase</th><th>What it does</th></tr>
    <tr><td><code>/daily-seo</code></td><td>1</td><td>Daily SEO plan across the full surface (all ~49 pages), SEO-RICE-ranked</td></tr>
    <tr><td><code>/weekly-report</code></td><td>2</td><td>Stakeholder performance report from real GSC data</td></tr>
    <tr><td><code>/geo-audit &lt;page&gt;</code></td><td>3</td><td>Scores a page's AI-search citation readiness + fixes</td></tr>
    <tr><td><code>/schema-generate &lt;page&gt;</code></td><td>3</td><td>Generates constraint-safe JSON-LD (refuses to invent doctor data)</td></tr>
    <tr><td><code>/internal-link &lt;page&gt;</code></td><td>5</td><td>Suggests internal-link anchors + target pages</td></tr>
    <tr><td><code>/content-brief &lt;topic&gt;</code></td><td>5</td><td>GEO-structured, doctor-reviewable medical content brief</td></tr>
    <tr><td><code>/gbp-post</code></td><td>5</td><td>Google Business Profile post + review-reply drafts</td></tr>
    <tr><td><code>/review-outcomes</code></td><td>6</td><td>Which past changes actually worked (learning loop)</td></tr>
  </table>

  <h2>6. All Engines (Terminal)</h2>
  <table>
    <tr><th style="width:38%">Command</th><th>What it does</th></tr>
    <tr><td><code>npm run audit</code></td><td>Technical SEO audit (ratings, dates, titles, duplicate titles, alt text, broken links, schema, sitemap)</td></tr>
    <tr><td><code>npm run gsc</code></td><td>Parses the GSC export → striking-distance queries &amp; low-CTR pages</td></tr>
    <tr><td><code>npm run geo -- &lt;page&gt;</code></td><td>GEO fact sheet (schema types, FAQ depth, entities, authorship)</td></tr>
    <tr><td><code>npm run links [-- &lt;page&gt;]</code></td><td>Internal-link graph; finds orphan / under-linked pages</td></tr>
    <tr><td><code>npm run sitemap [-- --check]</code></td><td>Regenerates sitemap.xml (<code>--check</code> = preview only)</td></tr>
    <tr><td><code>npm run kpi</code></td><td>KPI trend from the report history</td></tr>
    <tr><td><code>npm run outcome</code></td><td>Flags which logged changes are old enough to evaluate</td></tr>
    <tr><td><code>npm run seo:morning</code></td><td>Runs audit + gsc together</td></tr>
  </table>

  <h2>7. The Brain &amp; the Learning Loop</h2>
  <ul>
    <li><code>project-context/master-context.md</code> — the single source of truth (hospital profile, priorities, constraints, the SEO-RICE scoring model).</li>
    <li><code>project-context/change-ledger.md</code> — every change logged with a date + hypothesis.</li>
    <li><code>project-context/learnings.md</code> — verdicts on what actually worked, fed back into future plans.</li>
    <li><strong>SEO-RICE</strong> prioritisation: <code>(search demand × position opportunity × business value) ÷ effort</code> — so task lists are explainable, not guesswork.</li>
  </ul>

  <h2>8. Hard Constraints (Guardrails)</h2>
  <div class="box">
    <ul>
      <li><strong>Medical content is doctor-reviewed</strong> before publishing (YMYL / EEAT).</li>
      <li><strong>No Hindi / Devanagari</strong> text on the website.</li>
      <li><strong>No new location / branch pages</strong> without an explicit request.</li>
      <li><strong>No review / aggregateRating schema on blog articles.</strong></li>
      <li>Google rating is <strong>3.9★ / 406 reviews</strong> — never inflated.</li>
      <li><strong>No commit or push without explicit approval</strong> (the site is live).</li>
    </ul>
  </div>

  <div class="pagebreak"></div>

  <h2>9. Daily &amp; Weekly Routine</h2>
  <h3>Every morning</h3>
  <p>Run <code>/daily-seo</code> → work the top tasks → log each change to <code>change-ledger.md</code> → commit (push on approval).</p>
  <h3>Every week</h3>
  <p>Export from Search Console → drop the CSVs into <code>seo-system/data/</code> → run <code>/weekly-report</code>. Then <code>/review-outcomes</code> to update <code>learnings.md</code>. Run <code>npm run sitemap -- --check</code> if pages changed.</p>

  <h2>10. Real Results Delivered Today</h2>
  <p>The system did not just get built — it found and fixed real problems on the live site:</p>
  <table>
    <tr><th style="width:42%">Issue (found by the system)</th><th>Fix shipped</th></tr>
    <tr><td>Website claimed <strong>4.5★</strong> while Google shows 3.9★ (structured-data risk)</td><td><span class="ok">Corrected to 3.9★ / 402 across 24 pages</span></td></tr>
    <tr><td>3 cancer pages competing for the same query (cannibalization)</td><td><span class="ok">Differentiated; oncology now targets "free cancer treatment"</span></td></tr>
    <tr><td><code>/services</code> breadcrumb link returned 404 on 9 pages</td><td><span class="ok">Added redirect → /departments</span></td></tr>
    <tr><td>Stray "3.8/5" rating text on a blog page</td><td><span class="ok">Corrected to 3.9/5</span></td></tr>
    <tr><td>Sitemap hand-maintained &amp; slightly stale</td><td><span class="ok">Auto-generated from real pages</span></td></tr>
    <tr><td>Ayushman surgery-list page (top growth driver) had only 1 inbound link</td><td><span class="ok">Added links from home + empanelments + sibling blog → 4 inbound</span></td></tr>
  </table>

  <h2>11. Folder Layout</h2>
  <div class="box"><code>seo-system/</code><br>
  &nbsp;&nbsp;├── project-context/ &nbsp;— the brain: master-context, change-ledger, learnings<br>
  &nbsp;&nbsp;├── scripts/ &nbsp;— deterministic engines (audit, gsc, geo, links, sitemap, kpi, outcome)<br>
  &nbsp;&nbsp;├── reports/ &nbsp;— dated audit / GSC / KPI / outcome reports<br>
  &nbsp;&nbsp;├── automation/ &nbsp;— scheduling docs<br>
  &nbsp;&nbsp;├── gbp/ &nbsp;— Google Business Profile drafts<br>
  &nbsp;&nbsp;├── docs/ &nbsp;— this document<br>
  &nbsp;&nbsp;└── data/ &nbsp;— raw GSC exports (gitignored)<br>
  <code>.claude/commands/</code> &nbsp;— the slash-command workflows</div>

  <h2>12. How to Operate It Going Forward</h2>
  <ul>
    <li><strong>Restart Claude Code</strong> to load any newly added commands.</li>
    <li><strong>Operate, don't keep building</strong> — run <code>/daily-seo</code> daily and work the tasks it surfaces.</li>
    <li><strong>Feed it data</strong> — a weekly GSC export unlocks real opportunities and outcome measurement.</li>
    <li><strong>Trust the loop</strong> — in ~2 weeks, <code>/review-outcomes</code> will show whether each change actually moved rankings.</li>
  </ul>

  <div class="footer">Hope Hospital — AI-Assisted SEO Operating System &nbsp;·&nbsp; Generated ${DATE} &nbsp;·&nbsp; Internal document (not published to the website)</div>

</div></body></html>`;

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: OUT, format: 'A4', printBackground: true, margin: { top: '14mm', right: '13mm', bottom: '14mm', left: '13mm' } });
  await browser.close();
  console.log('PDF written: ' + path.relative(path.join(__dirname, '..', '..'), OUT).replace(/\\/g, '/'));
})();
