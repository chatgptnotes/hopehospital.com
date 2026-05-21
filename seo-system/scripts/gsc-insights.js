#!/usr/bin/env node
/**
 * GSC Insights — Hope Hospital SEO operating system (Phase 2)
 * -------------------------------------------------------------
 * Reads a Google Search Console export (the standard "Export" ZIP, unzipped into
 * seo-system/data/) and surfaces the real opportunities — no API needed.
 *
 * Drop the CSVs (Queries.csv, Pages.csv, …) into seo-system/data/ then run:
 *   npm run gsc      (or: node seo-system/scripts/gsc-insights.js)
 *
 * Writes seo-system/reports/gsc-insights-<YYYY-MM-DD>.md. If no export is
 * present it prints how to get one and exits cleanly (skips, never errors).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DATA_DIR = path.join(__dirname, '..', 'data');
const OUT_DIR = path.join(__dirname, '..', 'reports');
const STRIKE_MIN = 8;   // striking-distance position window (page-1-bottom → page-2)
const STRIKE_MAX = 20;
const MIN_IMPRESSIONS = 30; // ignore very low-volume rows

// ---- find the export CSVs --------------------------------------------------
function findCsvs(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) findCsvs(p, out);
    else if (e.name.toLowerCase().endsWith('.csv')) out.push(p);
  }
  return out;
}

const csvs = findCsvs(DATA_DIR);
if (csvs.length === 0) {
  console.log('No GSC export found in seo-system/data/.');
  console.log('To add one: Search Console → Performance → Export → CSV/Google Sheets,');
  console.log('then unzip the CSVs (Queries.csv, Pages.csv, …) into seo-system/data/.');
  console.log('Skipping GSC insights (this is not an error).');
  process.exit(0);
}

// ---- minimal CSV parser (handles quoted fields) ----------------------------
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  text = text.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ''));
}

const num = (s) => parseFloat(String(s).replace(/[%,\s]/g, '')) || 0;

// ---- load queries + pages --------------------------------------------------
let queries = null, pages = null;
for (const file of csvs) {
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  if (!rows.length) continue;
  const header = rows[0].map((h) => h.toLowerCase());
  const body = rows.slice(1);
  const recs = body.map((r) => ({
    key: r[0],
    clicks: num(r[1]),
    impressions: num(r[2]),
    ctr: num(r[3]),
    position: num(r[4]),
  }));
  if (header[0] && header[0].includes('quer')) queries = recs;
  else if (header[0] && header[0].includes('page')) pages = recs;
}

const pad = (n) => String(n).padStart(2, '0');
const today = new Date();
const stamp = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

let md = `# GSC Insights — Hope Hospital — ${stamp}\n\n`;
md += `Source: ${csvs.map((f) => path.basename(f)).join(', ')}\n\n`;

function totals(recs) {
  const clicks = recs.reduce((s, r) => s + r.clicks, 0);
  const impr = recs.reduce((s, r) => s + r.impressions, 0);
  return { clicks, impr, ctr: impr ? (clicks / impr) * 100 : 0 };
}

if (queries) {
  const t = totals(queries);
  md += `## Headline (queries)\n- Clicks: **${t.clicks}** · Impressions: **${t.impr}** · CTR: **${t.ctr.toFixed(1)}%**\n\n`;

  const strike = queries
    .filter((r) => r.position >= STRIKE_MIN && r.position <= STRIKE_MAX && r.impressions >= MIN_IMPRESSIONS)
    .sort((a, b) => b.impressions - a.impressions).slice(0, 15);
  md += `## 🎯 Striking-distance queries (pos ${STRIKE_MIN}–${STRIKE_MAX}) — best wins\n`;
  md += strike.length ? `| Query | Pos | Impr | Clicks | CTR% |\n|---|--:|--:|--:|--:|\n` : `_none_\n`;
  for (const r of strike) md += `| ${r.key} | ${r.position.toFixed(1)} | ${r.impressions} | ${r.clicks} | ${r.ctr.toFixed(1)} |\n`;
  md += `\n## Top queries by clicks\n| Query | Clicks | Impr | Pos |\n|---|--:|--:|--:|\n`;
  for (const r of [...queries].sort((a, b) => b.clicks - a.clicks).slice(0, 10)) md += `| ${r.key} | ${r.clicks} | ${r.impressions} | ${r.position.toFixed(1)} |\n`;
  md += `\n`;
}

if (pages) {
  const t = totals(pages);
  const lowCtr = pages
    .filter((r) => r.impressions >= MIN_IMPRESSIONS * 3 && r.ctr < t.ctr)
    .sort((a, b) => b.impressions - a.impressions).slice(0, 10);
  md += `## 📉 High-impression, low-CTR pages (title/meta rewrite candidates)\n`;
  md += lowCtr.length ? `_Site avg CTR ${t.ctr.toFixed(1)}%. These are below it with high impressions._\n\n| Page | Impr | CTR% | Pos |\n|---|--:|--:|--:|\n` : `_none_\n`;
  for (const r of lowCtr) md += `| ${r.key} | ${r.impressions} | ${r.ctr.toFixed(1)} | ${r.position.toFixed(1)} |\n`;
  md += `\n`;
}

if (!queries && !pages) {
  md += `_Found CSVs but no recognizable Queries/Pages export. Make sure Queries.csv / Pages.csv are in seo-system/data/._\n`;
}

md += `\n---\n_Generated by seo-system/scripts/gsc-insights.js. Next: /weekly-report turns this into a stakeholder report._\n`;

fs.mkdirSync(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, `gsc-insights-${stamp}.md`);
fs.writeFileSync(outPath, md, 'utf8');
console.log(`GSC insights written to: ${path.relative(ROOT, outPath).replace(/\\/g, '/')}`);
if (queries) console.log(`  ${queries.length} queries parsed`);
if (pages) console.log(`  ${pages.length} pages parsed`);
