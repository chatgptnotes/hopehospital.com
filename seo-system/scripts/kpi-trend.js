#!/usr/bin/env node
/**
 * KPI trend — Hope Hospital SEO operating system (Phase 6)
 * -------------------------------------------------------------
 * Reads the dated report history in seo-system/reports/ and builds a trend
 * table (audit issue counts + GSC clicks/impressions/CTR over time). One data
 * point today; it becomes a real trend as you run the system over the weeks.
 *
 *   npm run kpi
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPORTS = path.join(__dirname, '..', 'reports');
const read = (f) => fs.readFileSync(f, 'utf8');

const files = fs.existsSync(REPORTS) ? fs.readdirSync(REPORTS) : [];
const audit = [], gsc = [];

for (const f of files) {
  let m;
  if ((m = f.match(/^seo-audit-(\d{4}-\d{2}-\d{2})\.md$/))) {
    const t = read(path.join(REPORTS, f));
    const mm = t.match(/Found \*\*(\d+)\*\* 🔴 fix-now and \*\*(\d+)\*\* 🟡/);
    if (mm) audit.push({ date: m[1], red: +mm[1], yellow: +mm[2] });
  }
  if ((m = f.match(/^gsc-insights-(\d{4}-\d{2}-\d{2})\.md$/))) {
    const t = read(path.join(REPORTS, f));
    const mm = t.match(/Clicks:\s*\*\*(\d+)\*\*[\s\S]*?Impressions:\s*\*\*(\d+)\*\*[\s\S]*?CTR:\s*\*\*([\d.]+)%/);
    if (mm) gsc.push({ date: m[1], clicks: +mm[1], impr: +mm[2], ctr: mm[3] });
  }
}
audit.sort((a, b) => a.date.localeCompare(b.date));
gsc.sort((a, b) => a.date.localeCompare(b.date));

let md = `# KPI Trend — Hope Hospital — ${new Date().toISOString().slice(0, 10)}\n\n`;
md += `## Technical health (from seo-audit-*.md)\n`;
md += audit.length ? `| Date | 🔴 fix-now | 🟡 review |\n|---|--:|--:|\n` : `_no audit reports yet — run npm run audit_\n`;
for (const a of audit) md += `| ${a.date} | ${a.red} | ${a.yellow} |\n`;

md += `\n## Search performance (from gsc-insights-*.md)\n`;
md += gsc.length ? `| Date | Clicks | Impressions | CTR% |\n|---|--:|--:|--:|\n` : `_no GSC insights yet — add an export to seo-system/data/ and run npm run gsc_\n`;
for (const g of gsc) md += `| ${g.date} | ${g.clicks} | ${g.impr} | ${g.ctr} |\n`;

md += `\n_${audit.length + gsc.length} data point(s) so far. The trend becomes meaningful as you run the system over time._\n`;

fs.mkdirSync(REPORTS, { recursive: true });
fs.writeFileSync(path.join(REPORTS, 'kpi-trend.md'), md, 'utf8');
console.log(`KPI trend: ${audit.length} audit + ${gsc.length} GSC data point(s). Written to seo-system/reports/kpi-trend.md`);
