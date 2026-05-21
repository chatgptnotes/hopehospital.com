#!/usr/bin/env node
/**
 * Outcome check — Hope Hospital SEO operating system (Phase 6)
 * -------------------------------------------------------------
 * Closes the learning loop. Reads change-ledger.md and reports which logged
 * changes are now old enough (>=14 days) to judge, matching them against the
 * latest GSC Pages export when present. You then record the verdict in
 * change-ledger.md and append the lesson to learnings.md.
 *
 *   npm run outcome
 */

'use strict';

const fs = require('fs');
const path = require('path');

const LEDGER = path.join(__dirname, '..', 'project-context', 'change-ledger.md');
const DATA = path.join(__dirname, '..', 'data');
const REPORTS = path.join(__dirname, '..', 'reports');
const READY_DAYS = 14;
const today = new Date();
const daysSince = (d) => Math.floor((today - new Date(d + 'T00:00:00')) / 86400000);

if (!fs.existsSync(LEDGER)) { console.log('No change-ledger.md found — nothing to evaluate.'); process.exit(0); }

const changes = fs.readFileSync(LEDGER, 'utf8').split('\n')
  .filter((l) => /^\|\s*\d{4}-\d{2}-\d{2}/.test(l))
  .map((l) => { const c = l.split('|').map((x) => x.trim()); return { date: c[1], pages: c[2], change: c[3] }; });

// optional GSC Pages export
function findPagesCsv(dir) {
  if (!fs.existsSync(dir)) return null;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { const r = findPagesCsv(p); if (r) return r; }
    else if (/page/i.test(e.name) && e.name.toLowerCase().endsWith('.csv')) return p;
  }
  return null;
}
const pagesCsv = findPagesCsv(DATA);

let md = `# Outcome Review — Hope Hospital — ${today.toISOString().slice(0, 10)}\n\n`;
md += pagesCsv
  ? `GSC data: ${path.basename(pagesCsv)} — match changed pages against it to read current clicks/position.\n\n`
  : `No GSC export in seo-system/data/ — add one to read real position/click deltas. (Days-since still tells you what's ready to judge.)\n\n`;
md += `| Change date | Days ago | Ready? | Page(s) | Change |\n|---|--:|:--:|---|---|\n`;

let ready = 0;
for (const c of changes) {
  const d = daysSince(c.date);
  if (d >= READY_DAYS) ready++;
  md += `| ${c.date} | ${d} | ${d >= READY_DAYS ? '✅' : '⏳'} | ${c.pages} | ${c.change} |\n`;
}
md += `\n✅ = ${READY_DAYS}+ days passed, safe to judge the SEO effect. ⏳ = still too early.\n`;
md += `\nNext: for each ✅ row, read its current GSC metrics, write the result in change-ledger.md's Outcome column, and append the lesson to learnings.md.\n`;

fs.mkdirSync(REPORTS, { recursive: true });
fs.writeFileSync(path.join(REPORTS, 'outcome-review.md'), md, 'utf8');
console.log(`Outcome review: ${changes.length} logged changes, ${ready} ready to evaluate (>=${READY_DAYS} days). Written to seo-system/reports/outcome-review.md`);
